import { useEffect, useRef, useState } from "react";
import { ChangeState, ClassName, DecoratedMethod, Distributed, GetState, Madoi, SetState } from "madoi-client";
import { TypedCustomEventListenerOrObject, TypedCustomEventTarget } from "tcet";

// Decorator
export function SuppressRender() {
	return (target: any, name: string, _descriptor: PropertyDescriptor) => {
		target[name].madoiReactSuppressRender_ = {};
	}
}

/**
 * @EnterRoomAllowedなどのイベントデコレータが付与されたメソッドが呼び出される際に、
 * 引数に追加されるcontextオブジェクトのインタフェース。
 * メソッド呼び出し時には、イベント毎のDetailクラス、Madoiのインスタンス、contextオブジェクトが
 * 渡される。たとえば、EnterRoomAllowedの引数は以下となる。
 * <code>
 * @EnterRoomAllowed
 * enterRoomAllowed(detail: EnterRoomAllowedDetail, madoi: Madoi, context: MadoiReactContext)
 * </code>
 */
export interface MadoiReactContext{
    changed: boolean;
}

type Factory<T> = ()=>T;
type ValueOrFactory<T> = T | Factory<T>;
function getValue<T>(vof: ValueOrFactory<T>): T{
	if(typeof vof === "function"){
		return (vof as Factory<T>)();
	}
	return vof;
}

type Function<T> = (perv: T)=>T;
type ValueOrFunction<T> = T | Function<T>;
function getOrApplyValue<T>(prev: T, vof: ValueOrFunction<T>){
	if(typeof vof === "function"){
		return (vof as Function<T>)(prev);
	}
	return vof;
}

@ClassName("MadoiReactInnerState")
class State<T>{
	private state: T;

	constructor(state: T){
		this.state = state;
	}

	@Distributed()
	@ChangeState()
	updateState(value: T){
		this.state = value;
	}

	@SetState()
	setState(value: T){
		this.state = value;
	}

	@GetState()
	getState(){
		return this.state;
	}
}

export function useSharedState<T>(madoi: Madoi, initial: ValueOrFactory<T>): [T, (v: ValueOrFunction<T>)=>void]{
	const initialValue = useRef<T>(null!);
	const target = useRef<State<T>>(null!);
	const [_state, setState] = useState<any>();

	if(initialValue.current === null){
		initialValue.current = getValue(initial);
	}

	const renderOnStateChange = true;
	useEffect(()=>{
		if(target.current !== null) return;
		const obj = new State(initialValue.current) as any;
		target.current = obj;
		let getStateMethod: any = null;
		for(let p of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))){
			const cfg = obj[p].madoiMethodConfig_;
			if(!cfg) continue;
			if(cfg["getState"]){
				getStateMethod = obj[p];
			}
		}
		if(getStateMethod == null){
			throw new Error(`${typeof obj} must declare @GetState method.`);
		}
		for(let p of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))){
			const cfg = obj[p].madoiMethodConfig_;
			if(!cfg) continue;
			if(cfg["changeState"]){
				const shareMethod = obj[p];
				const f = function(){
 					shareMethod.apply(obj, arguments);
					if(renderOnStateChange){
						setState(getStateMethod.apply(obj));
					}
				};
				f.madoiMethodConfig_ = cfg;
				obj[p] = f;
			} else if(cfg["setState"]){
				const setStateMethod = obj[p];
				const f = function(){
					setStateMethod.apply(obj, arguments);
					if(renderOnStateChange) setState(getStateMethod.apply(obj));
				};
				f.madoiMethodConfig_ = cfg;
				obj[p] = f;
			}
		}
		madoi.register(obj);
	}, []);

	return [target.current?.getState() || initialValue.current,
		(vof: ValueOrFunction<T>)=>{target.current?.updateState(
			getOrApplyValue(target.current?.getState(), vof))}];
}

export function useMadoiModel<T>(madoi: Madoi, model: ValueOrFactory<T>, renderOnStateChange = true): T {
	const target = useRef<T>(null!);
	const registered = useRef(false);
	const [_state, setState] = useState<any>();

	if(target.current === null){
		target.current = getValue(model);
	}

	useEffect(()=>{
		if(registered.current) return;
		const obj = target.current as any;
		let getStateMethod: any = null;
		for(let p of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))){
			const cfg = (obj[p] as DecoratedMethod).madoiMethodConfig_;
			if(!cfg) continue;
			if(cfg["getState"]){
				getStateMethod = obj[p];
			}
		}
		for(let p of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))){
			let suppressRender = obj[p].madoiReactSuppressRender_;
			if(typeof suppressRender === "undefined"){
				suppressRender = false;
			}
			const cfg = (obj[p] as DecoratedMethod).madoiMethodConfig_;
			if(!cfg) continue;
			if(cfg["distributed"] || cfg["changeState"] || cfg["setState"] ||
					cfg["enterRoomAllowed"] || cfg["leaveRoomDone"] ||
					cfg["peerEntered"] || cfg["peerProfileUpdated"] || cfg["peerLeaved"]){
				const method = obj[p];
				const f = function(){
					let context: MadoiReactContext = {changed: !suppressRender};
					method.apply(obj, [...arguments, context]);
					if(renderOnStateChange && context.changed){
						console.debug("[madoi-react] fire render for", obj, method.name, suppressRender);
						if(getStateMethod){
							setState(getStateMethod.apply(obj));
						} else{
							setState(new Object());
						}
					}
				};
				f.madoiMethodConfig_ = cfg;
				obj[p] = f;
			}
		}
		madoi.register(obj);
		registered.current = true;
	}, []);

	return target.current;
}

export function eventListnersEffect<
		Target extends TypedCustomEventTarget<Target, Events>,
		Events extends Record<string, any>,
		Event extends keyof Events & string,
		Handlers extends Record<Event, Handler>,
		Handler extends TypedCustomEventListenerOrObject<Target, Events[Event]>>(
	target: Target, handlers: Handlers
){
	for(const key of Object.keys(handlers)){
		target.addEventListener(key as Event, handlers[key as Event]);
	}
	return ()=>{
		for(const key of Object.keys(handlers)){
			target.removeEventListener(key as Event, handlers[key as Event]);
		}    
	};
}

export function bundleCleanups(...cleanups: (()=>void)[]){
	return ()=>cleanups.forEach(e=>e());
}

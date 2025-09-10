import { Madoi } from "madoi-client";
import { TypedCustomEventListenerOrObject, TypedCustomEventTarget } from "tcet";
export declare function CauseStateChange(value?: boolean): (target: any, name: string, _descriptor: PropertyDescriptor) => void;
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
export interface MadoiReactContext {
    changed: boolean;
}
type Factory<T> = () => T;
type ValueOrFactory<T> = T | Factory<T>;
type Function<T> = (perv: T) => T;
type ValueOrFunction<T> = T | Function<T>;
export declare function useSharedState<T>(madoi: Madoi, initial: ValueOrFactory<T>): [T, (v: ValueOrFunction<T>) => void];
export declare function useSharedModel<T>(madoi: Madoi, model: ValueOrFactory<T>, renderOnStateChange?: boolean): T;
export declare function eventListnersEffect<Target extends TypedCustomEventTarget<Target, Events>, Events extends Record<string, any>, Event extends keyof Events & string, Handlers extends Record<Event, Handler>, Handler extends TypedCustomEventListenerOrObject<Target, Events[Event]>>(target: Target, handlers: Handlers): () => void;
export declare function bundleCleanups(...cleanups: (() => void)[]): () => void;
export {};
//# sourceMappingURL=madoi-react.d.ts.map
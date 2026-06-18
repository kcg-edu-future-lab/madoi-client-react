import { Madoi, type Profile } from "madoi-client";
import { type TypedCustomEventListenerOrEventListenerObject, TypedCustomEventTarget } from "tcet";
export declare function SuppressRender(): (target: any, name: string, _descriptor: PropertyDescriptor) => void;
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
export declare function useMadoiModel<T>(madoi: Madoi<any, any>, model: ValueOrFactory<T>, renderOnStateChange?: boolean): T;
export declare function useSelfPeer(madoi: Madoi): import("madoi-client").PeerInfo<{}>;
export declare function useOtherPeers<TP extends Profile, TR extends Profile>(madoi: Madoi<TP, TR>): import("madoi-client").PeerInfo<TP>[];
export declare function eventListnersEffect<Target extends TypedCustomEventTarget<any, any>>(target: Target, handlers: Record<string, TypedCustomEventListenerOrEventListenerObject<any, any>>): () => void;
export declare function bundleCleanups(...cleanups: (() => void)[]): () => void;
export {};
//# sourceMappingURL=madoi-react.d.ts.map
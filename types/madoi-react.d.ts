import { Madoi } from "madoi-client";
import { TypedCustomEventListenerOrObject, TypedCustomEventTarget } from "tcet";
type Factory<T> = () => T;
type ValueOrFactory<T> = T | Factory<T>;
type Function<T> = (perv: T) => T;
type ValueOrFunction<T> = T | Function<T>;
export declare function useSharedState<T>(madoi: Madoi, initial: ValueOrFactory<T>): [T, (v: ValueOrFunction<T>) => void];
export declare function useSharedModel<T>(madoi: Madoi, model: ValueOrFactory<T>, renderOnStateChange?: boolean): T;
export declare function eventListnersEffect<Handlers extends Record<string, Handler>, Target extends TypedCustomEventTarget<Target, Events>, Events extends Record<string, any>, Handler extends TypedCustomEventListenerOrObject<Target, any>>(target: Target, handlers: Handlers): () => void;
export declare function bundleCleanups(...cleanups: (() => void)[]): () => void;
export {};
//# sourceMappingURL=madoi-react.d.ts.map
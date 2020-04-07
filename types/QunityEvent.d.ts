/**
 * Created by rockyl on 2020-04-07.
 */
import { HashObject } from "./HashObject";
/**
 * 单一事件类
 * 一对多形式的订阅分发机制
 */
export declare class QunityEvent extends HashObject {
    private _subscribers;
    constructor();
    private findListener;
    /**
     * 添加侦听
     * @param callback
     * @param thisObj
     * @param priority
     * @param params
     */
    addListener(callback: any, thisObj?: any, priority?: number, ...params: any[]): void;
    /**
     * 添加单次侦听
     * @param callback
     * @param thisObj
     * @param priority
     * @param params
     */
    once(callback: any, thisObj?: any, priority?: number, ...params: any[]): void;
    /**
     * 移除侦听
     * @param callback
     */
    removeListener(callback: any): void;
    /**
     * 是否已经侦听
     * @param callback
     */
    hasListener(callback: any): boolean;
    /**
     * 调用派发
     * @param paramsNew
     */
    invoke(...paramsNew: any[]): void;
}

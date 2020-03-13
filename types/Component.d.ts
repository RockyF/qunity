/**
 * Created by rockyl on 2019-07-28.
 */
import { HashObject } from "./HashObject";
import { IEntityAdaptor } from "./EntityAdaptor";
import { IEntity } from "./IEntity";
export interface IComponent {
    readonly entityAdaptor: IEntityAdaptor;
    readonly entity: any;
    enabled: boolean;
    broadcast(methodName: string, ...args: any[]): any;
    bubbling(methodName: string, ...args: any[]): any;
    awake(): any;
    start(): any;
    onEnable(): any;
    onDisable(): any;
    update(delta: number): any;
    onDestroy(): any;
    onClick(e: any): any;
    onMouseDown(e: any): any;
    onMouseMove(e: any): any;
    onMouseUp(e: any): any;
    onMouseUpOutside(e: any): any;
}
/**
 * 组件类
 */
export declare class Component extends HashObject implements IComponent {
    private _entityAdaptor;
    private _enabled;
    private _started;
    get entityAdaptor(): IEntityAdaptor;
    get entity(): IEntity;
    constructor();
    /**
     * 是否有效
     */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * @private
     */
    $awake(entityAdaptor: IEntityAdaptor): void;
    /**
     * @private
     */
    $destroy(): void;
    /**
     * 当组件被唤醒时
     */
    awake(): void;
    /**
     * 当组件开始
     */
    start(): void;
    /**
     * 当生效时
     * 仅当实体唤醒状态
     */
    onEnable(): void;
    /**
     * 当失效时
     * 仅当实体唤醒状态
     */
    onDisable(): void;
    /**
     * 时钟更新
     * @param t
     */
    update(t: number): void;
    /**
     * 当被销毁时
     */
    onDestroy(): void;
    /**
     * @private
     * @param delta
     */
    $onUpdate(delta: number): void;
    /**
     * 当点击时
     * @param e
     */
    onClick(e: any): void;
    /**
     * 当鼠标按下
     * @param e
     */
    onMouseDown(e: any): void;
    /**
     * 当鼠标移动
     * @param e
     */
    onMouseMove(e: any): void;
    /**
     * 当鼠标松开
     * @param e
     */
    onMouseUp(e: any): void;
    /**
     * 当鼠标在实体外侧松开
     * @param e
     */
    onMouseUpOutside(e: any): void;
    /**
     * 向下广播执行
     * @param methodName
     * @param args
     */
    broadcast(methodName: string, ...args: any[]): void;
    /**
     * 向上冒泡执行
     * @param methodName
     * @param args
     */
    bubbling(methodName: string, ...args: any[]): void;
}

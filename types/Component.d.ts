/**
 * Created by rockyl on 2019-07-28.
 */
import { HashObject } from "./HashObject";
import { IEntityAdaptor } from "./EntityAdaptor";
export interface IComponent {
    readonly entityAdaptor: IEntityAdaptor;
    readonly entity: any;
    enabled: boolean;
    awake(): any;
    start(): any;
    onEnable(): any;
    onDisable(): any;
    update(t: number): any;
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
    get entity(): any;
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
     * @param t
     */
    $onUpdate(t: number): void;
    onClick(e: any): void;
    onMouseDown(e: any): void;
    onMouseMove(e: any): void;
    onMouseUp(e: any): void;
    onMouseUpOutside(e: any): void;
}

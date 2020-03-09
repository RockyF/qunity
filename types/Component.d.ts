/**
 * Created by rockyl on 2019-07-28.
 */
import { HashObject } from "./HashObject";
import { IEntityAdaptor } from "./EntityAdaptor";
export interface IComponent {
    readonly entityAdaptor: IEntityAdaptor;
    readonly entity: any;
    enabled: boolean;
    onAwake(): any;
    onEnable(): any;
    onDisable(): any;
    onUpdate(t: number): any;
    afterUpdate(t: number): any;
    onDestroy(): any;
}
/**
 * 组件类
 */
export declare class Component extends HashObject implements IComponent {
    private _entityAdaptor;
    private _enabled;
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
    onAwake(): void;
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
    onUpdate(t: number): void;
    /**
     * 时钟更新回溯
     * @param t
     */
    afterUpdate(t: number): void;
    /**
     * 当被销毁时
     */
    onDestroy(): void;
    /**
     * @private
     * @param t
     */
    $onUpdate(t: number): void;
    /**
     * @private
     * @param t
     */
    $afterUpdate(t: number): void;
}

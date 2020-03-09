/**
 * Created by rockyl on 2020-03-07.
 */
import { ComponentManager } from "./ComponentManager";
import { Application } from "./Application";
/**
 * 实体适配器接口
 */
export interface IEntityAdaptor {
    /**
     * 组件管理实例
     */
    readonly entity: any;
    /**
     * 实体
     */
    readonly components: ComponentManager;
    /**
     * 是否激活
     */
    readonly isActive: boolean;
    invokeLifecycle(type: string, ...args: any[]): any;
    invokeInteractionEvent(type: string, ...args: any[]): any;
}
/**
 * 实体适配器基类
 */
export declare abstract class EntityAdaptorBase implements IEntityAdaptor {
    private readonly _components;
    private readonly _entity;
    /**
     * @inheritDoc
     */
    get components(): ComponentManager;
    /**
     * @inheritDoc
     */
    get entity(): any;
    /**
     * @inheritDoc
     */
    abstract get isActive(): boolean;
    constructor(entity: any, app: Application);
    /**
     * 触发生命周期方法
     * @param type
     * @param args
     */
    invokeLifecycle(type: string, ...args: any[]): void;
    /**
     * 触发交互事件方法
     * @param type
     * @param e
     */
    invokeInteractionEvent(type: string, e: any): void;
}

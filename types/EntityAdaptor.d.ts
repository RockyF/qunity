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
     * 获取激活状态
     */
    getActive(): boolean;
    /**
     * 设置激活状态
     * @param active
     */
    setActive(active: boolean): any;
    invokeLifecycle(type: string, ...args: any[]): any;
    invokeInteractionEvent(type: string, ...args: any[]): any;
}
/**
 * 实体适配器基类
 */
export declare abstract class EntityAdaptorBase implements IEntityAdaptor {
    protected readonly _components: ComponentManager;
    protected readonly _entity: any;
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
    getActive(): boolean;
    /**
     * @inheritDoc
     */
    setActive(v: boolean): void;
    constructor(entity: any, app: Application);
    /**
     * 应用代理
     */
    applyProxy(): void;
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

/**
 * Created by rockyl on 2020-03-07.
 *
 *
 */
import { ComponentManager } from "./ComponentManager";
/**
 * 实体适配器接口
 */
export interface IEntityAdaptor {
    readonly host: any;
    readonly components: ComponentManager;
    readonly isActive: boolean;
    invokeLifecycle(type: string, ...args: any[]): any;
}
/**
 * 实体适配器基类
 */
export declare abstract class EntityAdaptorBase implements IEntityAdaptor {
    private readonly _components;
    private readonly _host;
    get components(): ComponentManager;
    get host(): any;
    abstract get isActive(): boolean;
    constructor(host: any);
    invokeLifecycle(type: string, ...args: any[]): void;
}

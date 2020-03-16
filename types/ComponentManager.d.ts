/**
 * Created by rockyl on 2019-07-29.
 */
import { Component } from "./Component";
import { IEntityAdaptor } from "./EntityAdaptor";
import { Application } from "./Application";
/**
 * 组件管理类
 */
export declare class ComponentManager {
    private _app;
    private _entityAdaptor;
    private _components;
    private _componentsNameMapping;
    private _componentsDefMapping;
    constructor(entityAdaptor: IEntityAdaptor, app: Application);
    applyProxy(): void;
    /**
     * 遍历组件
     * @param callback
     */
    eachComponent(callback: (component: Component, index: number) => unknown): void;
    /**
     * 设置激活状态
     * @param active
     */
    setActive(active: boolean): void;
    /**
     * 时钟更新
     * @param t
     */
    onUpdate(t: number): void;
    /**
     * 交互事件
     */
    onInteract(type: string, e: any): void;
    /**
     * 添加组件
     * @param componentId
     * @param awake
     * @param enabled
     */
    addComponent(componentId: any, awake?: boolean, enabled?: boolean): Component;
    /**
     * 移除组件
     * @param componentId
     * @param index
     */
    removeComponent(componentId: any, index?: number): any;
    /**
     * 移除所有组件
     */
    removeAllComponents(): void;
    /**
     * 获取组件
     * @param componentId
     */
    getComponent(componentId: any): Component;
    /**
     * 获取组件组
     * @param componentId
     */
    getComponents(componentId: any): Component[];
    /**
     * 获取全部组件
     */
    getAllComponents(): Component[];
    /**
     * 添加组件
     * @param component
     * @param index
     * @param awake
     */
    private _add;
    /**
     * 移除组件
     * @param components
     */
    private _remove;
    /**
     * 移除所有组件
     */
    private _removeAll;
    /**
     * 根据组件名称获取指定类的组件列表
     * @param componentId
     */
    private _findByName;
    /**
     * 获取指定类的组件列表
     * @param clazz
     */
    private _find;
    /**
     * 获取指定类的组件
     * @param name
     */
    private _getByName;
    /**
     * 获取指定类的组件
     * @param clazz
     */
    private _getOne;
    /**
     * 获取所有组件
     */
    private get all();
    /**
     * 调用组件上的方法
     * @param methodName
     * @param args
     */
    invokeOnComponents(methodName: any, args: any): void;
    /**
     * 当添加组件时
     * @param component
     * @param awake
     */
    $onAddComponent(component: Component, awake?: boolean): void;
    /**
     * 当移除组件时
     * @param component
     */
    $onRemoveComponent(component: Component): void;
    $instantiateComponent(componentId: any): Component;
}

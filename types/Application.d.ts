/**
 * Created by rockyl on 2020-03-08.
 */
import { IEntity } from "./IEntity";
export interface AdaptorOptions {
    stage: any;
    EntityAdaptor: any;
    addDisplayFunc: (node: IEntity, parent: IEntity) => void;
    traverseFunc: (node: IEntity, callback: (node: any) => boolean | void) => void;
    bubblingFunc: (node: IEntity, callback: (node: any) => boolean | void) => void;
    loadResourceFunc: (configs: any, onProgress?: any, onComplete?: any) => void;
    getResFunc: (name: any) => any;
    protocols?: {
        [key: string]: (app: Application, key: string, value: any, pid?: number) => any;
    };
}
/**
 * 应用
 */
export declare class Application {
    private _options;
    private _componentDefs;
    private _entityDefs;
    entityMap: {};
    /**
     * 配置
     */
    get options(): AdaptorOptions;
    /**
     * 舞台实例
     */
    get stage(): any;
    /**
     * 装配适配器
     * @param options
     * @return mainLoop 主循环方法
     */
    setupAdaptor(options: AdaptorOptions): (delta: number) => void;
    /**
     * 实例化场景或者预制体
     * @param docConfig
     */
    instantiate(docConfig: any): IEntity;
    /**
     * 注册组件类
     * @param id
     * @param def
     */
    registerComponentDef(id: any, def: any): void;
    /**
     * 批量注册组件类
     * @param defs {key: id, def}
     */
    registerComponentDefs(defs: any): void;
    /**
     * 注册实体类
     * @param type
     * @param def
     */
    registerEntityDef(type: any, def: any): void;
    /**
     * 批量注册实体类
     * @param defs
     */
    registerEntityDefs(defs: any): void;
    /**
     * 创建实体实例
     * @param type
     */
    createEntity(type: string): IEntity;
    /**
     * 添加显示节点
     * @param node
     * @param parent
     */
    addDisplayNode(node: IEntity, parent: IEntity): void;
    /**
     * 遍历显示节点
     * @param node
     * @param callback
     */
    traverseDisplayNode(node: IEntity, callback: (node: any) => boolean | void): void;
    /**
     * 冒泡显示节点
     * @param node
     * @param callback
     */
    bubblingDisplayNode(node: IEntity, callback: (node: any) => boolean | void): void;
    /**
     * 加载资源
     * @param configs
     * @param onProgress
     * @param onComplete
     */
    loadResource(configs: any, onProgress?: any, onComplete?: any): void;
    /**
     * 获取资源
     * @param name
     */
    getRes(name: any): any;
    /**
     * 主循环方法，需要在适配器的实现中调用
     * @param delta
     * @private
     */
    private _mainLoop;
    /**
     * 遍历整个渲染树
     * @param delta
     * @param node
     * @private
     */
    private _onHit;
    /**
     * 实例化组件
     * @param id
     */
    $getComponentDef(id: any): any;
}

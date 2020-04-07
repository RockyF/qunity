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
    loadAssetFunc: (config: any, onComplete: (res: any, opt: any) => void) => void;
    protocols?: {
        [key: string]: (app: Application, key: string, value: any, pid?: number) => any;
    };
    context?: any;
}
/**
 * 应用
 */
export declare class Application {
    private _launchOptions;
    private _adaptorOptions;
    private _componentDefs;
    private _entityDefs;
    private _manifest;
    private _sceneConfigCache;
    private _assetsManager;
    entityMap: {};
    /**
     * 启动配置
     */
    get launchOptions(): any;
    /**
     * 适配配置
     */
    get adaptorOptions(): AdaptorOptions;
    /**
     * 获取上下文
     */
    get context(): any;
    /**
     * 舞台实例
     */
    get stage(): any;
    constructor();
    /**
     * 启动
     * @param options
     * @param onProgress
     * @param onComplete
     */
    launch(options?: any, onProgress?: any, onComplete?: any): void;
    /**
     * 预加载场景
     * @param name
     * @param onProgress
     * @param onComplete
     */
    preloadScene(name: string, onProgress?: any, onComplete?: any): void;
    /**
     * 加载场景
     * @param name
     * @param onProgress
     * @param onComplete
     */
    private loadScene;
    _instantiateScene(sceneConfig: any, callback: any): void;
    /**
     * 启动场景
     * @param name
     * @param options
     * @param onProgress
     * @param onComplete
     */
    launchScene(name: string, options?: any, onProgress?: any, onComplete?: any): void;
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
    instantiate(docConfig: any): any;
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
     * 获取全部已注册的实体定义
     */
    get entityDefs(): any;
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
     * 加载单项资源
     * @param config
     * @param onComplete
     */
    loadAsset(config: any, onComplete?: any): void;
    /**
     * 加载资源
     * @param configs
     * @param onProgress
     * @param onComplete
     */
    loadAssets(configs: any, onProgress?: any, onComplete?: any): void;
    /**
     * 获取资源
     * @param uuid
     */
    getAsset(uuid: string): any;
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

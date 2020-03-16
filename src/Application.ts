/**
 * Created by rockyl on 2020-03-08.
 */

import {IEntityAdaptor} from "./EntityAdaptor";
import {IEntity} from "./IEntity";
import {instantiate} from "./interpreter";
import {decodeJson5} from "./utils";

export interface AdaptorOptions {
	stage: any;
	EntityAdaptor: any;
	addDisplayFunc: (node: IEntity, parent: IEntity) => void;
	traverseFunc: (node: IEntity, callback: (node) => boolean | void) => void;
	bubblingFunc: (node: IEntity, callback: (node) => boolean | void) => void;
	loadResourceFunc: (configs, onProgress?, onComplete?) => void;
	getResFunc: (name) => any;
	protocols?: {
		[key: string]: (app: Application, key: string, value: any, pid?: number) => any,
	};
}

/**
 * 应用
 */
export class Application {
	private _options: AdaptorOptions;
	private _componentDefs: any = {};
	private _entityDefs: any = {};
	private _manifest: any;
	private _sceneConfigCache: any = {};

	entityMap = {};

	/**
	 * 配置
	 */
	get options(): AdaptorOptions {
		return this._options;
	}

	/**
	 * 舞台实例
	 */
	get stage() {
		return this._options.stage;
	}

	/**
	 * 启动
	 * @param options
	 * @param onProgress
	 * @param onComplete
	 */
	launch(options?: any, onProgress?, onComplete?) {
		this.loadResource([
			{name: 'manifest.json', url: 'manifest.json'}
		], null, () => {
			let manifest = this._manifest = this.getRes('manifest.json').data;
			let entryScene = manifest.scene.entryScene;
			this.launchScene(entryScene, options, onProgress, onComplete)
		})
	}

	/**
	 * 预加载场景
	 * @param name
	 * @param onProgress
	 * @param onComplete
	 */
	preloadScene(name: string, onProgress?, onComplete?) {
		this.loadScene(name, onProgress, onComplete);
	}

	/**
	 * 加载场景
	 * @param name
	 * @param onProgress
	 * @param onComplete
	 */
	private loadScene(name: string, onProgress?, onComplete?) {
		let scenes = this._manifest.scene.scenes;
		let sceneUrl = scenes[name];

		if (this._sceneConfigCache[name]) {
			onComplete(this._sceneConfigCache[name]);
			return;
		}

		this.loadResource([
			{name: name + '.scene', url: sceneUrl, options: {xhrType: 'text'}},
		], null, () => {
			let res = this.getRes('main.scene');
			let sceneConfig: any = decodeJson5(res.data);

			this._sceneConfigCache[name] = sceneConfig;

			setTimeout(() => {
				this.loadResource(sceneConfig.assets, onProgress, () => {
					onComplete(sceneConfig);
				});
			})
		});
	}

	/**
	 * 启动场景
	 * @param name
	 * @param options
	 * @param onProgress
	 * @param onComplete
	 */
	launchScene(name: string, options?: any, onProgress?, onComplete?) {
		this.loadScene(name, onProgress, (sceneConfig) => {
			let scene = this.instantiate(sceneConfig);
			this.addDisplayNode(scene, this.stage);

			onComplete && onComplete();
		});
	}

	/**
	 * 装配适配器
	 * @param options
	 * @return mainLoop 主循环方法
	 */
	setupAdaptor(options: AdaptorOptions): (delta: number) => void {
		this._options = options;
		return this._mainLoop;
	}

	/**
	 * 实例化场景或者预制体
	 * @param docConfig
	 */
	instantiate(docConfig: any) {
		return instantiate(this, docConfig);
	}

	/**
	 * 注册组件类
	 * @param id
	 * @param def
	 */
	registerComponentDef(id, def) {
		if (def) {
			def['__class__'] = id;
			this._componentDefs[id] = def;
		}
	}

	/**
	 * 批量注册组件类
	 * @param defs {key: id, def}
	 */
	registerComponentDefs(defs) {
		if (defs) {
			for (let id in defs) {
				this.registerComponentDef(id, defs[id]);
			}
		}
	}

	/**
	 * 注册实体类
	 * @param type
	 * @param def
	 */
	registerEntityDef(type, def) {
		if (def) {
			this._entityDefs[type] = def;
		}
	}

	/**
	 * 批量注册实体类
	 * @param defs
	 */
	registerEntityDefs(defs) {
		if (defs) {
			for (let type in defs) {
				this.registerEntityDef(type, defs[type].def);
			}
		}
	}

	/**
	 * 创建实体实例
	 * @param type
	 */
	createEntity(type: string): IEntity {
		let clazz = this._entityDefs[type];

		if (clazz) {
			let entity = new clazz();
			let entityAdaptor = new this._options.EntityAdaptor(entity, this);

			return entity;
		} else {
			throw new Error(`type [${type}] not exists.`)
		}
	}

	/**
	 * 添加显示节点
	 * @param node
	 * @param parent
	 */
	addDisplayNode(node: IEntity, parent: IEntity) {
		this._options.addDisplayFunc(node, parent);
	}

	/**
	 * 遍历显示节点
	 * @param node
	 * @param callback
	 */
	traverseDisplayNode(node: IEntity, callback: (node) => boolean | void) {
		this._options.traverseFunc(node, callback);
	}

	/**
	 * 冒泡显示节点
	 * @param node
	 * @param callback
	 */
	bubblingDisplayNode(node: IEntity, callback: (node) => boolean | void) {
		this._options.bubblingFunc(node, callback);
	}

	/**
	 * 加载资源
	 * @param configs
	 * @param onProgress
	 * @param onComplete
	 */
	loadResource(configs, onProgress?, onComplete?) {
		this._options.loadResourceFunc(configs, onProgress, onComplete);
	}

	/**
	 * 获取资源
	 * @param name
	 */
	getRes(name): any {
		return this._options.getResFunc(name);
	}

	/**
	 * 主循环方法，需要在适配器的实现中调用
	 * @param delta
	 * @private
	 */
	private _mainLoop = (delta: number) => {
		this._options.traverseFunc(this._options.stage, this._onHit.bind(this, delta))
	};

	/**
	 * 遍历整个渲染树
	 * @param delta
	 * @param node
	 * @private
	 */
	private _onHit(delta, node) {
		if (node['entityAdaptor']) {
			let entityAdaptor: IEntityAdaptor = node['entityAdaptor'];
			entityAdaptor.invokeLifecycle('update', delta);
		}
	}

	/**
	 * 实例化组件
	 * @param id
	 */
	$getComponentDef(id: any): any {
		let def;
		let idType = typeof id;
		switch (idType) {
			case 'string':
				def = this._componentDefs[id];
				break;
			case 'function':
				def = id;
				break;
		}

		if (!def) {
			console.warn(`component [${id}] not exists.`);
			return;
		}
		const className = def['__class__'];
		if (!className) {
			console.warn(`component [${id}] is not registered.`);
			return;
		}

		return def;
	}
}

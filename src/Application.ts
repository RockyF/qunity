/**
 * Created by rockyl on 2020-03-08.
 */

import {IEntityAdaptor} from "./EntityAdaptor";
import {Component} from "./Component";
import {IEntity} from "./IEntity";

export interface AdaptorOptions {
	stage: any;
	EntityAdaptor: any;
	traverseFunc: (node, callback: (node) => boolean | void) => void;
	loadResourceFunc: (configs, onProgress?, onComplete?) => void;
	getResFunc: (name) => any;
}

/**
 * 应用
 */
export class Application {
	private _options: AdaptorOptions;
	private _componentDefs: any = {};
	private _entityDefs: any = {};

	/**
	 * 舞台实例
	 */
	get stage() {
		return this._options.stage;
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
				this.registerEntityDef(type, defs[type]);
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
		if(!className){
			console.warn(`component [${id}] is not registered.`);
			return;
		}

		return def;
	}
}

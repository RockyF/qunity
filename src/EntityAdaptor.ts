/**
 * Created by rockyl on 2020-03-07.
 */

import {ComponentManager} from "./ComponentManager";
import {Application} from "./Application";

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

	invokeLifecycle(type: string, ...args);
	invokeInteractionEvent(type: string, ...args);
}

/**
 * 实体适配器基类
 */
export abstract class EntityAdaptorBase implements IEntityAdaptor {
	private readonly _components: ComponentManager;
	private readonly _entity: any;

	/**
	 * @inheritDoc
	 */
	get components(): ComponentManager {
		return this._components;
	}

	/**
	 * @inheritDoc
	 */
	get entity() {
		return this._entity;
	}

	/**
	 * @inheritDoc
	 */
	abstract get isActive():boolean;

	constructor(entity: any, app: Application) {
		this._entity = entity;
		this._components = new ComponentManager(this, app);

		entity.entityAdaptor = this;
	}

	/**
	 * 触发生命周期方法
	 * @param type
	 * @param args
	 */
	invokeLifecycle(type: string, ...args) {
		switch (type) {
			case 'update':
				const [delta] = args;
				this._components.onUpdate(delta);
				break;
		}
	}

	/**
	 * 触发交互事件方法
	 * @param type
	 * @param e
	 */
	invokeInteractionEvent(type: string, e) {
		this._components.onInteract(type, e);
	}
}

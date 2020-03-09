/**
 * Created by rockyl on 2019-07-28.
 */

import {HashObject} from "./HashObject";
import {IEntityAdaptor} from "./EntityAdaptor";

export interface IComponent{
	readonly entityAdaptor:IEntityAdaptor;
	readonly entity:any;
	enabled: boolean;

	onAwake();
	onEnable();
	onDisable();
	onUpdate(t: number);
	afterUpdate(t: number);
	onDestroy();
}

/**
 * 组件类
 */
export class Component extends HashObject implements IComponent{
	private _entityAdaptor: IEntityAdaptor;
	private _enabled: boolean = true;

	get entityAdaptor(): IEntityAdaptor {
		return this._entityAdaptor;
	}

	get entity(): any {
		return this._entityAdaptor.entity;
	}

	constructor() {
		super();

	}

	/**
	 * 是否有效
	 */
	get enabled(): boolean {
		return this._enabled;
	}

	set enabled(value: boolean) {
		if (this._enabled != value) {
			this._enabled = value;

			if (this._entityAdaptor && this._entityAdaptor.isActive) {
				if (value) {
					this.onEnable();
				} else {
					this.onDisable();
				}
			}
		}
	}

	/**
	 * @private
	 */
	$awake(entityAdaptor: IEntityAdaptor) {
		this._entityAdaptor = entityAdaptor;
		this.onAwake();
	}

	/**
	 * @private
	 */
	$destroy() {
		this._entityAdaptor = null;
		this.onDestroy();
	}

	/**
	 * 当组件被唤醒时
	 */
	onAwake() {

	}

	/**
	 * 当生效时
	 * 仅当实体唤醒状态
	 */
	onEnable() {

	}

	/**
	 * 当失效时
	 * 仅当实体唤醒状态
	 */
	onDisable() {

	}

	/**
	 * 时钟更新
	 * @param t
	 */
	onUpdate(t: number) {

	}

	/**
	 * 时钟更新回溯
	 * @param t
	 */
	afterUpdate(t: number) {

	}

	/**
	 * 当被销毁时
	 */
	onDestroy() {

	}

	/**
	 * @private
	 * @param t
	 */
	$onUpdate(t: number) {
		if (this._enabled) {
			this.onUpdate(t);
		}
	}

	/**
	 * @private
	 * @param t
	 */
	$afterUpdate(t: number) {
		if (this._enabled) {
			this.afterUpdate(t);
		}
	}
}

/**
 * Created by rockyl on 2019-07-28.
 */

import {HashObject} from "./HashObject";
import {IEntityAdaptor} from "./EntityAdaptor";
import {IEntity} from "./IEntity";

export interface IComponent {
	readonly entityAdaptor: IEntityAdaptor;
	readonly entity: any;
	enabled: boolean;

	broadcast(methodName: string, ...args);

	bubbling(methodName: string, ...args);

	awake();

	start();

	onEnable();

	onDisable();

	update(delta: number);

	onDestroy();

	onClick(e);

	onMouseDown(e);

	onMouseMove(e);

	onMouseUp(e);

	onMouseUpOutside(e);
}

/**
 * 组件类
 */
export class Component extends HashObject implements IComponent {
	private _entityAdaptor: IEntityAdaptor;
	private _enabled: boolean = false;
	private _started: boolean = false;

	get entityAdaptor(): IEntityAdaptor {
		return this._entityAdaptor;
	}

	get entity(): IEntity {
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

			if (this._entityAdaptor && this._entityAdaptor.getActive()) {
				if (value) {
					this._started = false;
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
		this.awake();
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
	awake() {

	}

	/**
	 * 当组件开始
	 */
	start() {

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
	update(t: number) {

	}

	/**
	 * 当被销毁时
	 */
	onDestroy() {

	}

	/**
	 * @private
	 * @param delta
	 */
	$onUpdate(delta: number) {
		if (this._enabled) {
			if (!this._started) {
				this._started = true;
				this.start();
			}
			this.update(delta);
		}
	}

	/**
	 * 当点击时
	 * @param e
	 */
	onClick(e) {
	}

	/**
	 * 当鼠标按下
	 * @param e
	 */
	onMouseDown(e) {
	}

	/**
	 * 当鼠标移动
	 * @param e
	 */
	onMouseMove(e) {
	}

	/**
	 * 当鼠标松开
	 * @param e
	 */
	onMouseUp(e) {
	}

	/**
	 * 当鼠标在实体外侧松开
	 * @param e
	 */
	onMouseUpOutside(e) {
	}

	/**
	 * 向下广播执行
	 * @param methodName
	 * @param args
	 */
	broadcast(methodName: string, ...args) {
		this._entityAdaptor.app.traverseDisplayNode(this.entity, (node: IEntity) => {
			node.invokeOnComponents && node.invokeOnComponents(methodName, args);
		})
	}

	/**
	 * 向上冒泡执行
	 * @param methodName
	 * @param args
	 */
	bubbling(methodName: string, ...args) {
		this._entityAdaptor.app.bubblingDisplayNode(this.entity, (node: IEntity) => {
			node.invokeOnComponents && node.invokeOnComponents(methodName, args);
		})
	}
}

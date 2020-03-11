/**
 * Created by rockyl on 2020-03-09.
 */

import {IComponent} from "./Component";

/**
 * 实体接口
 */
export interface IEntity {
	/**
	 * 激活状态
	 */
	readonly active: boolean;

	/**
	 * 设置激活状态
	 * @param active
	 */
	setActive(active: boolean);

	/**
	 * 添加组件
	 * @param componentId
	 */
	addComponent(componentId: string | Function): IComponent;

	/**
	 * 移除组件
	 * @param componentId
	 * @param index
	 */
	removeComponent(componentId: string | Function, index?: number): IComponent[];

	/**
	 * 移除所有组件
	 */
	removeAllComponents();

	/**
	 * 获取组件
	 * @param componentId
	 */
	getComponent(componentId: string | Function): IComponent;

	/**
	 * 获取组件组
	 * @param componentId
	 */
	getComponents(componentId: string | Function): IComponent[];
}

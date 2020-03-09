/**
 * Created by rockyl on 2020-03-09.
 */
/**
 * 实体接口
 */
export interface IEntity {
    /**
     * 添加组件
     * @param componentId
     */
    addComponent(componentId: string | Function): any;
    /**
     * 移除组件
     * @param componentId
     * @param index
     */
    removeComponent(componentId: string | Function, index?: number): any;
    /**
     * 移除所有组件
     */
    removeAllComponents(): any;
    /**
     * 获取组件
     * @param componentId
     */
    getComponent(componentId: string | Function): any;
    /**
     * 获取组件组
     * @param componentId
     */
    getComponents(componentId: string | Function): any;
}

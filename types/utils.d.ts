/**
 * Created by rockyl on 2020-03-09.
 */
/**
 * 线性插值
 * @param begin number
 * @param end number
 * @param t number
 * @param allowOutOfBounds
 * @return number
 */
export declare function lerp(begin: number, end: number, t: number, allowOutOfBounds?: boolean): number;
/**
 * 线性插值
 * @param begin
 * @param end
 * @param t number
 * @param allowOutOfBounds
 * @return number
 */
export declare function lerpVector2(begin: {
    x: number;
    y: number;
}, end: {
    x: number;
    y: number;
}, t: number, allowOutOfBounds?: boolean): {
    x: number;
    y: number;
};
/**
 * 线性插值
 * @param begin
 * @param end
 * @param t number
 * @param allowOutOfBounds
 * @return number
 */
export declare function lerpVector3(begin: {
    x: number;
    y: number;
    z: number;
}, end: {
    x: number;
    y: number;
    z: number;
}, t: number, allowOutOfBounds?: boolean): {
    x: number;
    y: number;
    z: number;
};
/**
 * json5字符串转对象
 * @param str
 */
export declare function decodeJson5(str: any): any;
/**
 * 属性注入方法
 * @param target 目标对象
 * @param data 被注入对象
 * @param callback 自定义注入方法
 * @param ignoreMethod 是否忽略方法
 * @param ignoreNull 是否忽略Null字段
 *
 * @return 是否有字段注入
 */
export declare function injectProp(target: any, data?: any, callback?: Function, ignoreMethod?: boolean, ignoreNull?: boolean): boolean;

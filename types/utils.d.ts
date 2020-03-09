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

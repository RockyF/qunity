/**
 * Created by rockyl on 2018/11/6.
 *
 */
import { HashObject } from "./HashObject";
import { vector2 } from "./ReType";
/**
 * 2D矢量
 */
export declare class Vector2 extends HashObject implements vector2 {
    /**
     * x分量
     */
    x: number;
    /**
     * y分量
     */
    y: number;
    onChange: Function;
    /**
     * 创建一个2D矢量
     * @param x x分量
     * @param y y分量
     * @param onChange 当改变时触发
     */
    constructor(x?: number, y?: number, onChange?: Function);
    $onModify(value: any, key: any, oldValue: any): void;
    /**
     * 设置分量
     * @param x
     * @param y
     */
    setXY(x?: number, y?: number): Vector2;
    /**
     * 从一个向量拷贝分量
     * @param v2
     */
    copyFrom(v2: any): Vector2;
    /**
     * 克隆出一个向量
     */
    clone(): Vector2;
    /**
     * 把向量置空
     */
    zero(): Vector2;
    /**
     * 是不是一个0向量
     */
    get isZero(): boolean;
    /**
     * 单位化向量
     */
    normalize(): Vector2;
    /**
     * 是不是一个单位向量
     */
    get isNormalized(): boolean;
    /**
     * 截取向量长度
     * @param max
     */
    truncate(max: any): Vector2;
    /**
     * 向量反向
     */
    reverse(): Vector2;
    /**
     * 获取点乘
     * @param v2
     */
    dotProd(v2: any): number;
    /**
     * 获取叉乘
     * @param v2
     */
    crossProd(v2: any): number;
    /**
     * 获取长度的平方
     * @param v2
     */
    distSQ(v2: any): number;
    /**
     * 获取两个向量的距离
     * @param v2
     */
    distance(v2: any): number;
    /**
     * 向量加法
     * @param v2
     */
    add(v2: any): Vector2;
    /**
     * 向量减法
     * @param v2
     */
    subtract(v2: any): Vector2;
    /**
     * 向量乘于某个数
     * @param value
     */
    multiply(value: number): Vector2;
    /**
     * 向量除于某个数
     * @param value
     */
    divide(value: number): Vector2;
    /**
     * 向量角度
     * @param value
     */
    set angle(value: number);
    get angle(): number;
    /**
     * 向量弧度
     * @param value
     */
    set radian(value: number);
    get radian(): number;
    /**
     * 是否等于某个向量
     * @param v2
     */
    equals(v2: any): boolean;
    /**
     * 向量长度
     * @param value
     */
    get length(): number;
    set length(value: number);
    /**
     * 获取向量长度的平方
     */
    get lengthSQ(): number;
    /**
     * 获取向量斜率
     */
    get slope(): number;
    toString(): string;
    toObj(): {
        x: number;
        y: number;
    };
    toArray(): number[];
    static corner(v1: any, v2: any): number;
}

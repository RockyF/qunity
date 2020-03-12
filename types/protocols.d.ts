/**
 * Created by rockyl on 2020-03-11.
 */
import { Application } from "./Application";
export declare enum Protocols {
    RES = "res://",
    ENTITY = "entity://"
}
export declare const protocols: {
    [Protocols.RES]: typeof res;
    [Protocols.ENTITY]: typeof entity;
};
declare function res(app: Application, key: string, value: any): any;
declare function entity(app: Application, key: string, value: any, pid?: number): any;
export {};

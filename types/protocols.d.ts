/**
 * Created by rockyl on 2020-03-11.
 */
import { Application } from "./Application";
export declare enum Protocols {
    ASSET = "asset://",
    ENTITY = "entity://"
}
export declare const protocols: {
    [Protocols.ASSET]: typeof asset;
    [Protocols.ENTITY]: typeof entity;
};
declare function asset(app: Application, key: string, value: any): any;
declare function entity(app: Application, key: string, value: any, pid?: number): any;
export {};

/**
 * Created by rockyl on 2020-03-10.
 */
import { Application } from "./Application";
export interface IDoc {
    name: string;
    type: 'scene' | 'prefab';
    factory: Function;
    assets: any[];
}
/**
 * 实例化节点树
 * @param app
 * @param doc
 */
export declare function instantiate(app: Application, doc: IDoc): any;
export declare function parseViewDoc(app: Application, docSource: any): IDoc;

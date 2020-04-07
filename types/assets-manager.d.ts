/**
 * Created by rockyl on 2020-03-20.
 */
import { Application } from "./Application";
export declare class AssetsManager {
    private _app;
    private _assetCache;
    constructor(app: Application);
    addAsset(asset: any, opt: any): void;
    getAsset(uuid: string): any;
    clean(): void;
}

export interface AdaptorOptions {
    stage: any;
    traverseFunc: (node: any, callback: (node: any) => boolean | void) => void;
}
export declare function setupAdaptor(options: AdaptorOptions): (delta: number) => void;

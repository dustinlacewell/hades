import { Container } from "inversify";
export declare type Constructor = {
    new (...args: any[]): {};
};
export declare type Constructable = {
    constructor: any;
};
export declare type Installer = (di: Container) => void;
export declare type Newable<T> = new (...args: any[]) => T;

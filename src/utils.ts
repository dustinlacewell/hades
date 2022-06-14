import { Container } from "inversify";

export type Constructor = { new(...args: any[]): {} };
export type Constructable = { constructor: any };
export type Newable<T> = new (...args: any[]) => T;
export type InstallerFunc = (container: Container) => void;
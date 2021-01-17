import { injectable } from "inversify";


export const commandRegistry = {};

export default function command(name: string) {
    function D<T extends { new(...args: any[]): {} }>(constructor: T) {
        commandRegistry[name] = constructor;
        const newClass = class extends constructor {
            name = name;
        }
        return injectable()(newClass);
    }
    return D;
};



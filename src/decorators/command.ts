import { injectable } from "inversify";


export const commandRegistry = {};

export default function command(name: string) {
    function D<T extends { new(...args: any[]): {} }>(constructor: T) {
        const newClass = class extends constructor {
            name = name;
        }
        commandRegistry[name] = newClass;
        return injectable()(newClass);
    }
    return D;
};



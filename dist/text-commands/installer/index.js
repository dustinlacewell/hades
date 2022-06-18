"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextCommandsInstaller = exports.defaultMappedTypes = void 0;
const Installer_1 = require("../../Installer");
const installCommands_1 = require("./installCommands");
const installDefaultMappedTypes_1 = require("./installDefaultMappedTypes");
const installParsers_1 = require("./installParsers");
var installDefaultMappedTypes_2 = require("./installDefaultMappedTypes");
Object.defineProperty(exports, "defaultMappedTypes", { enumerable: true, get: function () { return installDefaultMappedTypes_2.defaultMappedTypes; } });
/**
 * Installs text command support in HadesContainer.
 */
class TextCommandsInstaller extends Installer_1.Installer {
    constructor(mappedTypes = installDefaultMappedTypes_1.defaultMappedTypes) {
        super();
        this.mappedTypes = mappedTypes;
    }
    install(container) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, installDefaultMappedTypes_1.installDefaultMappedTypes)(container, this.mappedTypes);
            (0, installParsers_1.installParsers)(container);
            (0, installCommands_1.installCommands)(container);
        });
    }
}
exports.TextCommandsInstaller = TextCommandsInstaller;
//# sourceMappingURL=index.js.map
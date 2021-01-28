"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArgError_1 = __importDefault(require("../commands/ArgError"));
const Validator_1 = __importDefault(require("./Validator"));
class YoutubeIdValidator extends Validator_1.default {
    validate(arg, ctx, value) {
        if (!YoutubeIdValidator._channelIdRegExp.test(value)) {
            throw new ArgError_1.default(`\`${arg.name}\` must be a valid Youtube channel ID.`);
        }
        return;
    }
}
exports.default = YoutubeIdValidator;
YoutubeIdValidator._channelIdRegExp = new RegExp(/UC[\w-]{21}[AQgw]/);
//# sourceMappingURL=YoutubeIdValidator.js.map
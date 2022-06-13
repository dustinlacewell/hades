"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeIdValidator = void 0;
const TextArgError_1 = require("../errors/TextArgError");
const Validator_1 = require("./Validator");
class YoutubeIdValidator extends Validator_1.Validator {
    validate(arg, ctx, value) {
        if (!YoutubeIdValidator._channelIdRegExp.test(value)) {
            throw new TextArgError_1.TextArgError(`\`${arg.name}\` must be a valid Youtube channel ID.`);
        }
        return;
    }
}
exports.YoutubeIdValidator = YoutubeIdValidator;
YoutubeIdValidator._channelIdRegExp = new RegExp(/UC[\w-]{21}[AQgw]/);
//# sourceMappingURL=YoutubeIdValidator.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.fromFile = (path) => {
    try {
        return fs_1.default.readFileSync(`./json/locales/${path}`).toJSON().data;
    }
    catch (err) {
        console.log(err);
        return;
    }
};
//# sourceMappingURL=fromFile.js.map
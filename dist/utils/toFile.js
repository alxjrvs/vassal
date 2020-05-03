"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.toFile = (name, data) => {
    const filename = `./json/locales/${name}.json`;
    console.log(`Writing ${filename}`);
    return fs_1.default.writeFileSync(filename, data);
};
//# sourceMappingURL=toFile.js.map
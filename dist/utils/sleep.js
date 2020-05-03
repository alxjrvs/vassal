"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
};
//# sourceMappingURL=sleep.js.map
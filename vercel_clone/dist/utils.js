"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomId = generateRandomId;
const MAX_LEN = 10;
function generateRandomId() {
    let generatedId = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < MAX_LEN; i++) {
        generatedId += characters[Math.floor(Math.random() * characters.length)];
    }
    return generatedId;
}

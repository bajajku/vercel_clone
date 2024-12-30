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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const simple_git_1 = __importDefault(require("simple-git"));
const utils_1 = require("./utils");
const path_1 = __importDefault(require("path"));
const file_1 = require("./file");
const aws_1 = require("./aws");
(0, aws_1.uploadFile)('test.txt', 'Users/kevin/Desktop/test.txt');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // middleware to parse incoming requests with JSON payloads
// initializes a single endpoint that accepts POST requests
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // github url
    const repoUrl = req.body.repoUrl;
    const id = (0, utils_1.generateRandomId)();
    yield (0, simple_git_1.default)().clone(repoUrl, path_1.default.join(__dirname, `./output/${id}`));
    res.json({
        id: id
    });
    // extract all files from the cloned repo
    const files = (0, file_1.getAllFiles)(path_1.default.join(__dirname, `./output/${id}`));
}));
app.listen(3000);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFiles = void 0;
const fs_1 = __importDefault(require("fs")); // File System library, let's you read/write files
const path_1 = __importDefault(require("path"));
const getAllFiles = (folderPath) => {
    /*
    * This function will return all files in a folder and its subfolders
    args:
        folderPath: string
    returns:
        response: string[]
    */
    let response = [];
    // get all files and folders in the folder
    const allFilesAndFolders = fs_1.default.readdirSync(folderPath);
    allFilesAndFolders.forEach(fileOrFolder => {
        const fullPath = path_1.default.join(folderPath, fileOrFolder);
        // if the current file/folder is a folder, call the function recursively
        if (fs_1.default.statSync(fullPath).isDirectory()) {
            // append the response to the current response
            response = response.concat((0, exports.getAllFiles)(fullPath));
        }
        else {
            // append the current file to the response, base case
            response.push(fullPath);
        }
    });
    return response;
};
exports.getAllFiles = getAllFiles;

import fs from 'fs'; // File System library, let's you read/write files
import path from 'path';

export const getAllFiles = (folderPath: string) => {

    /*
    * This function will return all files in a folder and its subfolders
    args: 
        folderPath: string
    returns:
        response: string[]
    */
    let response: string[] = [];

    // get all files and folders in the folder
    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach(fileOrFolder =>{
        const fullPath = path.join(folderPath, fileOrFolder);
        // if the current file/folder is a folder, call the function recursively
        if(fs.statSync(fullPath).isDirectory()){

            // append the response to the current response
            response = response.concat(getAllFiles(fullPath));
        }else{
            // append the current file to the response, base case
            response.push(fullPath);
        }
    });

    return response;



}
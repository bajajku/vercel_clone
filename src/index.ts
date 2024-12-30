import express from 'express';
import cors from 'cors';
import simpleGit from 'simple-git';
import { generateRandomId } from './utils';
import path from 'path';
import { get } from 'http';
import { getAllFiles } from './file';


const app = express();
app.use(cors());
app.use(express.json()); // middleware to parse incoming requests with JSON payloads

// initializes a single endpoint that accepts POST requests
app.post("/deploy", async (req, res) => {

    // github url
    const repoUrl = req.body.repoUrl;
    const id = generateRandomId();
    await simpleGit().clone(repoUrl, path.join(__dirname, `./output/${id}`));
    res.json(
        { 
            id: id 
        }
    );

    // extract all files from the cloned repo
    const files = getAllFiles(path.join(__dirname, `./output/${id}`));



})
app.listen(3000);
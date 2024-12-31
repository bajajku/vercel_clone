import express from 'express';
import cors from 'cors';
import simpleGit from 'simple-git';
import { generateRandomId } from './utils';
import path from 'path';
import { get } from 'http';
import { getAllFiles } from './file';
import { uploadFile } from './aws';
import {createClient} from "redis";
const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();

const app = express();
app.use(cors());
app.use(express.json()); // middleware to parse incoming requests with JSON payloads

// initializes a single endpoint that accepts POST requests
app.post("/deploy", async (req, res) => {

    // github url
    const repoUrl = req.body.repoUrl;
    const id = generateRandomId();
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));


    // extract all files from the cloned repo
    const files = getAllFiles(path.join(__dirname, `output/${id}`));
    files.forEach(async (file) => {
        await uploadFile(file.slice(__dirname.length + 1), file);
    });

    publisher.lPush("uploads", id);
    publisher.hSet("status", id, "uploaded");
    
    res.json(
        { 
            id: id 
        }
    );


});

app.get("/status", async(req, res) => {
    const id = req.query.id;
    const response = await subscriber.hGet("status", id as string);

    res.json({
        status: response
    })
})
app.listen(3000);
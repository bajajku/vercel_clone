import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // middleware to parse incoming requests with JSON payloads

// initializes a single endpoint that accepts POST requests
app.post("/deploy", (req, res) => {

    // github url
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);

    res.json({ message: "Deploying..." });
})
app.listen(3000);
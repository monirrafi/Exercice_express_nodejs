import express from "express";
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname,"client")));

app.get("/",(req,rep)=>{
    rep.sendFile(path.join(__dirname,"client","index.html"));
})


app.listen(port,()=> console.log(`serveur runnig on port ${port}`));

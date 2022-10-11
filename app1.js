import express from "express";
import studentRouter from "./router/students.js"
const app = express();
const port = 5500;

app.use(express.json());

app.get("/",(req,rep)=>{
    rep.send("welcome");
})

app.use("/students", studentRouter);

app.listen(port,()=> console.log(`serveur runnig on port ${port}`));

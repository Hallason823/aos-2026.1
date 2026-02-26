import "dotenv/config";
import express from "express";

const app = express();

const porta = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
    res.send("RES: " + process.env.MESSAGE);
});

app.listen(porta, () => console.log(
    "Example app listening on port " + porta + "!\n" + process.env.MESSAGE
));
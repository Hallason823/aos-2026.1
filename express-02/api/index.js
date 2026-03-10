import "dotenv/config";
import cors from "cors";
import express from "express";
import { quotes } from '../data/quotes.js';
import { getRandomNumber } from '../utils/randomNumber.js';

const app = express();
app.use(cors());

//Main route
app.get("/", (req, res) => {
    res.send(
        "API Express working! Available endpoints: /random | /dado | /citacoes"
    );
});

//Random route
app.get("/random", (req, res) => {
    const randomNumber = getRandomNumber(1, 1000);
    res.send({ randomNumber }
    );
});

//Dice route
app.get("/dado", (req, res) => {
    const diceNumber = getRandomNumber(1, 6);
    res.send({ diceNumber }
    );
});

//Quotes route
app.get("/citacoes", (req, res) => {
    const idxRandom = getRandomNumber(0, quotes.length - 1);
    const quoteRandom = quotes[idxRandom];
    res.send({ quoteRandom }
    );
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => 
    console.log (
        "App listening on port " + port + "!\n" + process.env.MESSAGE,
    ),
);
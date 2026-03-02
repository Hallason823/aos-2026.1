import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("RES: " + (process.env.MESSAGE || "Without message"));
});

if (process.env.NODE_ENV !== 'production') {
    const porta = process.env.PORT ?? 3000;
    app.listen(porta, () => console.log(`Running in the http://localhost:${porta}`));
}

export default app;

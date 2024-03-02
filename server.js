const express = require("express");
const mongodb = require("./data/database")
const indexRoute = require("./routes");

const app = express();

const port = process.env.PORT || 3000;

app.use("/", indexRoute);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to database and listening on port ${port}`);
        });
    }
});
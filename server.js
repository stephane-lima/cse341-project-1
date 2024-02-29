const express = require("express");
const app = express();
const indexRoute = require("./routes");

app.use("/", indexRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
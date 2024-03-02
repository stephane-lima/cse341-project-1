const express = require("express");
const router = express.Router();
const contactRoute = require("./contacts")

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.use("/contacts", contactRoute)

module.exports = router;
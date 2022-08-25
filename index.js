const express = require("express");
const app = express();
app.use(express.static("./static"));
app.get("*", (req, res) => {
    if (req.url.endsWith("core-sw.js")) res.sendFile(__dirname + "/static/core-sw.js");
    else res.sendFile(__dirname + "/static/index.html");
});
const port = process.env.PORT || 3333;
console.log(`http://localhost:${port}`);
app.listen(port);

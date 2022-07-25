const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const PORT = process.env.APP_PORT || 4200;
const routers = require("./routes");
require('./config');

// Express Application
const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "3000mb" }));
app.use(bodyParser.urlencoded({ limit: "3000mb", extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
routers(app);

// Create Server
const server = http.createServer(app);
server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
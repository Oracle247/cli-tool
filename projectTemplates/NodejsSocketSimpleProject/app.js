const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Socket.io
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connect", (socket) => {
    socket.on("join-room", (roomId, userId) => {
        if(roomId === ""){
			socket.broadcast.emit.emit("user-connected", userId);
		}
		else{
			socket.join(roomId);
            socket.to(roomId).broadcast.emit("user-connected", userId);
		}
    });
});

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//To handle cors errors
app.use(cors());

// For Static files
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/index.js"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));
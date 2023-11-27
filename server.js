const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
// const morgan = require("morgan");
require('express-async-errors');
const mongoose = require('mongoose');
const router = require('./routes/router');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: ['https://bynsocial.up.railway.app' , 'https://admin.bynsocial.up.railway.app'],
        methods: ['GET', 'POST'],
        credentials: true,
        transports: ['websocket', 'polling'],
    },
    allowEIO3: true
});
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// app.use(morgan("combined"));
app.use(cors());
app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["'self'", "https:", "data:", "blob:" , "bynsocial.up.railway.app" , "admin.bynsocial.up.railway.app"]
    }
}));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './client/build')));
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'), (err) => {
        if (err) {
            res.status(500).json(err);
        }
    });
    next();
});
app.use(router);

const usersActive = [];

io.on('connection', (socket) => {
    socket.on('connected', (userId) => {
        if (userId !== null) {
            const user = {
                userId: userId,
                socketId: socket.id,
                active: true
            };
            if (!usersActive.some((e) => e.userId === userId)) {
                usersActive.push(user);
            }
            io.emit('userActive', usersActive);
        }
    });
    socket.on('signUp', () => {
        io.emit('getAllUsers');
    });
    socket.on('created', () => {
        io.emit('notificationServerEmit');
    });
    socket.on('postTransaction', () => {
        io.emit('postTransactionServerEmit');
    });
    socket.on('commentTransaction', () => {
        io.emit('commentTransactionServerEmit');
    });
    socket.on('replyTransaction', () => {
        io.emit('replyTransactionServerEmit');
    });
    socket.on('createChat', () => {
        io.emit('createChat');
    });
    socket.on("deleteMsg", (receiverUserIdOfChatToDelete) => {
        const userSocketId = usersActive.find((e) => e.userId === receiverUserIdOfChatToDelete);
        if (userSocketId !== undefined && userSocketId !== null) {
            io.to(userSocketId.socketId).emit('createChat');
        }
    });
    socket.on('createChatMsg', ({ msgData, receiverData }) => {
        const userSocketId = usersActive.find((e) => e.userId === receiverData);
        if (userSocketId !== undefined && userSocketId !== null) {
            io.to(userSocketId.socketId).emit('createChatMsg', msgData);
        }
    });
    socket.on('disconnect', () => {
        const userDisconnect = usersActive.find((e) => e.socketId === socket.id);
        const removeUserDisconnect = usersActive.findIndex((e) => e.socketId === userDisconnect?.socketId);
        if (userDisconnect !== undefined && userDisconnect !== null) {
            userDisconnect.active = false;
            io.emit('disconnected', userDisconnect);

            if (removeUserDisconnect !== -1) {
                usersActive.splice(removeUserDisconnect, 1);
            }
        }
    });
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    server.listen(PORT, () => {
        console.log('Connecting to database and starting server...');
    });
}).catch((err) => {
    console.log(err);
});
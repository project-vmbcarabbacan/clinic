require('dotenv').config();
require('./src/infrastructure/helpers/helpers');
const express = require('express')
const path = require('path');
const http = require('http')
const { connectDatabase } = require('./src/infrastructure/database/mongoose')
const Constants = require('./src/infrastructure/utils/Constants')
const Types = require('./src/infrastructure/utils/Types')
const authRoutes = require('./src/infrastructure/web/routes/AuthRouter')
const userRoutes = require('./src/infrastructure/web/routes/UserRouter')
const appointmentRoutes = require('./src/infrastructure/web/routes/AppointmentRouter')
const whatsapp = require('./src/infrastructure/web/routes/WhatsappRouter')
const container = require('./src/infrastructure/di/Container')
const cors = require('cors')
const { Server } = require("socket.io");

const auth = container.resolve(Types.MIDDLEWARE.AUTHORIZATION);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:8081", // Vue CLI default port
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected");
  
    socket.on("chat_message", (message) => {
      io.emit("chat_message", message);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  global.io = io;

app.use(express.json({ 
  verify: (req, res, buf, encoding) => {
    req.rawBody = buf?.toString(encoding || "utf8");
  },
  limit: '50mb',
 }));
const corsOptions = {
    origin: 'http://localhost:8081', // Replace with your Vue app's URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/secure', authRoutes);
app.use('/user', auth.handle(), userRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/whatsapp', whatsapp);


(async () => {
    await connectDatabase();

    server.listen(Constants.APPLICATION.PORT, () => {
        console.log(`Server running on port ${Constants.APPLICATION.PORT}`);
    })
})()


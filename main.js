require('dotenv').config();
const express = require('express')
const multer = require('multer');
const { connectDatabase } = require('./src/infrastructure/database/mongoose')
const Constants = require('./src/infrastructure/utils/Constants')
const Types = require('./src/infrastructure/utils/Types')
const authRoutes = require('./src/infrastructure/web/routes/AuthRouter')
const userRoutes = require('./src/infrastructure/web/routes/UserRouter')
const container = require('./src/infrastructure/di/Container')
const cors = require('cors')

const auth = container.resolve(Types.MIDDLEWARE.AUTHORIZATION);

const app = express();
app.use(express.json({ limit: '50mb' }));
const corsOptions = {
    origin: 'http://localhost:8080', // Replace with your Vue app's URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/secure', authRoutes);
app.use('/user', auth.handle(), userRoutes);


(async () => {
    await connectDatabase();

    app.listen(Constants.APPLICATION.PORT, () => {
        console.log(`Server running on port ${Constants.APPLICATION.PORT}`);
    })
})()


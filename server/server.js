require('dotenv').config();  //for dotenv environment
const express = require('express');
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');
const connectDb = require('./utils/db');
const errorMiddleWare = require('./middlewares/error-middleware');
const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "POST, PUT, GET, PATCH, DELETE, HEAD",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());   //to accept json structure in the application
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);
app.use('/api/admin', adminRoute);

app.get('/', (req, res) => {   //default home page
    res.status(200).send('Welcome to mern page');
});


// app.get('/register', (req, res)=> {
//     res.status(200).send('Welcome to Registration page');
// });

app.use(errorMiddleWare);  //adding the errorMiddleware

const PORT = 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
});
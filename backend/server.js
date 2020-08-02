const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');

/**
 * App
 */
const app = express();

/**
 * Database
 */
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('>>> Database connected');
});

/**
 * Middleware
 */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

/**
 * Routes
 */
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);

/**
 * Listen
 */
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`>>> Listening on port ${port}`);
})
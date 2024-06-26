const express = require('express');
const cors = require('cors');

const db = require('./models');

//Import and initialise the environment variables - stored in .dotenv file in project root
require('dotenv').config();

//Import Routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const competitionRoutes = require('./routes/competition');
const scoreRoutes = require('./routes/score');

//Initialise Express
const app = express();

//Set up parser so we can read JSON info from the request
app.use(express.json());

app.use(cors())

//Set up API routes
app.use('/api/user', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/competition', competitionRoutes);
app.use('/api/score', scoreRoutes)

//404 Error route as a catch-all
app.use((req, res, next)=>{
    res.status(404).send("Error 404 - Resource not found");
});

//Set default port to serve app on
const port = process.env.PORT || 3000;

// Sincronizar la base de datos y luego iniciar el servidor
db.sequelize.sync()
.then(() => {
    console.log('Database synced!');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
.catch(err => {
    console.error('Unable to sync the database:', err);
});
require('dotenv').config()
const express = require('express');
const app = require('./src/app');

const sequelize = require('./src/config/database');
const PORT = process.env.PORT || 3000

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });

        console.log("mysql connected");

        // seeder database
        if (process.env.SEED_DB === 'true') {
            
        }

        app.listen(PORT, () => {
            console.log(`app running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("unable to connect database", error);
        process.exit(1);
    }
};

startServer();


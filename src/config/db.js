const mysql = require("mysql2/promise");

require("dotenv").config();


const connectDB = async () => {

    try {

        const connection =
            await mysql.createConnection({

                host: process.env.DB_HOST,

                user: process.env.DB_USER,

                password: process.env.DB_PASSWORD,

                database: process.env.DB_NAME,

                port: process.env.DB_PORT || 3306

            });


        console.log(
            "MySQL connected successfully!"
        );


        return connection;

    } catch (error) {

        console.error(
            "MySQL connection failed:",
            error.message
        );

        throw error;

    }

};


module.exports = connectDB;
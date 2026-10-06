const connectDB = require("../config/db");


// =========================
// GET ALL USERS
// =========================

const getUser = async (req, res) => {

    console.log("getUser controller called");

    try {

        const connection = await connectDB();

        const [users] = await connection.execute(
            "SELECT * FROM users"
        );

        await connection.end();

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {

        console.error(
            "Get users error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};


// post user
const postUser = async (req, res) => {

    console.log("postUser is received");

    try {

        const { name, email } = req.body;

        console.log("Name:", name);
        console.log("Email:", email);


        if (!name || !email) {

            return res.status(400).json({

                success: false,
                message: "Name and email are required"

            });

        }


        const connection = await connectDB();


        const [result] = await connection.execute(

            "INSERT INTO users (name, email) VALUES (?, ?)",

            [name, email]

        );


        await connection.end();


        res.status(201).json({

            success: true,

            message: "User created successfully",

            data: {

                id: result.insertId,

                name: name,

                email: email

            }

        });


    } catch (error) {

        console.error(
            "Create user error:",
            error.message
        );


        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({

                success: false,

                message: "Email already exists"

            });

        }


        res.status(500).json({

            success: false,

            message: "Failed to create user"

        });

    }

};

module.exports = {getUser, postUser};
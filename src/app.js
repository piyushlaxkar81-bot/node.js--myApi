const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");


const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());


// =========================
// HOME API
// =========================

app.get("/", (req, res) => {

    console.log("Home route called");

    res.json({

        success: true,

        message: "API working successfully"

    });

});


// =========================
// USER ROUTES
// =========================

app.use("/api/users", userRoutes);


module.exports = app;
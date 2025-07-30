require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes=require("./routes/userRoutes")
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser())

app.use(express.json());
app.use(cors({origin:"https://crud-green-nine.vercel.app",
    credentials:true,
}));

app.use("/", userRoutes); // ✅ Use a prefix to avoid conflicts


const Port = process.env.PORT
// Start Server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

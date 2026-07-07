import express from "express"; //third party
import dotenv from "dotenv"; //third party
import cors from "cors"; //third party
import connectDB from "./config/connectDB.js";
import router from "./routes/authRoutes.js";
import songRouter from "./routes/songRoutes.js";

dotenv.config();
const PORT=process.env.PORT || 5001;

const app=express();
app.use(express.json());


//connect your database
connectDB();

app.use(
       cors({
           origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
           credentials: true,
       })
   );


//logics are written here
//app.get("/api", (req,res) => {
  //  res.status(200).json({ message:"Server is working" });
//}); 

app.use("/api/songs",songRouter);
app.use("/api/auth", router);

app.listen(PORT,() => console.log(`Server is running on Port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a tu cluster
mongoose.connect("mongodb+srv://zcamus_db_user:3U4GCrqDSdwoLvSu@cocinarte.nqf7aic.mongodb.net/FoodShare");

app.get("/", (req, res) => res.send("API de CocinArte funcionando ✅"));

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));

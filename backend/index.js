require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const flashcardRoutes = require('./routes/flashcardRoutes');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://samarthdb:samarth123@samarthdb.gp7idaw.mongodb.net/AlfredTech",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("MongoDB connected"))
 .catch(err=>console.log(err));

 app.use('/api/users',userRoutes);
 app.use('/api/flashcards',flashcardRoutes);

 const PORT = process.env.PORT || 5001;
 app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
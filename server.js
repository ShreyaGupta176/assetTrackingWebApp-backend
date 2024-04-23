const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
 
const usermodel = require('./model.js');
 
const app = express();
 
var cors= require('cors')

app.get("/user")
 
const PORT = 4000;
 
const connectionURL = "mongodb+srv://shreya1912:Divycre%40ted@cluster0.rnggoce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
 
 
 
app.listen(PORT,()=>{
    console.log(`App is running on port :` + PORT);
})
app.use(bodyParser.urlencoded({ extended: true }));
 
// Parses the text as json
app.use(bodyParser.json());

app.use(cors())
// try {
//     const newUser = new usermodel();
//     newUser.username = "Shreya";
//     newUser.password = "khikhi2";
//     newUser.save();
//     console.log("user saved");
// } catch (error) {
//     console.log("error ");
// }
   
app.post("/check-user", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await usermodel.findOne({ username: username, password: password });
        if (user) {
            console.log("user found");
            res.status(200).send("User exists");
        } else {
            console.log("user not found");
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send("An error occurred");
    }
});
 
 
try {
    mongoose.connect(connectionURL)
    console.log("connected to db successfully");
} catch (error) {
    console.log("error connecting to the database");
}
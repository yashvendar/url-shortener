import express from "express";
import configApp from "./config/app.config";
import connectDB from "./config/mongoose.config";
import routes from "./routes";


const app = express();

configApp(app);

connectDB().then(()=>{
    console.log("Connected to database");

    app.use(routes);

    app.listen(process.env.PORT, () => {
        console.log("Server listening on port: ", process.env.PORT);
    })
})


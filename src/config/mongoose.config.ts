import mongoose from "mongoose";

export default function connectDB() {
    const [username, password, host, port, dbname] = [
        process.env.MONGO_USER,
        process.env.MONGO_PASS,
        process.env.MONGO_HOST,
        process.env.MONGO_PORT,
        process.env.MONGO_DATABASE,
    ];
    
    const connectStr = `mongodb://${username}:${password}@${host}:${port}/${dbname}`;
    
    return mongoose.connect(connectStr).catch((err)=>{
        console.error("Database connection error: ", err.message);
        process.exit(1);
    });
}

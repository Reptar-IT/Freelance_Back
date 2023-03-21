// jshint esversion:6
import { ServerApiVersion, ConnectOptions } from 'mongodb';
import mongoose from "mongoose"; 

let uri = process.env.MONGODB_URI != null ? process.env.MONGODB_URI : "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + process.env.DATABASE_URL + process.env.DB_APP_NAME + "?retryWrites=true&w=majority";

// Connect to mongodb AWS cloud server via mongoose
const mongodbClient = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }  as ConnectOptions ).then(() => console.log("Connection Successful"))
    .catch((err: any) => console.log("Mongoose connection failed: " + err
));

export default mongodbClient;
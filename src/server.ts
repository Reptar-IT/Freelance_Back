import createApp from "./utils/createApp";
import { DATABASE_URL, NODE_ENV, PORT } from "./utils/loadEnv";
import mongodbClient from "../mongodb/dbConnect"
import {general, job, bid, milestone } from "./modules";

mongodbClient;

const app = createApp(DATABASE_URL, NODE_ENV, PORT, [general, job, bid, milestone]);

app.listen();
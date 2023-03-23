import createApp from "./utils/createApp";
import { DATABASE_URL, NODE_ENV, PORT } from "./utils/loadEnv";
import mongodbClient from "../mongodb/dbConnect"
import general from "./modules/general";
import job from "./modules/jobs"
import bid from "./modules/bids"

mongodbClient;

const app = createApp(DATABASE_URL, NODE_ENV, PORT, [general, job, bid]);

app.listen();
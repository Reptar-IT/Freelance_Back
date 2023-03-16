import createApp from "./utils/ceateApp";
import { DATABASE_URL, NODE_ENV, PORT } from "./utils/loadEnv";
import general from "./modules/general";

const app = createApp(DATABASE_URL, NODE_ENV, PORT, [general]);

app.listen();
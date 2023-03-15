import createApp from "./utils/ceateApp";
import { DATABASE_URL, NODE_ENV, PORT } from "./utils/loadEnv";

// add modules in array [module, module, etc]
const app = createApp(DATABASE_URL, NODE_ENV, PORT, []);

app.listen();
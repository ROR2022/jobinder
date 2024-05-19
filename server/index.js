import { app } from "./app.js";
import { PORT, USER_MAILER, PASS_MAILER } from "./config.js";
import { connectDB } from "./db/db.js";
//import { setCorsBucket } from "./lib/awsLib.js";


connectDB();

app.listen(PORT);

console.log("Server is running on port:", PORT);
//console.log("User Mailer:", USER_MAILER);
//console.log("Pass Mailer:", PASS_MAILER);


//await setCorsBucket();



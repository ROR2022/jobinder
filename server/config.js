
import dotenv from "dotenv";


dotenv.config();

export const MONGODB_URI = process.env.URI_MONGODB;
export const PORT = process.env.PORT;
export const USER_MAILER = process.env.USER_MAILER;
export const PASS_MAILER = process.env.PASS_MAILER;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRESIN = process.env.JWT_EXPIRESIN;
export const AWS_BUCKETNAME = process.env.AWS_BUCKETNAME;
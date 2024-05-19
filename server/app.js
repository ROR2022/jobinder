import express from "express";
import { routes } from "./routes/index.js";
import cors from 'cors';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';
import fileUpload from "express-fileupload";
import { errorHandler } from "./error/errorHandler.js";


export const app = express();
export const __dirname = dirname(fileURLToPath(import.meta.url));



app.use(cors());
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload',
    limits: {
      fileSize: 2000000 //1mb
  },
  abortOnLimit: false
  }))
  


routes();
app.use(errorHandler);




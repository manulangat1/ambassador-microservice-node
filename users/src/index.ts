import express, { Application } from 'express';
import cors from 'cors'
import helmet  from 'helmet';
import dotenv from 'dotenv'
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import "reflect-metadata";

dotenv.config()

import modules from './modules'


createConnection().then(db => {
    const PORT = process.env.PORT
    const app:Application = express();

    app.use(cookieParser())
    app.use(cors())
    app.use(express.json())

    app.use(helmet())

    modules(app)

    app.get('/', (req,res) => res.status(200).json({"I am the":"API"}))



    app.get('**' , (req,res) => res.status(404).json({"Not Found":"Not Found"}))
    app.listen(PORT, () => {
        console.log(`Application successfully connected in ${process.env.NODE_ENV} mode at ${PORT}`)
    })
}).catch((error) => console.log(`Whoops refused to connect due to a db issue ${error.message}`))
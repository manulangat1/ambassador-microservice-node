import { EachMessagePayload, Kafka } from 'kafkajs'
// import { createTransport } from 'nodemailer';
import dotenv from 'dotenv'


dotenv.config()

export const kafka = new Kafka({
    clientId:'admin-consumer',
    brokers:[`${process.env.KAFKA_BROKERS}`],
    ssl:true,
    sasl:{
        mechanism: 'plain',
        username:`${process.env.CC_USERNAME}`,
        password:`${process.env.CC_PASSWORD}`
    }
})



export const producer = kafka.producer()
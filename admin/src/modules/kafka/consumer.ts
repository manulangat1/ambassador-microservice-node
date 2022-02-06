import { kafka } from "./config";
import { EachMessagePayload } from 'kafkajs'
import dotenv from 'dotenv'


dotenv.config()

const consumer = kafka.consumer({
    groupId:'admin-consumer'
});

const run =  async () => {
    await consumer.connect()
    await consumer.subscribe(({topic:'ambassador-topic'}))

    await consumer.run({
        eachMessage:async (message:EachMessagePayload) => {
            console.log(message)
        }
    })
}

run().then(console.error)
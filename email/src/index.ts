import { EachMessagePayload, Kafka } from 'kafkajs'
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv'


dotenv.config()

const kafka = new Kafka({
    clientId:'email-consumer',
    brokers:[`${process.env.CC_BROKERS}`],
    ssl:true,
    sasl:{
        mechanism: 'plain',
        username:`${process.env.USERNAME}`,
        password:`${process.env.CC_PASSWORD}`
    }
})

const consumer = kafka.consumer({
    groupId:'email-consumer'
});

const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    // auth: {
    //     user: process.env.MAIL_USERNAME,
    //     pass: process.env.MAIL_PASSWORD
    // }
});


const run = async () => {

    await consumer.connect()

    await consumer.subscribe({topic:'default'})

    await consumer.run({
        eachMessage: async (message:EachMessagePayload) => {
            console.log(message)
            // await transporter.sendMail({
            //     from: 'emmanuel@kipchirchirlangat.com',
            //     to: 'emmanuelthedeveloper@gmail.com',
            //     subject: 'An order has been completed',
            //     html: `Hi`
            // });
        }
    })

}
run().then(console.error)
// const transporter = createTransport({
//     host: 'host.docker.internal',
//     port: 1025
// });

// await transporter.sendMail({
//     from: 'from@example.com',
//     to: 'admin@admin.com',
//     subject: 'An order has been completed',
//     html: `Order #${order.id} with a total of $${order.total} has been completed`
// });

// await transporter.sendMail({
//     from: 'from@example.com',
//     to: order.ambassador_email,
//     subject: 'An order has been completed',
//     html: `You earned $${order.ambassador_revenue} from the link #${order.code}`
// });

// await transporter.close();
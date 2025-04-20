/**
 * RabbitMQ Producer
 * This script creates a connection to RabbitMQ and sends 5 messages to a durable queue.
 * Each message is made persistent to ensure it's not lost even if RabbitMQ restarts.
 * The producer creates a 'task_queue' and sends numbered tasks as messages.
 */
const amqp = require("amqplib")

async function sendMessages() {
    try{
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        const queue = "task_queue"
        await channel.assertQueue(queue,{durable:true})

        for(let i = 1; i <= 5 ; i++){
            const message = `Task ${i}`
            channel.sendToQueue(queue, Buffer.from(message), {persistent:true})
            console.log("sent : ", message)
        }
        setTimeout(()=>{connection.close()
            process.exit(0)
        },500)
    }catch(e){
        console.log(e)
    }
}
sendMessages()
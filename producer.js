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
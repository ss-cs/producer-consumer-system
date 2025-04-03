const amqp = require("amqplib")

async function receiveMessages() {
    try{
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        const queue = "task_queue"
        await channel.assertQueue(queue,{durable:true})

        console.log("waiting for messsage...")

        channel.consume(queue,(msg)=>{
            if(msg){
                const message = msg.content.toString()
                console.log("Received : ", message)
                setTimeout(()=>{
                    console.log("Task completed")
                    channel.ack(msg)
                }, 2000)
            }
        }, {noAck : false})
    }
    catch(e){
        console.log(e)
    }
}
receiveMessages()
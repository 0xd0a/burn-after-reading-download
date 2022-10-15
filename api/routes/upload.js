import { genHexId } from "../utils/genId"

export default async function uploadRoute(fastify, options) {
    const collection = fastify.mongo.db.collection('downloads')

    fastify.post('/upload', async (request, reply) => {
        let buffer
        let data
        try {
            data = await request.file()
            //const data=await iterator.next()
            
            buffer=await data.toBuffer()
            // for await (const part of iterator) {
            //     buffer = await data.toBuffer() // this only supports small files
            // }
        } catch (error) {
            console.log(error)
            reply.send({error:true, message: error.toString()})
            return
        }
        const id=genHexId(32)
        const insertResult=await collection.insertOne( {
            _id: id,
            id: id,
            status:0,
            type: "burnafterread", 
            filename: data.filename,
            text: buffer
        } ) 
        if(!insertResult.acknowledged) {
            reply.send({error:true, message: "File is too large"})
            throw new Error("Can't insert file into DB")
        }
        reply.send({error:false, id:insertResult.insertedId})
        
    })
}

import { genHexId } from "../utils/genId"

export default async function uploadRoute(fastify, options) {
    const collection = fastify.mongo.client.db('downloads').collection('downloads')

    fastify.post('/upload', async (request, reply) => {
        let buffer
        let data
        try {
            data = await request.file()
            
            buffer=await data.toBuffer()
        } catch (error) {
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
            iv: data.fields.iv.value || '',
            text: buffer
        } ) 
        if(!insertResult.acknowledged) {
            reply.send({error:true, message: "File is too large"})
            throw new Error("Can't insert file into DB")
        }
        reply.send({error:false, id:insertResult.insertedId})
        
    })
    fastify.get('/get_info/:id', async (request, reply)=> {
        let found 
        try{
            found=await collection.findOne({id: request.params.id})
        } catch (e) {
            return
        }

        reply.send({iv:found?.iv,filename:found?.filename})
    })
}

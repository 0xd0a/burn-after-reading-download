import Fastify from 'fastify'
import dbConnector from './db-connector'
import downloadRoute from './routes/download'
import uploadRoute from './routes/upload'
import 'dotenv/config'
// import fileUpload from 'fastify-file-upload'
import fileUpload from '@fastify/multipart'
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})


fastify.register(cors, {})

// Register an upload and limit it
 fastify.register(fileUpload, {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100,     // Max field value size in bytes
    fields: 10,         // Max number of non-file fields
    fileSize: 10000000,  // For multipart forms, the max file size in bytes
    files: 1,           // Max number of file fields
    headerPairs: 2000   // Max number of header key=>value pairs
  }
}
)

fastify.register(dbConnector)
fastify.register(uploadRoute)
fastify.register(downloadRoute)

// Run the server!
fastify.listen({ port: process.env.PORT || 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
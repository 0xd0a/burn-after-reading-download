// ESM
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'
import config from '../config'
import { MongoClient } from 'mongodb'

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector(fastify, options) {
  //const mdb=require('mongodb')
  // console.log("URI is: ",mdb)
  console.log("URI is: ", config.MONGOSERVER)

  // const client = new MongoClient(config.MONGOSERVER)
  // await client.connect().catch((err) => { throw err })
  //console.log(client)

  fastify.register(fastifyMongo, { url: config.MONGOSERVER })
    .register(async function (fastify, opts, next) {
      const db = fastify.mongo.client.db('downloads')
      //db = new fastify.mongo.client.getDB("downloads");
      try{
        await db.createCollection('downloads', { capped: false });
      }catch(e) {
        console.log("Error creating collection ",e)
      }
      console.log("Created collection downloads in the db")

      next()
    })

  // fastify.register(fastifyMongo, {
  //   url: config.MONGOSERVER
  // })
}

module.exports = fastifyPlugin(dbConnector)
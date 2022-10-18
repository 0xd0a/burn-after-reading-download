// ESM
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'
import config from './config'
/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector (fastify, options) {
  console.log("MONGO SERVER URL ",config.MONGOSERVER)
  fastify.register(fastifyMongo, {
    url: config.MONGOSERVER
  })
}

module.exports = fastifyPlugin(dbConnector)
// ESM
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector (fastify, options) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://root:rootpassword@localhost:27017/downloads'
  })
}

module.exports = fastifyPlugin(dbConnector)
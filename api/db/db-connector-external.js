import AWS from 'aws-sdk';

import fp from 'fastify-plugin';

function initDB() {
  AWS.config
    .update
    //     {
    //     accessKeyId: process.env.accessKeyId,
    //     secretAccessKey: process.env.secretAccessKey,
    //     region: process.env.region,
    //     endpoint: process.env.endpoint,
    // }
    ();
  AWS.config.update({ region: 'us-west-2' });

  return new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
}

export function fastifyExternalDB(fastify, options, done) {
  const connection = initDB(options);

  if (!fastify.externalDB) {
    fastify.decorate('externalDB', connection);
  }

  fastify.addHook('onClose', (fastify, done) => connection.end().then(done).catch(done));

  done();
}

export default fp(fastifyExternalDB, { name: 'fastify-external-db' });

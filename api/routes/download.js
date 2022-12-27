import { Readable } from 'stream';

export default async function routes(fastify) {
  const collection = fastify.mongo.client.db('downloads').collection('downloads');

  fastify.get('/downloads/:id', async (request, reply) => {
    const result = await collection.findOne({ id: request.params.id, status: 0, type: 'burnafterread' });
    if (!result) {
      throw new Error('File not found');
    }
    const s = new Readable();
    s.push(result.text.buffer);
    s.push(null);

    const resultDelete = process.env.KEEP_FILES
      ? await collection.updateOne({ id: request.params.id }, { $set: { status: 1 } })
      : await collection.deleteOne({ id: request.params.id });

    if (!resultDelete) {
      throw new Error('Couldn\'t delete the file, wow wow wow!');
    }

    return reply.header(
      'Content-Disposition',
      `attachment; filename=${result.filename ?? 'filename.bin'}`,
    )
      .send(s);
  });
}

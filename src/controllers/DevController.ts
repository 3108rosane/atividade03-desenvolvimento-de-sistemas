import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DevService } from "..DevService/DevService";
export async function DevController(app: FastifyInstance) {
  app.post(
    "/Dev",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = request.body as { url: string, shortId: string | null }
        const identifier = await DevService.register(body);
        return identifier;
    } catch (error: any) {
        return reply.status(404).send({ error: "Not Found" })
    }
})

  app.get(
    "/Dev",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const query = request.query as { identifier: string }
        const url = await DevService.findByIdentifier(query.identifier);
        return url;
    } catch (error: any) {
        return reply.status(404).send({ error: "Not Found" })
    }
})
  

  app.get(
    "/Dev/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
     
        try {
            const DevId = await DevService.getAll();
            return reply.code(200).send();
        } catch (error: any) {
            return reply.code(500).send({ erro: error.message });
        }
    });

    app.delete("/Dev/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const { id } = request.params;

        try {
            await DevService.delete((id));
            return reply.code(204).send();
        } catch (error: any) {
            return reply.code(404).send({ erro: error.message });
        }
    });
    }
  

  




  
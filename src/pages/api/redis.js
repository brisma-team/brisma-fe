import redisConnect from "@/helpers/redisConnect";

export default async function handler(req, res) {
  try {
    const { method, query } = req;
    if (method === "GET") {
      const { key } = query;
      const redis = await redisConnect.get(key);
      res.status(201).send({ data: JSON.parse(redis) });
    } else if (method === "POST") {
      const { key, value } = req.body;
      const createKey = await redisConnect.set(key, value);
      res.status(201).send({ data: createKey });
    } else if (method === "DELETE") {
      const { key } = query;
      const redis = await redisConnect.del(key);
      res.status(201).send({ data: redis });
    }
  } catch (err) {
    res.status(500).send({ error: "failed to fetch data" });
  }
}

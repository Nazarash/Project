const path = require("node:path");
const qs = require("node:querystring");
const querystring = require("querystring");

const port = 5000;

const fastify = require("fastify")({
  logger: true,
  querystringParser: (str) => querystring.parse(str.toLowerCase()),
});

fastify.register(require("@fastify/autoload"), {
  dir: path.join(__dirname + "/routes"),
});
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "/static"),
  prefix: "/static",
});

fastify.register(require("@fastify/cors"));

fastify.register(require("@fastify/view"), {
  engine: {
    ejs: require("ejs"),
  },
});

const start = async () => {
  await fastify.listen({ port: port });
};

start().then((err) => {
  console.log(err);
});

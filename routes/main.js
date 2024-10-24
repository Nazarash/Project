const urls = require("../keys");
const indexOpts = {
  handler: (req, reply) => {
    reply.view("/templates/index.ejs");
  },
};
const findOptsGet = {
  handler: (req, reply) => {
    let { nameComponent } = req.params;
    reply.send(urls[nameComponent]);
  },
};

module.exports = function (fastify, opts, next) {
  fastify.get("/", indexOpts);
  fastify.get("/html/:nameComponent", findOptsGet);
  next();
};

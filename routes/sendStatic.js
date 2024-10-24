const path = require("node:path");
const fs = require("node:fs");
const sendData = {
  handler: (req, reply) => {
    const { nameComponent } = req.params;
    const stream = fs.createReadStream(
      path.join(__dirname + "/../html" + `/${nameComponent}`)
    );
    reply.type("text/html").send(stream);
  },
};

module.exports = function (fastify, opts, next) {
  fastify.get("/api/html/:nameComponent", sendData);
  next();
};

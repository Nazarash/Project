const server = require("../server");
const fs = require("node:fs");
const path = require("node:path");
const axios = require("axios");

const bufferOptsGet = {
  handler: async (req, reply) => {
    const { link } = req.query;
    let splittedData = link.split(".");
    if (splittedData[1]) {
      if (splittedData[1] === "html" || splittedData[1] === "css") {
        const bufferInfo = fs.readFileSync(
          path.join(__dirname, "../", `html/`, link),
          { encoding: "utf-8" }
        );
        const responseData = JSON.stringify({ data: bufferInfo });
        reply
          .code(200)
          .header("Content-Type", "text/html; charset=utf-8;")
          .send(bufferInfo.replaceAll(/(\r\n|\n|\r|\t)/gm, ""));
      } else if (splittedData[1] === "js") {
        const bufferInfo = fs.readFileSync(
          path.join(__dirname, "../", `html/`, link),
          { encoding: "utf-8" }
        );
        console.log(bufferInfo);
        reply
          .code(200)
          .header("Content-Type", "text/plain; charset=uft-8;")
          .send(bufferInfo);
      } else if (splittedData[1] === "png") {
        const bufferInfo = fs.readFileSync(
          path.join(__dirname, "../", `html/`, link),
          { encoding: "base64" }
        );
        reply
          .code(200)
          .header("Content-Type", "text/html; charset=utf-8;")
          .send(bufferInfo);
      }
    }
  },
};

module.exports = function (fastify, opts, next) {
  fastify.get("/buffer", bufferOptsGet);
  next();
};

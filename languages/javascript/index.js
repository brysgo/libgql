const fs = require("fs");
const { buildSchema, graphql, print, introspectionQuery } = require("graphql");
const { exec } = require("child_process");
const stream = require("stream");

module.exports = {
  createGll: function(schema) {
    process.stdin.setEncoding("utf8");

    process.stdin.on("readable", function() {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        let input;
        try {
          input = JSON.parse(chunk);
        } catch (e) {
          e.message = "Data not valid JSON\n\n" + e.message;

          throw new Error(e);
        }
        graphql(schema, input.query).then(console.log);
      }
    });

    process.stdin.on("end", function() {
      process.stdout.write("end");
    });
  },
  loadGll: function(path) {
    const processStream = new stream.Writable();
    let resolve;
    let nextResult;
    let advancePromise = function() {
      return new Promise(function(r) {
        resolve = r;
      });
    };
    nextResult = advancePromise();
    processStream._write = function(data) {
      let preAdvancedResolve = resolve;
      nextResult = advancePromise();
      preAdvancedResolve(data.toString());
    };
    const moduleProcess = exec(path);
    moduleProcess.stdout.pipe(processStream);

    const runQuery = function(query, variables) {
      const result = nextResult;
      moduleProcess.stdin.write(JSON.stringify({ query, variables }));
      return result;
    };
    runQuery.close = function() {
      moduleProcess.stdin.write("\x03");
    };
    return runQuery;
  }
};

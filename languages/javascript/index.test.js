const { loadModule } = require("./");


let exampleGql;
beforeAll(() => {
  exampleGql = loadModule("./examples/simple-example");
});
afterAll(() => {
  exampleGql.close();
});

test("a simple graphql query", async () => {

  expect(await exampleGql(`
    query TestQuery {
      currentUser {
        name
      }
    }
  `)).toMatchSnapshot();

})

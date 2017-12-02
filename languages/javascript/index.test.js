const { loadGll } = require("./");


let exampleGll;
beforeAll(() => {
  exampleGll = loadGll("./examples/simple-example");
});

test("a simple graphql query", async () => {

  expect(await exampleGll(`
    query TestQuery {
      currentUser {
        name
      }
    }
  `)).toMatchSnapshot();

})

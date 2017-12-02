const { loadGll } = require("./");


let exampleGll;
beforeAll(() => {
  exampleGll = loadGll("./examples/simple-example");
});

test("a simple graphql query", () => {

  expect(await exampleGll(`
    query TestQuery {
      currentUser {
      }
    }
  `)).toMatchSnapshot();

})

# libgql - GraphQL Linked Libraries

## The Problem

How can I build libraries and modules that operate accross programming
languages and environments?

## The Solution

To solve this problem with web services, we build APIs that we can use between
languages. Unfortunately, these APIs require us to make HTTP requests.

...or do they?

Enter GraphQL: Protocal Agnostic, that means, we can implement it over a CLI
interface and have an incredibly handy way to build cross language bindings
without all the fuss.

## What does it do?

libgql will define a protocal for doing graphql over CLI and implement as many
language bindings as we possibly can.

## Usage

I would recommend looking at the tests for usage, since it varies from language
to language. To consume a module that uses libgql, install the bindings for your
language:

| javascript | `yarn add libgql`       |
|------------|-------------------------|
| python     | `pipenv install libgql` |

Then import the bindings and load the module:


### javascript
```javascript
import { loadModule } from "libgql"

const myModule = loadModule("./path/to/libgql/module/executable");

result = await myModule(graphqlQueryStringHere, optionalVariables);
```

### python

```python
from "libgql" import load_module

myModule = load_module("./path/to/libgql/module/executable")

result = myModule(graphqlQueryStringHere, optionalVariables)
```

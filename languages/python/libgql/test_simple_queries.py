import unittest
import sys
sys.path.append("../")
from libgql import create_module, load_module

exampleGql = load_module('./examples/simple-example')


def test_simple_queries(snapshot):
    result = exampleGql('''
        query TestQuery {
          currentUser {
            name
          }
        }
      ''')

    snapshot.assert_match(result)

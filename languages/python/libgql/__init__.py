import json
import sys
import six
from subprocess import Popen, PIPE, STDOUT

# FIXME: vvv really wish I could avoid this

def default_format_error(error):
    return {'message': six.text_type(error)}

def format_execution_result(execution_result):
    if execution_result:
        response = {}

        if execution_result.errors:
            response['errors'] = [
                default_format_error(e) for e in execution_result.errors
            ]

        if not execution_result.invalid:
            response['data'] = execution_result.data

        return response

# FIXME: ^^^ really wish I could avoid this


def create_module(schema):
    for x in sys.stdin.readlines():
        input = json.loads(x)
        result = schema.execute(input["query"])
        print(json.dumps(format_execution_result(result)))


def load_module(path):
    p = Popen([path], stdout=PIPE, stdin=PIPE, stderr=PIPE, encoding="utf8")

    def runQuery(query, variables=None):
        input = json.dumps({"query": query, "variables": variables})
        return p.communicate(input=input)[0]

    return runQuery

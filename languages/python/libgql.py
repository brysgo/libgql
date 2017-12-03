import json
from subprocess import Popen, PIPE, STDOUT


def load_module(path):
    p = Popen([path], stdout=PIPE, stdin=PIPE, stderr=PIPE, encoding="utf8")

    def runQuery(query, variables=None):
        print(query)
        input = json.dumps({"query": query, "variables": variables})
        print(input)
        return p.communicate(input=input)[0]

    return runQuery


def create_module():
    print("foo")

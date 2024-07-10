
const get1 = {url: "https://jsonplaceholder.typicode.com/posts/101"};
const get2 = {
    url: "https://jsonplaceholder.typicode.com/todos/1",
    method: "GET"
};
const getWithHeaders = {
    url: "https://jsonplaceholder.typicode.com/todos/1",
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
};
const getEscapeHeaders = {
    url: "https://jsonplaceholder.typicode.com/todos/1",
    method: "GET",
    headers: {
        "key": `a "strange" value`
    }
};
const post1 = {
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "post",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: {
        "id": "123-456-789",
        "key1": "value 1",
        "key2": `a "complex" value`
    }
};
const put1 = {
    url: "https://jsonplaceholder.typicode.com/posts/1",
    method: 'PUT',
    body: {
        id: 1,
        title: 'foo',
        body: 'barzzz',
        userId: 1
    },
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
};
const patch1 = {
    url: "https://jsonplaceholder.typicode.com/posts/1",
    method: 'PATCH',
    body: {
        title: 'foo patched',
    },
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}
const del1 = {
    url: "https://jsonplaceholder.typicode.com/posts/1",
    method: 'DELETE'
}

const opt1 = {
    url: "https://jsonplaceholder.typicode.com/posts/1",
    options: {
        silent: true,
        showError: true
    }
}
const opt2 = {
    url: "https://jsonplaceholder.typicode.com/posts/1",
    options: {
        output: "test.txt",
        silent: true
    }
}
const rawBody1 = {
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
        "Content-Type": "text/plain"
    },
    body: "string data"
}
const rawBody2 = {
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
        "Content-Type": "text/plain"
    },
    body: {
        type: "raw",
        content: "string data"
    }
}
const fileBody = {
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: {
        type: "file",
        fileName: "data.json"
    }
}
const queries1 = {
    url: "https://example.com/posts?",
    method: "GET",
    queries: {
        key: "val",
        key2: ["val1", "val2"]
    }
}

const queries2 = {
    url: "https://example.com/posts?a=b",
    method: "GET",
    queries: {
        key: "val",
        key2: ["val1", "val2"]
    }
}


const params = {
    get1, get2, getWithHeaders, getEscapeHeaders,
    post1,
    put1,
    patch1,
    del1,
    opt1,
    opt2,
    rawBody1,
    rawBody2,
    fileBody,
    queries1,
    queries2
}
const results = {
    get1: `curl https://jsonplaceholder.typicode.com/posts/101 \\`,
    get2: `curl https://jsonplaceholder.typicode.com/todos/1 \\\n -X GET`,
    getWithHeaders: `${'curl https://jsonplaceholder.typicode.com/todos/1 \\\n' + ' -X GET \\\n' + ' -H "Content-Type: application/json"'}`,
    getEscapeHeaders: `${'curl https://jsonplaceholder.typicode.com/todos/1 \\\n' + ' -X GET \\\n' + ' -H "key: a \\"strange\\" value"'}`,
    post1: `${'curl https://jsonplaceholder.typicode.com/posts \\\n' + ' -X POST \\\n' + ' -H "Content-type: application/json; charset=UTF-8" \\\n' + ' -d "{\\"id\\":\\"123-456-789\\",\\"key1\\":\\"value 1\\",\\"key2\\":\\"a \\\\\\"complex\\\\\\" value\\"}"'}`,
    put1: `${'curl https://jsonplaceholder.typicode.com/posts/1 \\\n' +' -X PUT \\\n' + ' -H "Content-type: application/json; charset=UTF-8" \\\n' + ' -d "{\\"id\\":1,\\"title\\":\\"foo\\",\\"body\\":\\"barzzz\\",\\"userId\\":1}"'}`,
    patch1: `${'curl https://jsonplaceholder.typicode.com/posts/1 \\\n' + ' -X PATCH \\\n' + ' -H "Content-type: application/json; charset=UTF-8" \\\n' + ' -d "{\\"title\\":\\"foo patched\\"}"'}`,
    del1: `curl https://jsonplaceholder.typicode.com/posts/1 \\\n -X DELETE`,
    opt1: `curl https://jsonplaceholder.typicode.com/posts/1 \\\n \\\n --silent --show-error`,
    opt2: `${'curl https://jsonplaceholder.typicode.com/posts/1 \\\n' + ' \\\n' + ' --output test.txt --silent'}`,
    rawBody1: `${'curl https://jsonplaceholder.typicode.com/posts \\\n' + ' -X POST \\\n' + ' -H "Content-Type: text/plain" \\\n' + ' -d "string data"'}`,
    rawBody2: `${'curl https://jsonplaceholder.typicode.com/posts \\\n' + ' -X POST \\\n' + ' -H "Content-Type: text/plain" \\\n' + ' -d "string data"'}`,
    fileBody: `${'curl https://jsonplaceholder.typicode.com/posts \\\n' + ' -X POST \\\n' + ' -H "Content-Type: application/json" \\\n' + ' --data-binary @data.json'}`,
    queries1: 'curl https://example.com/posts?key=val&key2=val1,val2 \\\n -X GET',
    queries2: 'curl https://example.com/posts?a=b&key=val&key2=val1,val2 \\\n -X GET',
}

module.exports = { params, results }
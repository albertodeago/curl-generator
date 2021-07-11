
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


const params = {
    get1, get2, getWithHeaders, getEscapeHeaders,
    post1,
    put1,
    patch1,
    del1,
    opt1,
    opt2
}
const results = {
    get1: `curl "https://jsonplaceholder.typicode.com/posts/101"`,
    get2: `curl "https://jsonplaceholder.typicode.com/todos/1" -X GET`,
    getWithHeaders: `curl "https://jsonplaceholder.typicode.com/todos/1" -X GET -H "Content-Type: application/json"`,
    getEscapeHeaders: `curl "https://jsonplaceholder.typicode.com/todos/1" -X GET -H "key: a \\\"strange\\\" value"`,
    post1: `curl "https://jsonplaceholder.typicode.com/posts" -X POST -H "Content-type: application/json; charset=UTF-8" -d "{\\\"id\\\":\\\"123-456-789\\\",\\\"key1\\\":\\\"value 1\\\",\\\"key2\\\":\\\"a \\\\\\"complex\\\\\\" value\\\"}"`,
    put1: `curl "https://jsonplaceholder.typicode.com/posts/1" -X PUT -H "Content-type: application/json; charset=UTF-8" -d "{\\\"id\\\":1,\\\"title\\\":\\\"foo\\\",\\\"body\\\":\\\"barzzz\\\",\\\"userId\\\":1}"`,
    patch1: `curl "https://jsonplaceholder.typicode.com/posts/1" -X PATCH -H "Content-type: application/json; charset=UTF-8" -d "{\\\"title\\\":\\\"foo patched\\\"}"`,
    del1: `curl "https://jsonplaceholder.typicode.com/posts/1" -X DELETE`,
    opt1: `curl "https://jsonplaceholder.typicode.com/posts/1" --silent --show-error`,
    opt2: `curl "https://jsonplaceholder.typicode.com/posts/1" --output test.txt --silent`
}

module.exports = { params, results }
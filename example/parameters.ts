export const get1 = { url: "https://jsonplaceholder.typicode.com/posts/101" };

export const get2 = {
  url: "https://jsonplaceholder.typicode.com/todos/1",
  method: "GET",
};

export const getWithHeaders = {
  url: "https://jsonplaceholder.typicode.com/todos/1",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getEscapeHeaders = {
  url: "https://jsonplaceholder.typicode.com/todos/1",
  method: "GET",
  headers: {
    key: `a "strange" value`,
  },
};

export const post1 = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "post",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
  body: {
    id: "123-456-789",
    key1: "value 1",
    key2: `a "complex" value`,
  },
};

export const put1 = {
  url: "https://jsonplaceholder.typicode.com/posts/1",
  method: "PUT",
  body: {
    id: 1,
    title: "foo",
    body: "barzzz",
    userId: 1,
  },
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

export const patch1 = {
  url: "https://jsonplaceholder.typicode.com/posts/1",
  method: "PATCH",
  body: {
    title: "foo patched",
  },
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

export const del1 = {
  url: "https://jsonplaceholder.typicode.com/posts/1",
  method: "DELETE",
};

export const opt1 = {
  url: "https://jsonplaceholder.typicode.com/posts/1",
  options: {
    silent: true,
    showError: true,
  },
};

export const opt2 = {
  url: "https://jsonplaceholder.typicode.com/posts/1",
  options: {
    output: "test.txt",
    silent: true,
  },
};

export const searchParamsBody = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
  },
  body: new URLSearchParams("key1=value 1"),
};

export const rawBody1 = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
  },
  body: "string data",
};

export const rawBody2 = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
  },
  body: {
    type: "raw",
    content: "string data",
  },
};

export const fileBody = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: {
    type: "file",
    fileName: "data.json",
  },
};

export const formBody1 = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: {
    type: "form",
    content: {
      name: "foo",
    },
  },
};

export const formBody2 = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  body: {
    type: "form",
    content: {
      file1: {
        type: "file",
        fileName: "data.json",
      },
    },
  },
};

export const formBody3 = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: {
    type: "form",
    content: {
      file1: {
        type: "raw",
        content: "string data",
      },
    },
  },
};

export const formBody4 = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: {
    type: "form",
    content: new URLSearchParams("key1=value 1"),
  },
};

export const jsonBody = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: {
    type: "json",
    content: {
      name: "foo",
    },
  },
};

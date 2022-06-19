# Node Crud API

## Install:

---

1. git clone https://github.com/ratomsky/node-crud-api.git
2. git checkout -b develop
3. npm install

# How Start Server:

---

1. Create **.env** file
2. Write **PORT** there, how in env.example

# API

## `GET` /api/users

#### request:

`null`

#### response:

success:

> **Code** : `200`

> **Content examples**: [ ]

## `GET` /api/users/:id

#### request:

`null`

### response:

- Success **Code** : `200`

### `POST` /api/users

#### request:

```json
{
  "username": "String",
  "age": 20,
  "hobbies": ["programming"]
}
```

#### response:

- Success **Code** : `200 OK`
  ```json
  {
    "username": "String",
    "age": 20,
    "hobbies": ["programming"]
  }
  ```

### `PUT` /api/users:id

#### request:

`null`

request:

```json
{
  "username": "String",
  "age": 20,
  "hobbies": ["programming"]
}
```

### `DELETE` /prson/:id

#### request:

`null`

Success Response
**Code** : `200 OK`

#### response:

One or two sentence description of what endpoint does.

`POST` /endpoint

Supported attributes:

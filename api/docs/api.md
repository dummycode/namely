GET /api
```
{
    "content": {
        "code": 200,
        "message": "API Index",
        "data": {
            "name": "Namely",
            "description": "Namely API",
            "version": "0.0.1"
        }
    }
}
```

POST /api/users
```
{
    "username": "henry",
    "password": "d0nt4get",
    "email": "henry@example.com"
}
```
```
{
    "content": {
        "code": 201,
        "message": "User created",
        "data": {
            "uuid": "8649cbbd-b620-4ffc-8275-a917427b762f",
            "username": "henry",
            "email": "henry@example.com",
            "createdAt": "2021-02-14T02:18:15.562Z"
        }
    }
}
```

POST /api/login
```
{
    "username": "henry",
    "password": "d0nt4get"
}
```
```
{
    "content": {
        "code": 200,
        "message": "Logged in",
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEzMTg1ODY0LCJleHAiOjE2MTU3Nzc4NjR9.VVuJdsBtEHC0eerdy-0S8TR7-XmNVsww8jRlwUUuX7I"
        }
    }
}
```

GET /api/whoami
User
```
{
    "content": {
        "code": 200,
        "message": "",
        "data": {
            "uuid": "8649cbbd-b620-4ffc-8275-a917427b762f",
            "username": "henry",
            "email": "henry@example.com",
            "createdAt": "2021-02-14T02:18:15.562Z"
        }
    }
}
```

GET api/users
Admin
```
{
    "content": {
        "code": 200,
        "message": "",
        "data": {
            "data": [
                {
                    "uuid": "8649cbbd-b620-4ffc-8275-a917427b762f",
                    "username": "henry",
                    "email": "henry@example.com",
                    "createdAt": "2021-02-14T02:18:15.562Z"
                }
            ]
        }
    }
}
```

GET api/users/:uuid
User|Admin
```
{
    "content": {
        "code": 201,
        "message": "",
        "data": {
            "data": {
                "uuid": "8649cbbd-b620-4ffc-8275-a917427b762f",
                "username": "henry",
                "email": "henry@example.com",
                "createdAt": "2021-02-14T02:18:15.562Z"
            }
        }
    }
}
```

DELETE /api/users/:uuid
User|Admin
```
{
    "content": {
        "code": 204,
        "message": "Successfully deleted user",
        "data": []
    }
}
```

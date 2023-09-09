# Demo Node Auth Flow (Rest API)

#### User Registration, Authentication and Authorization Flow Using JWT Tokens, Mongoose, Node Input Validator 

Sample Express/Mongoose REST API with JWT authentication/authorization.

### API Endpoints

- `[POST]` - `{{BASE_URI}}/auth/register`
  
##### Request
```
{
    "first_name": "John",
    "last_name": "Doe",
    "email_address": "john@email.com",
    "password": "Test1234!",
    "confirm_password": "Test1234"
}
```

##### Response
```
{
    "user": {
        "_id": "64fc6c30a69acaf73079674f",
        "fname": "John",
        "lname": "Doe",
        "email": "john@email.com",
        "created_at": "2023-09-09T12:59:28.915Z"
    },
    "access_token": [ACCESS_TOKEN],
    "refresh_token": [REFRESH_TOKEN]
}
```

- `[POST]` - `{{BASE_URI}}/auth/login`
  
##### Request
```
{
    "email_address": "john@email.com",
    "password": "Test1234!",
}
```

##### Response
```
{
    "user": {
        "_id": "64fc6c30a69acaf73079674f",
        "fname": "John",
        "lname": "Doe",
        "email": "john@email.com",
        "created_at": "2023-09-09T12:59:28.915Z"
    },
    "access_token": [ACCESS_TOKEN],
    "refresh_token": [REFRESH_TOKEN]
}
```
- `[POST]` - `{{BASE_URI}}/auth/refresh_token`
  
##### Request
```
{
    "refresh_token": [REFRESH_TOKEN],
}
```
##### Response
```
{
    "access_token": [ACCESS_TOKEN],
}
```
- `[GET]` - `{{BASE_URI}}/users [Protected]`
#####Request
```
{
	Authorization: 'Bearer " + [ACCESS_TOKEN]
}
```
#####Response
```
{
    "users": [       
        {
            "_id": "64fc6c30a69acaf73079674f",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@email.com",
            "created_at": "2023-09-09T12:59:28.915Z"
        }
    ]
}
```


### Project setup
```
npm install or yarn
```


### Run
```
node index.js
```

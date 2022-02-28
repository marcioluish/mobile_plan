# Web app that allows a signed up user to choose one of a company's mobile plans. 

### ATTENTION: To login into the application you must first create a user through a http request (see below).

# **Backend**
Build up on NodeJS + Express.

It has the following routes for objects creation:

## User
#### URL: `http://localhost:8000/user/signup`
1) POST

Register a new user. Body example:

```
@username: str
@password: str
@name: str
@planId: str ***OPTIONAL***
{
    "username": "test",
    "password": "test",
    "name": "John",    
    "planId": ""
}
```

***OBS***:

Password is encrypted and saved into the DB;

Expected result:

```
{
    "message": "User Created!",
    "user": {
        "id": "2c286c66-4e67-41aa-8896-9b055493a41a",
        "name": "John",
        "username": "test",
        "planId": ""
    }
}
```

#### URL: `http://localhost:8000/user/login`
2) POST

Authenticates a user. Body example:

```
@username: str
@password: str
{
    "username": "test",
    "password: "test"
}
```

#### URL: `http://localhost:8000/user/:userId`
3) POST

Updates a user plan. Body example:

```
@planId: str
{        
    "planId": "2418ca86-55b0-490d-beb3-5f9d58445289"
}
```

***Parameters***

```
@userId: str

Example:

URI: http://localhost:8000/user/2c286c66-4e67-41aa-8896-9b055493a41a
```

Expected result:

```
{
    "message": "User Plan Updated!",
    "user": {
        "id": "2c286c66-4e67-41aa-8896-9b055493a41a",
        "username": "test",
        "name": "John",
        "planId": "2418ca86-55b0-490d-beb3-5f9d58445289"
    }
}
```

## Plan

#### URL: `http://localhost:8000/plan`
1) POST

Register a plan. Body example:

```
@name: str
@price: str ***Must have a dot for decimal values***
@dataLimit: str ***Integer - not has decimals***
@callLimit: str ***Integer - not has decimals***
{
    "name": "Random Plan",
    "price": "5.00",
    "dataLimit": "4",
    "callLimit": "10"
}
```

Expected result:

```
{
    "message": "Plan Created!",
    "plan": {
        "id": "a619d7fe-bae0-4a41-b666-9503825765a8",
        "name": "Random Plan",
        "price": "5.00",
        "dataLimit": "4",
        "callLimit": "10"
    }
}
```

#### URL: `http://localhost:8000/plan/:planId`
2) GET

Gets a plan information. No body required.


***Parameters***

```
@planId: str

Example:

http://localhost:8000/plan/a619d7fe-bae0-4a41-b666-9503825765a8
```

Expected result:

```
{
    "message": "Plan Found!",
    "plan": {
        "id": "a619d7fe-bae0-4a41-b666-9503825765a8",
        "name": "Random Plan",
        "price": 5,
        "dataLimit": 4,
        "callLimit": 10
    }
}
```

#### URL: `http://localhost:8000/plan`
3) GET

List all plans. No body required.

Expected result:

```
{
    "message": "Plans retrieved!",
    "plans": {
        "plans": [
            {
                "_id": "621cb3394f013a891194c215",
                "id": "1e8cea65-7655-43b8-88d6-17a12b0a43b6",
                "name": "Estudante",
                "price": 30,
                "dataLimit": 8,
                "callLimit": 100
            },            
            {
                "_id": "621cb65c580318d7dec8176d",
                "name": "Random Plan",
                "price": 5,
                "dataLimit": 4,
                "callLimit": 10,
                "id": "a619d7fe-bae0-4a41-b666-9503825765a8",
                "__v": 0
            }
        ]
    }
}
```

#### URL: `http://localhost:8000/plan/delete-plan/:planId`
4) POST

Deletes a plan. No body required.

***Parameters***

```
@planId: str

Example:

http://localhost:8000/plan/delete-plan/a619d7fe-bae0-4a41-b666-9503825765a8
```

Expected result:

```
{
    "message": "Resource Deleted Successfully."
}
```


# **Frontend**
Build up on ReactJS.

It has just one page:

`http://localhost:3000`

Which shows user information about its active plan and a list of all registered plans within the company with a button for each one of them for activation.

# **MongoDB**
DB that register:
- Users
- Plans

***OBS***: It starts with four pre-populated plans: Estudante, Trabalhavo, Viagem e Família.

# Deploy

1 - Clone repository
```sh
$ git clone https://github.com/marcioluish/mobile_plan.git
```

2 - Docker up containers and you'll ready to go.
```sh
$ docker-compose up --build
```

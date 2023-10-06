# User
## EndPoint
### GET /users/investors
#### Response: _200 Ok_
- Body 
```json
[
    {
        "id": 1,
        "username": "John Doe",
        "email": "invest@mail.com",
        "phoneNumber": "07142421424"
    },
    {
        "id": 2,
        "username": "investor",
        "email": "investor@mail.com",
        "phoneNumber": "0879899283"
    }
]
```
### GET /users/investors/:id
- Request params
```json
{
    "id": <integer>
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 1,
    "username": "John Doe",
    "email": "invest@mail.com",
    "phoneNumber": "07142421424"
}
```
### POST /users/investors/register
- Request Body 
```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string"
}
```
#### BadRequest: _400 BadRequest_
```json
{
    "message": "Username is required"
}
(or)
{
    "message": "Email is required"
}
(or)
{
    "message": "Password is required"
}
(or)
{
    "message": "Phone number is required"
}
(or)
{
    "message": "Email format wrong"
}
(or)
{
    "message": "Email must be unique"
}
```
#### Response: _201 Created_
- Body
```json
{
    "id": 2,
    "username": "investor",
    "email": "investor@mail.com",
    "phoneNumber": "0879899283"
}
```
### POST /users/investors/login
- Request Body
```json
{
    "email": "string",
    "password": "string"
}
```
#### BadRequest _400 BadRequest_
```json
{
    "message": "Email/Password required"
}
```
#### Response _200 Ok_
```json
{
    "access_token": "string",
    "id": 2
}
```
### GET /users/farmers/:id
- Request params
```json
{
    "id": "<integer>"
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 1,
    "username": "string",
    "email": "string",
    "phoneNumber": "string",
    "address": "string"
}
```
### POST /users/farmers/register
- Request Body 
```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string"
}
```
#### Response: _201 Created_
- Body
```json
{
    "id": 4,
    "username": "farmer",
    "email": "farmer@mail.com",
    "phoneNumber": "087376282",
    "address": "test"
}
```
#### BadRequest: _400 BadRequest_
- Body
```json
{
    "message": "Username is required"
}
(or)
{
    "message": "Email is required"
}
(or)
{
    "message": "Password is required"
}
(or)
{
    "message": "Phone number is required"
}
(or)
{
    "message": "Email format wrong"
}
(or)
{
    "message": "Email must be unique"
}
```
### POST /users/farmers/login
- Request Body
```json
{
    "email": "string",
    "password": "string"
}
```
#### BadRequest _400 BadRequest_
```json
{
    "message": "Email/Password required"
}
```
#### Response _200 Ok_
```json
{
    "access_token": "string",
    "id": 2
}
```
### PATCH /users/farmers/:id
- Request params
```json
{
    "id": <integer>
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 1,
    "username": "Waryo",
    "email": "waryo@mail.com",
    "phoneNumber": "0813234344",
    "address": "string"
}
```

## Balance
### GET /balances/:balanceId
- Request params
```json
{
    "balanceId": <integer>
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 1,
    "userId": 1,
    "balance": 100000,
    "status": "success",
    "Investor": {
        "id": 1,
        "username": "John Doe",
        "email": "invest@mail.com",
        "phoneNumber": "07142421424"
    }
}
```
### POST /balances
- Request Body
```json
{
    "userId": <integer>,
    "balance": integer,
    "status": "string"
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 2,
    "userId": 2,
    "balance": 100,
    "status": "success"
}
```
### PUT /balances/status/:balanceId
- Request Body
```json
{
    "status": "success"
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 2,
    "userId": 2,
    "balance": 100,
    "status": "success"
}
```

#### BadRequest: _400 BadRequest_
- Body
```json
{
    "message": "status is required"
}
```
### DELETE /balances/balanceId
- Request params
```json
{
    "balanceId": integer
}
```
#### Response: _200 Ok_
```json
{
    "message": "deleted balance success",
    "data": {
        "id": 2,
        "userId": 2,
        "balance": 100,
        "status": "success"
    }
}
```

# Farm
## EndPoint
### GET /farms
#### Response: _200 Ok_
- Body
```json
[
    {
        "id": 1,
        "name": "Lestari Ayam",
        "category": "Chicken",
        "city": "Surabaya",
        "address": "Jalan Timur 1",
        "latitude": -7.245312,
        "longitude": 112.758554,
        "mainImgUrl": "https://i2.wp.com/gdm.id/wp-content/uploads/2022/05/kandang-ayam-open-house-1024x614.jpg",
        "videoUrl": "https://www.youtube.com/watch?v=T9PFzLBVZvg",
        "status": "verified",
        "benefits": "Profit per periode penjualan akan diberikan sebagai dividend kepada investor",
        "sharePercent": 50,
        "price": 300000,
        "FarmerId": 1,
        "Images": [
            {
                "id": 1,
                "FarmId": 1,
                "imgUrl": "https://i2.wp.com/gdm.id/wp-content/uploads/2021/07/bisnis-ternak-ayam-kampung-1024x600.jpg"
            },
            {
                "id": 2,
                "FarmId": 1,
                "imgUrl": "https://cdn1.katadata.co.id/media/images/thumb/2023/01/04/Ilustrasi_Ayam_Ternak-2023_01_04-15_02_04_cc5715b207ea7ef47cb9b961683c4bad_960x640_thumb.jpg"
            },
            {
                "id": 3,
                "FarmId": 1,
                "imgUrl": "https://agribisnis.co.id/wp-content/uploads/2016/08/ayam-petelur-1.jpg"
            }
        ]
    },
    ...
]
```
### GET /farms/my-farms/farm
#### Response: _200 Ok_
- Body
```json
[
    {
        "id": 1,
        "name": "Lestari Ayam",
        "category": "Chicken",
        "city": "Surabaya",
        "address": "Jalan Timur 1",
        "latitude": -7.245312,
        "longitude": 112.758554,
        "mainImgUrl": "https://i2.wp.com/gdm.id/wp-content/uploads/2022/05/kandang-ayam-open-house-1024x614.jpg",
        "videoUrl": "https://www.youtube.com/watch?v=T9PFzLBVZvg",
        "status": "verified",
        "benefits": "Profit per periode penjualan akan diberikan sebagai dividend kepada investor",
        "sharePercent": 50,
        "price": 300000,
        "FarmerId": 1,
        "Images": [
            {
                "id": 1,
                "FarmId": 1,
                "imgUrl": "https://i2.wp.com/gdm.id/wp-content/uploads/2021/07/bisnis-ternak-ayam-kampung-1024x600.jpg"
            },
            {
                "id": 2,
                "FarmId": 1,
                "imgUrl": "https://cdn1.katadata.co.id/media/images/thumb/2023/01/04/Ilustrasi_Ayam_Ternak-2023_01_04-15_02_04_cc5715b207ea7ef47cb9b961683c4bad_960x640_thumb.jpg"
            },
            {
                "id": 3,
                "FarmId": 1,
                "imgUrl": "https://agribisnis.co.id/wp-content/uploads/2016/08/ayam-petelur-1.jpg"
            }
        ]
    },
    ...
]
```
### POST /farms/my-farms/farm
- Request Body
```json

```
### DELETE /farms/my-farms/:farmId
- Request Params 
```json
{
    "farmId": integer
}
```
### GET /farms/:farmId
- Request Params 
```json
{
    "farmId": integer
}
```
#### Response: _200 Ok_
```json
{
    "id": 1,
    "name": "Lestari Ayam",
    "category": "Chicken",
    "city": "Surabaya",
    "address": "Jalan Timur 1",
    "latitude": -7.245312,
    "longitude": 112.758554,
    "mainImgUrl": "https://i2.wp.com/gdm.id/wp-content/uploads/2022/05/kandang-ayam-open-house-1024x614.jpg",
    "videoUrl": "https://www.youtube.com/watch?v=T9PFzLBVZvg",
    "status": "verified",
    "benefits": "Profit per periode penjualan akan diberikan sebagai dividend kepada investor",
    "sharePercent": 50,
    "price": 300000,
    "FarmerId": 1,
    "createdAt": "2023-09-24T13:21:28.239Z",
    "updatedAt": "2023-09-24T13:21:28.239Z",
    "Images": [
        {
            "id": 1,
            "FarmId": 1,
            "imgUrl": "https://i2.wp.com/gdm.id/wp-content/uploads/2021/07/bisnis-ternak-ayam-kampung-1024x600.jpg"
        },
        {
            "id": 2,
            "FarmId": 1,
            "imgUrl": "https://cdn1.katadata.co.id/media/images/thumb/2023/01/04/Ilustrasi_Ayam_Ternak-2023_01_04-15_02_04_cc5715b207ea7ef47cb9b961683c4bad_960x640_thumb.jpg"
        },
        {
            "id": 3,
            "FarmId": 1,
            "imgUrl": "https://agribisnis.co.id/wp-content/uploads/2016/08/ayam-petelur-1.jpg"
        }
    ]
}
```
### GET /farms/my-farms/:farmId
- Request Params 
```json
{
    "farmId": integer
}
```
#### Response: _200 Ok_
```json
{
    "id": 1,
    "name": "Lestari Ayam",
    "category": "Chicken",
    "city": "Surabaya",
    "address": "Jalan Timur 1",
    "latitude": -7.245312,
    "longitude": 112.758554,
    "mainImgUrl": "https://i2.wp.com/gdm.id/wp-content/uploads/2022/05/kandang-ayam-open-house-1024x614.jpg",
    "videoUrl": "https://www.youtube.com/watch?v=T9PFzLBVZvg",
    "status": "verified",
    "benefits": "Profit per periode penjualan akan diberikan sebagai dividend kepada investor",
    "sharePercent": 50,
    "price": 300000,
    "FarmerId": 1,
    "createdAt": "2023-09-24T13:21:28.239Z",
    "updatedAt": "2023-09-24T13:21:28.239Z",
    "Images": [
        {
            "id": 1,
            "FarmId": 1,
            "imgUrl": "https://i2.wp.com/gdm.id/wp-content/uploads/2021/07/bisnis-ternak-ayam-kampung-1024x600.jpg"
        },
        {
            "id": 2,
            "FarmId": 1,
            "imgUrl": "https://cdn1.katadata.co.id/media/images/thumb/2023/01/04/Ilustrasi_Ayam_Ternak-2023_01_04-15_02_04_cc5715b207ea7ef47cb9b961683c4bad_960x640_thumb.jpg"
        },
        {
            "id": 3,
            "FarmId": 1,
            "imgUrl": "https://agribisnis.co.id/wp-content/uploads/2016/08/ayam-petelur-1.jpg"
        }
    ]
}
```
### PATCH /farms/:farmId
- Request Params
```json
{
    "farmId": integer
}
```
- Request Body
```json
{
    "status": "string"
}
```
#### Response: _200 Ok_
- Body
```json
{
    "message": "Farm with id: <id> status updated to verified"
}
```
# Report
## EndPoint
### GET /reports
#### Response: _200 Ok_
- Body
```json
[
    {
        "id": 1,
        "investorId": 1,
        "farmId": 1,
        "description": "This farm is recommended for family invesment!",
        "createdAt": "2023-09-24T16:33:34.575Z",
        "updatedAt": "2023-09-24T16:33:34.575Z"
    },
    {
        "id": 2,
        "investorId": 1,
        "farmId": 1,
        "description": "Very good service, good land to invest here or build a business",
        "createdAt": "2023-09-24T16:33:34.575Z",
        "updatedAt": "2023-09-24T16:33:34.575Z"
    },
    {
        "id": 3,
        "investorId": 1,
        "farmId": 1,
        "description": "The land is not as expected, there are many shortcomings",
        "createdAt": "2023-09-24T16:33:34.575Z",
        "updatedAt": "2023-09-24T16:33:34.575Z"
    }
]
```
### POST /reports
- Request Body
```json
{
    "investorId": "integer",
    "farmId": "integer",
    "description": "string"
}
```
#### Response: _201  Ok_
- Body
```json
{
    "message": "New description added"
}
```
### GET /reports/:id,
- Request params
```json
{
    "id": "integer"
}
```
#### Response: _200 Ok_
```json
{
    "id": 1,
    "investorId": 1,
    "farmId": 1,
    "description": "This farm is recommended for family invesment!",
    "createdAt": "2023-09-24T16:33:34.575Z",
    "updatedAt": "2023-09-24T16:33:34.575Z"
}
```
# Transaction
## EndPoint
### PATCH /transactions/increments/:investorId
- Request Body
```json
{
    "investorId": integer
}
```
#### Response: _200 Ok_
- Body
```json
{
    "message": "success add balance",
    "data": {
        "id": 1,
        "username": "John Doe",
        "email": "invest@mail.com",
        "phoneNumber": "07142421424",
        "balance": 200000
    }
}
```
### PATCH /transactions/decrements/:investorId
- Request Body
```json
{
    "investorId": integer
}
```
#### Response: _200 Ok_
- Body
```json
{
    "message": "success sended balance",
    "data": {
        "id": 1,
        "username": "John Doe",
        "email": "invest@mail.com",
        "phoneNumber": "07142421424",
        "balance": 0
    }
}
```
#### Badrequest: _400 Badrequest_
- Body
```json
{
    "message": "balance is not enough"
}
```
### POST /transactions/payments-token
- Request Body
```json
{ 
    "total": integer, 
    "username": "string"
} 
```
#### Response: _200 Ok_
- Body
```json
{
    "token": "3b78fd0f-4436-4d40-b2b8-da598b858533",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/3b78fd0f-4436-4d40-b2b8-da598b858533"
}
```
#### BadResponse: _400 BadRequest_
```json
{
    "message": "total is required"
}
(or)
{
    "message": "username is required"
}
```

### GLOBAL ERROR 
#### NotFound: _404 NotFound_
- Body
```json
{
    "message": "report with id 5 not found"
}
(or)
{
    "message": "not found"
}
(or)
{
    "message": "Farmer with id <id> not found"
}
(or)
{
    "message": "Investor with id <id> not found"
}
```
#### Internal Server Error: _401 UnAuthorized_
- Body
```json
{
    "message": "Invalid token"
}
```
#### Internal Server Error: _403 Forbidden_
- Body
```json
{
    "message": "Your account is banned"
}
(or)
{
    "message": "UnAuthorized"
}
```
#### Internal Server Error: _500 InternalServerError_
- Body
```json
{
    "message": "Internal Server Error"
}
```

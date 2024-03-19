# Nexu Backend Coding Exercise
This repository contains the backend application for an already existing frontend.
The application was built using NodeJS with ExpressJS
The data storage is set up to a MongoDB database 

## Table of Contents

- [Installation requirements](#installation)
- [Routes](#routes)
- [Examples](#examples)
- [Database](#database)
- [Questions](#questions)

## Installation requirements
### Prerequisites
- Node.js
- npm
- MongoDB Compass

1. Clone this repository
```console
git clone https://github.com/lizeth9797/nexu-backend-test.git
```
2. Go to nexu-test
```console
cd nexu-backend-test/nexu-test 
```
3. Install dependencies
```console
npm install express mongoose body-parser cors
```
4. Run application server
```console
npm run dev
```

Once the server is running, you can test the API endpoints using tools such as Postman or Insomia, please note a collection for insomina is provided in this repository (addInsomniaURL)

## Routes
Find the routes in routes/models.js
```
          GET    /brands
          GET    /brands/:brand_name/models
          POST   /brands
          POST   /brands/:id/models
          PUT    /models/:id
          GET    /models
```
An example for each route is described as follows:

##  Examples
#### GET    /brands
All brands listed in ascending order
```
http://localhost:4001/v1/brands
```
```
[
	{
		"average_price": 0,
		"brand_name": "Abarth"
	},
	{
		"average_price": 702109.5,
		"brand_name": "Acura"
	},
	{
		"average_price": 566127.25,
		"brand_name": "Alfa Romeo"
	},
...
	{
		"average_price": 415593.25,
		"brand_name": "Volvo"
	},
	{
		"average_price": 0,
		"brand_name": "Zacua"
	}
]
```
#### GET    /brands/:brand_name/models
```
http://localhost:4001/v1/brands/Acura/models
```
```
[
	{
		"id": 1,
		"name": "ILX",
		"average_price": 303176
	},
	{
		"id": 2,
		"name": "MDX",
		"average_price": 448193
	},
	{
		"id": 3,
		"name": "RDX",
		"average_price": 395753
	},
	{
		"id": 4,
		"name": "RLX",
		"average_price": 453100
	},
	{
		"id": 5,
		"name": "TL",
		"average_price": 247225
	},
	{
		"id": 6,
		"name": "TSX",
		"average_price": 232533
	},
	{
		"id": 354,
		"name": "RL",
		"average_price": 239050
	},
	{
		"id": 355,
		"name": "ZDX",
		"average_price": 405550
	},
	{
		"id": 665,
		"name": "TLX",
		"average_price": 478290
	},
	{
		"id": 1264,
		"name": "NSX",
		"average_price": 3818225
	}
]
```

#### POST    /brands
```
http://localhost:4001/v1/brands
```
Body
```
{
	"brand_name": "Chery"
}
```
```
{
	"brand_name": "Chery",
	"_id": "65f8fe3ffc79ac8d947cb0f1",
	"createdAt": "2024-03-19T02:53:51.472Z",
	"updatedAt": "2024-03-19T02:53:51.472Z"
}
```

#### POST    /brands/:id/models
```
http://localhost:4001/v1/brands/65f8f1c0193e65a5aaaa576d/models
```
Body
```
{
	"name": "Chery",
	"average_price": 100001
}
```
```
{
	"_id": "65f8f1c0193e65a5aaaa576d",
	"brand_name": "klom2",
	"createdAt": "2024-03-19T02:00:32.112Z",
	"updatedAt": "2024-03-19T02:54:50.539Z",
	"average_price": 100001,
	"name": "Chery"
}
```

#### PUT    /models/:id
```
http://localhost:4001/v1/models/65f536d0257eb24ee4358b65
```
Body
```
{
	"average_price": 303177
}
```
```
{
	"_id": "65f536d0257eb24ee4358b65",
	"id": 1,
	"name": "ILX",
	"average_price": 303177,
	"brand_name": "Acura",
	"updatedAt": "2024-03-19T02:55:49.044Z"
}
```
dels
#### GET    /models?greater=&lower=
```
http://localhost:4001/v1/models?greater=350000&lower=360000
```
```
[
	{
		"name": "Regal",
		"average_price": 352460
	},
	{
		"name": "Clase GLK",
		"average_price": 351929
	},
	{
		"name": "Montero",
		"average_price": 350767
	},
	{
		"name": "Tacoma",
		"average_price": 352954
	},
	{
		"name": "G",
		"average_price": 357625
	}
]
```

##  Database
On MongoDB Compass, click on 'New connection'
```
mongodb+srv://karina:karina123@cluster0.87v2vjl.mongodb.net/ 
```
![alt text](addImageURL)


## Questions:
- The route GET /brands/:id/models where we should list all models of the brand, shouldn't be /brands/:brand_name/models? That way, we are expecting from the frontend the brand_name to list the models related to the brand.



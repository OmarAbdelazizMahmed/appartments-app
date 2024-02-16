# ERD: Apartments App

This document explores  the design of the Apartments App.

We'll use client/server architecture to build the Apartments App. The client will be a web/mobile application and the server will be a REST API.

## Storage

We'll use a relational database to store apartment data. We'll use the following tables to store apartment data:



## Schema

We'll need at least the following tables to store apartment data:

***apartments***
| Column | Type | Description |
| --- | --- | --- |
| id | int | Unique identifier for the apartment. |
| title | string | Title of the apartment. |
| description | string | Description of the apartment. |
| location | string | Location of the apartment. |
| price | int | Price of the apartment. |
| images | string | Images of the apartment. |

***users***
| Column | Type | Description |
| --- | --- | --- |
| id | int | Unique identifier for the user. |
| first_name | string | First name of the user. |
| last_name | string | Last name of the user. |
| email | string | Email of the user. |
| password | string | Password of the user. |

## API

We'll use the following endpoints to allow the client to interact with the server:

***GET /apartments***
- Get all apartments.


***GET /apartments/{id}***
- Get apartment by id.


***POST /apartments***
- Insert apartment.


***PUT /apartments/{id}***

- Update apartment by id.


***DELETE /apartments/{id}***

- Delete apartment by id.


***POST /users***
- Register user.

***POST /users/login***
- Login user.

## Security

We'll use JWT to secure the API. We'll use the following endpoints to allow the client to interact with the server:

***POST /users***
- Register user.

***POST /users/login***

- Login user.

## Server

A simple HTTP server will be used to serve the REST API. We'll use the following libraries to build the server:

- Express.js

## Client

We'll use a web/mobile application as the client. We'll use the following libraries to build the client:

- Next.js


## Conclusion

This document explored the design of the Apartments App. We explored the storage, schema, API, security, server, and client of the Apartments App.
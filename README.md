# JES-USER-SERVICE
A user service api for JES ( Just Enjoy Shooting )

## ENVIRONEMNT VARIABLE
- PORT : 8080  ;default
- VERSION=1
- SECRET=xxxx
- MONGO_URL=mongodb://localhost:27017/jes-user-db ; default

## Installation
How to set up
```sh
sudo JWT_SECRET=secret \
     docker-compose up -d
```
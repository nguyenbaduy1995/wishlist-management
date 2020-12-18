# wishlist-management

## How to run
- First of all, make sure you have an instance of Postgresql running or simple run `docker-compose up` to run in docker environment (Docker is required).
- Create database with any name (default : wishlist)
- Run `yarn` to install require dependencies.
- Create `.env` file with content copied from `.env.local` and then update the value for require fields.
- Run `yarn db` to run database migrations.
- For testing:
 - Run `yarn seed` to create user and items.
 - Send `GET /access-token` to get the jwt token.
 - Using the received token as value of request.headers['token'] to call authorized APIs.

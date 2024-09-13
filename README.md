# Express MongoDB Post api

This is a simple express api that uses mongodb as a database. It has a post route that allows you to post data to the database.

It's backend(express + mongodb) for [react demo](https://github.com/meirongdev/react_demo)

## Functionality

### Posts

- Get a list of posts
- Post a new post
- Get a single post by id
- Update a post by id
- Delete a post by id

### Users

- signup
- signin

## Running the project

DB

```bash
cd docker
docker compose up -d
```

app

```bash
pnpm install
pnpm dev
```

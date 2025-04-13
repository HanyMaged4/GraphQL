# GraphQL API for Newspaper Management

This project is a GraphQL-based API for managing a newspaper system. It allows managing editors and their posts with features like authentication, CRUD operations, and relational queries.

## Features

- **GraphQL API**:
  - Query and mutate data for `Editor` and `Post` entities.
  - Supports nested queries to fetch related data.
- **Authentication**:
  - Requires email and password headers for mutations.
- **CRUD Operations**:
  - Create, read, update, and delete posts and editors.
- **Relational Data**:
  - Fetch posts by editor and editor details for a post.
- **Database Integration**:
  - Uses PostgreSQL for data storage.

## Requirements

- Node.js (v16 or higher)
- PostgreSQL (configured with the schema provided in `schema_DB`)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd GraphQL
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database:
   - Update the database credentials in `db_config/db.js` if necessary.
   - Run the SQL schema in `schema_DB` to set up the database.

## How to Start

1. Start the server:
   ```bash
   npm start
   ```

2. Access the GraphQL Playground:
   - Open your browser and navigate to `http://localhost:4000`.

## Usage

### Queries

- Fetch all posts:
  ```graphql
  query {
    posts {
      id
      title
      content
      createdat
      editor {
        id
        name
      }
    }
  }
  ```

- Fetch a specific editor by ID:
  ```graphql
  query {
    editor(id: "1") {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
  ```

### Mutations

- Add a new post:
  ```graphql
  mutation {
    addPost(post: { title: "New Post", content: "Post content" }) {
      id
      title
    }
  }
  ```

- Add headers for authentication:
  - Use `email` and `password` headers in your GraphQL client.

## Project Structure

- **`index.js`**: Entry point for the server.
- **`schema.js`**: Defines the GraphQL schema.
- **`resolvers.js`**: Implements the resolvers for the schema.
- **`models/`**: Contains database models for `Post` and `Editor`.
- **`db_config/db.js`**: Configures the PostgreSQL connection.
- **`context.js`**: Provides context for authentication.

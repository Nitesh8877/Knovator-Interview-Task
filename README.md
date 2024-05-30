# API Documentation

## User Routes

### Login

- **URL:** `/api/user/login`
- **Method:** `POST`
- **Description:** Endpoint to authenticate a user.
- **Request Body:**
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Response:**
  - `name` (string): User's name.
  - `email` (string): User's email address.
  - `accessToken` (string): JWT access token for authentication.
- **Error Response:**
  - Status: 400 Bad Request
  - Body: `{ "error": "Validation error message" }`

### Register

- **URL:** `/api/user/register`
- **Method:** `POST`
- **Description:** Endpoint to register a new user.
- **Request Body:**
  - `name` (string, required): User's name.
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Response:**
  - `name` (string): User's name.
  - `email` (string): User's email address.
  - `message` (string): Success message.
- **Error Response:**
  - Status: 400 Bad Request
  - Body: `{ "error": "Validation error message" }`

## Post Routes

### Create Post

- **URL:** `/api/post`
- **Method:** `POST`
- **Description:** Endpoint to create a new post.
- **Request Body:**
  - `title` (string, required): Title of the post.
  - `body` (string, required): Body/content of the post.
  - `location` (object, required):
    - `latitude` (number): Latitude of the post location.
    - `longitude` (number): Longitude of the post location.
- **Response:**
  - `title` (string): Title of the created post.
  - `body` (string): Body/content of the created post.
  - `location` (object):
    - `latitude` (number): Latitude of the post location.
    - `longitude` (number): Longitude of the post location.
  - `message` (string): Success message.
- **Error Response:**
  - Status: 400 Bad Request
  - Body: `{ "error": "Validation error message" }`

### Get All Posts

- **URL:** `/api/post`
- **Method:** `GET`
- **Description:** Endpoint to retrieve all posts.
- **Response:**
  - Array of post objects, each containing:
    - `title` (string): Title of the post.
    - `body` (string): Body/content of the post.
    - `location` (object):
      - `latitude` (number): Latitude of the post location.
      - `longitude` (number): Longitude of the post location.

### Get Active and Inactive Posts

- **URL:** `/api/post/active-and-inactive`
- **Method:** `GET`
- **Description:** Endpoint to retrieve count of active and inactive posts.
- **Response:**
  - `activeCount` (number): Count of active posts.
  - `inactiveCount` (number): Count of inactive posts.

### Get Posts by Location

- **URL:** `/api/post/location`
- **Method:** `GET`
- **Description:** Endpoint to retrieve posts by location.
- **Query Parameters:**
  - `latitude` (number, required): Latitude of the location.
  - `longitude` (number, required): Longitude of the location.
- **Response:**
  - Array of post objects, each containing:
    - `title` (string): Title of the post.
    - `body` (string): Body/content of the post.
    - `location` (object):
      - `latitude` (number): Latitude of the post location.
      - `longitude` (number): Longitude of the post location.

### Update Post

- **URL:** `/api/post/:id`
- **Method:** `PUT`
- **Description:** Endpoint to update an existing post.
- **Request Params:**
  - `id` (string, required): ID of the post to update.
- **Request Body:**
  - `title` (string): Updated title of the post.
  - `body` (string): Updated body/content of the post.
  - `location` (object):
    - `latitude` (number): Updated latitude of the post location.
    - `longitude` (number): Updated longitude of the post location.
- **Response:**
  - `message` (string): Success message.

### Delete Post

- **URL:** `/api/post/:id`
- **Method:** `DELETE`
- **Description:** Endpoint to delete an existing post.
- **Request Params:**
  - `id` (string, required): ID of the post to delete.
- **Response:**
  - `message` (string): Success message.

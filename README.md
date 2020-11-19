# Co-Make

## Welcome to the back-end of Co-Make, to find endpoints please use the model below.

## If you need directions on how to use Postman with these endpoints please use the link below for detailed directions.

### Once user is registered and authenticated they will recieve a token that will expire after 48 hrs.

PostMan Directions https://docs.google.com/presentation/d/1e_siqSAX_sv0GEBFo1dRfzPskUGjokKC_0cc4cHtmLg/edit?usp=sharing

## Base url <Front-End Deployment Link>

## Back-End url https://co-make-backend-tt16.herokuapp.com/

### Users

| data       | type                  | required |
| ---------- | --------------------- | -------- |
| id         | integer               | no      |
| first_name | string                | yes      |
| last_name  | string                | yes      |
| email      | string                | yes      |
| username   | string                | yes      |
| password   | string                | yes      |

### Posts

| data             | type    | required |
| -----------      | ------- | -------- |
| id               | integer | no      |
| post_name        | string  | yes      |
| post_description | string  | yes      |
| post_location    | string  | yes      |
| user_id          | integer | no       |
| upvotes          | string  | no       |

## End Points

### Authentication Routes

| Method | Endpoint         | Token Required | Description                                                                                                       |     |
| ------ | ---------------- | -------------- | ----------------------------------------------------------------------------------------------------------------- | --- |
| POST   | `api/auth/register` | no             | Registers a new user <br> Required: first name, last name, email, username, and password. <br>Returns .... |
| POST   | `api/auth/login`    | no             | Signs in user and returns a token.<br> Required: username and password.              |

### User Routes

| Method | Endpoint           | Token Required | Description                   |
| ------ | ------------------ | -------------- | ----------------------------- |
| GET    | `api/users`              | yes            | Returns all users             |
| GET    | `api/users/:id`          | yes            | Returns a single user by id   |
| GET    | `api/users/:id/posts`    | yes            | Returns a single users post history |
| POST   | `api/users/:id/newpost`  | yes            | Returns the newly added post |
| DELETE | `api/users/:id/`         | yes            | Deletes a single user         |

### Post Routes

| Method | Endpoint           | Token Required | Description                                                                                        |
| ------ | ------------------ | -------------- | -------------------------------------------------------------------------------------------------- |
| GET    | `api/posts`           | yes            | Returns all posts with username, post name, post location, and post description                                                                                  |
| GET    | `api/posts/:id`       | yes            | Returns a single post                                                                              |

| PUT    | `api/posts/:id`       | yes            | Edits a single item                                                                                |
| DELETE | `api/posts/:id`       | yes            | Deletes a single item                                                                             |

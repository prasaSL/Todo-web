Todo Single Page Web Application

This is a single-page web application developed using React and Laravel. It provides functionality for managing todo items, including creating, updating, deleting, and categorizing them. The application is secured using Laravel Sanctum for authentication and authorization.
Features

    User authentication using Laravel Sanctum
    Todo item CRUD operations
    Categorization of todo items into completed, not completed, and missing categories
    Prioritization based on due date

Technologies Used

    React: Frontend JavaScript library for building user interfaces
    Laravel: Backend PHP framework for building web applications
    Axios: HTTP client for making API requests
    React Router Dom: Library for routing in React applications
    Laravel Sanctum: Laravel package for API authentication

Deployment Instructions

    Clone the repository:

    bash

git clone https://github.com/prasaSL/Todo-web.git

Navigate to the project directory:

bash

cd Todo-web 

migrate data base:

php artisan migrate

Start the Laravel server:

php artisan serve

The server will start on port 8000 by default.

Navigate to the frontend directory:

bash

cd Todo-frontEnd

Start the React server:

sql

npm start

The server will start on port 3000 by default.

Access the application in your web browser:

arduino

    http://localhost:3000

Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any problems or have suggestions for improvement.
License

This project is licensed under the MIT License.
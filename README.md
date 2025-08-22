[README.md](https://github.com/user-attachments/files/21946027/README.md)
# BabaTaher
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/yusuf200988/babataher)

BabaTaher is a full-stack currency exchange application built with a Django REST backend and a vanilla JavaScript frontend. It provides a simple interface to view currency prices and convert between them.

## Features

*   **RESTful API**: A robust backend built with Django and Django REST Framework.
*   **JWT Authentication**: Secure API endpoints using `djangorestframework-simplejwt`.
*   **Custom User Model**: User authentication based on phone number instead of username.
*   **Currency Management**: Full CRUD (Create, Read, Update, Delete) functionality for currencies.
*   **Dynamic Frontend**: A simple, responsive frontend built with HTML, Tailwind CSS, and JavaScript that consumes the backend API.
*   **Currency Lister**: Displays a list of currencies with their current price, last price, and percentage change.
*   **Currency Converter**: A tool to calculate the exchange rate between any two currencies in the system.

## Project Structure

The project is organized into a Django backend and a separate frontend directory.

*   **`BabaTaher/`**: The main Django project configuration.
*   **`currencies/`**: A Django app that handles all logic related to currencies, including models, views (API endpoints), and serializers.
*   **`users/`**: A Django app with a custom user model that uses a phone number for authentication.
*   **`FrontEnd/`**: Contains the static HTML, CSS (via Tailwind CDN), and JavaScript files for the user interface.

## API Endpoints

The following API endpoints are available:

| Method | Endpoint                    | Description                                        | Authentication |
| :----- | :-------------------------- | :------------------------------------------------- | :------------- |
| `GET`  | `/currencies/`              | Retrieves a list of all currencies.                | Not Required   |
| `GET`  | `/currencies/?id=<currency_id>` | Retrieves a single currency by its ID.             | Not Required   |
| `POST` | `/currencies/`              | Creates a new currency.                            | Required       |
| `PUT`  | `/currencies/?id=<currency_id>` | Updates an existing currency.                      | Required       |
| `DELETE`| `/currencies/?id=<currency_id>` | Deletes a currency.                                | Required       |
| `POST` | `/api/token/`               | Obtains a JWT access and refresh token pair.       | Not Required   |
| `POST` | `/api/token/refresh/`       | Refreshes an expired access token.                 | Not Required   |

## Setup and Installation

Follow these steps to get the project running locally.

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yusuf200988/babataher.git
    cd babataher
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # For Windows
    python -m venv venv
    .\venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Apply database migrations:**
    ```bash
    python manage.py migrate
    ```

5.  **Create a superuser to access the admin panel:**
    ```bash
    python manage.py createsuperuser
    ```
    You will be prompted to enter a name, phone number, and password.

6.  **Run the development server:**
    ```bash
    python manage.py runserver
    ```
    The backend will be available at `http://127.0.0.1:8000/`. You can log in to the admin panel at `http://127.0.0.1:8000/admin/`.

### Frontend Setup

1.  Navigate to the `FrontEnd` directory.
2.  Open the `index.html` file in your web browser.

> **Note**: The frontend `script.js` is configured to fetch data from `http://localhost:8000`. Ensure your Django development server is running at this address. It also uses a hardcoded JWT token for authorization; you should replace this with a dynamically obtained token from the `/api/token/` endpoint for a complete implementation.

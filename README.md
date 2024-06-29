# Book Subscription Management System

Ovaj projekat koristi React za frontend i Laravel za backend.

## Instalacija

### Backend (Laravel)

1. Kloniraj repozitorijum:
    ```sh
    git clone https://github.com/tvoj-username/tvoj-repozitorijum.git
    cd tvoj-repozitorijum
    ```

2. Instaliraj zavisnosti:
    ```sh
    composer install
    ```

3. Kopiraj `.env.example` u `.env` i postavi konfiguraciju baze podataka:
    ```sh
    cp .env.example .env
    php artisan key:generate
    ```

4. Pokreni migracije:
    ```sh
    php artisan migrate
    ```

5. Pokreni server:
    ```sh
    php artisan serve
    ```

### Frontend (React)

1. Navigiraj u frontend direktorijum:
    ```sh
    cd frontend
    ```

2. Instaliraj zavisnosti:
    ```sh
    npm install
    ```

3. Pokreni razvojni server:
    ```sh
    npm start
    ```



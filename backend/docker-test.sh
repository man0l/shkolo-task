#!/bin/bash

# Run Laravel tests in Docker with SQLite in-memory database
DB_CONNECTION=sqlite DB_DATABASE=':memory:' php artisan test "$@" 
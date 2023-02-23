<h1>NetCorp Test</h1>

## Installation
```bash
 - rname .env.example to .env
 - composer install
 - php artisan migrate:fresh --seed
 - npm install

 - npm run watch
 - php artisan serve
```
## Tech stack

 - laravel, reactJs, mysql, bootstrap css

## Features

 - list active vehicles
 - display vehcicle logs by the Y-M-D
 - display last record of the vehicle and show location on map

## Issue

 - I find the log records on database is only for one month, so I change to requirement myself, listing against a day not a month.

## To do

 - unit test
 - better UI
 - better doc
 - exception handle
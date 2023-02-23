<h1>NetCorp Test</h1>

## Installation

 - rname .env.example to .env
 - composer install
 - php artisan migrate:fresh --seed
 - npm install
 - npm run watch

## Tech stack

 - laravel, reactJs, mysql, bootstrap css

## Features

 - list active vehicles
 - display vehcicle logs by the Y-M-D
 - display last record of the vehicle and show location on map

## Issue

 - I find the log records on database is only lasts a month, so I change to requirement myself, to list against day not month.

## To do

 - unit test
 - better UI
 - better doc
 - exception handle
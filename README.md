# Fast-Food-Fast
A food delivery service app for a restaurant.

# Motivation

This App is a challenge that will contritube greatly to my journey of becoming a world class developer

# Build Status

Build status of continous integration i.e travis, coveralls and codeclimate



[![Build Status](https://travis-ci.org/el-Joft/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/el-Joft/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/el-Joft/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/el-Joft/Fast-Food-Fast?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)

### Style guide

[Airbnb ](https://github.com/airbnb/javascript)(Javascript style guide)
[BEM ](https://github.com/airbnb/css)(CSS style guide)



Preview UI template here[ UI Template](https://el-joft.github.io/Fast-Food-Fast/UI/index.html)

### Tech Stack

- [Nodejs](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/)
- [Mocha](https://mochajs.org/)
- [Chai](http://www.chaijs.com/)

### Features

- User should be able to create account
- User should be able to view history of order(s) made
- User should be able to Login
- User should be able to make an Order
- user should be able to should be able to Update an Order

## Installing

#### Prerequisites

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

To install this app

```
git clone git@github.com:/el-Joft/Fast-Food-Fast.git
```

And install the required dependencies

```
npm install
```

Run server

```
npm run dev
```

Server listens on port `3000`

## Running the tests

To run test cases

```
npm test
```

### Working Routes

<table>
<thead>
<tr>
<th>Endpoint</th>
<th>Functionality</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET /orders</td>
<td>Get all the orders.</td>
</tr>
<tr>
<td>GET /orders/:orderId</td>
<td>Fetch a specific order</td>
</tr>
<tr>
<td>POST /orders</td>
<td>Place a new order</td>
</tr>
<tr>
<td>PUT /orders/:orderId</td>
<td>Update the status of an order.</td>
</tr>
</tbody></table>

## License

This projects is under the MIT LICENSE

## Author

[Omotayo Timothy Fehintolu](http://github.com//el-Joft)

## Acknowledgments

- [Andela](http://andela.com)
- [Google Search](https://google.com)
- [Stackoverflow](stackoverflow.com)
- [Resources]()
- Kudus to everybody who supported

### Live demo

You can test the api endpoints


- [Here ](https://fffastapp.herokuapp.com/)


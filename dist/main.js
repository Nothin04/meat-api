"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as restify from 'restify'
var users_router_1 = require("./users/users.router");
var server_1 = require("./server/server");
var restaurants_router_1 = require("./restaurants/restaurants.router");
var reviews_routes_1 = require("./reviews/reviews.routes");
var server = new server_1.Server();
server.bootstrap([users_router_1.usersRouter, restaurants_router_1.restaurantsRouter, reviews_routes_1.reviewsRouter]).then(function (server) {
    console.log('Server is listening on: ', server.application.address());
}).catch(function (error) {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});

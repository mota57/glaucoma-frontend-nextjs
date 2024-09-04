"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../lib/client/");
var services_gen_1 = require("../lib/client/services.gen");
services_gen_1.client.setConfig({
    baseUrl: 'http://localhost:8000',
});
var data = {
    path: {
        user_id: 1
    }
};
 client_1.UsersService.readUsers(data).then((result) => {

     console.log(result.data);
 });


import { UsersService, ReadUserData     } from '../lib/client/';
import { client } from '../lib/client/services.gen';

client.setConfig({
  baseUrl: 'http://localhost:8000',
});


    var data: ReadUserData = {
        path: {
            user_id:1
        }
    }
    var result = UsersService.readUsers(data)
    console.log(result);



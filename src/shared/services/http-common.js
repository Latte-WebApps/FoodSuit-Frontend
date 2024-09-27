import axios from 'axios';

export default axios.create({
    baseURL: 'https://my-json-server.typicode.com/Latte-WebApps/FoodSuit-JSONServer',
    headers: {
        'Content-type': 'application/json'
    }
});

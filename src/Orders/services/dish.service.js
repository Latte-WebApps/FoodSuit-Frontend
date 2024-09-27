import http from "../../shared/services/http-common.js";

export class DishService {
    resourceEndpoint = '/dishes';
    orderEndpoint = '/orders';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getByName(name) {
        return http.get(`${this.resourceEndpoint}/${name}`);
    }

    create(foodResource) {
        return http.post(this.orderEndpoint, foodResource);
    }

    saveSelectedDishes(selectedFoods) {
        return http.post(`${this.orderEndpoint}/selectedFoods`, selectedFoods);
    }
}
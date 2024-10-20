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

    getByCategory(category) {
        return http.get(`${this.resourceEndpoint}?category=${category}`);
    }

    create(order) {
        return http.post(this.orderEndpoint, order);
    }

    saveSelectedDishes(selectedFoods) {
        return http.post(`${this.orderEndpoint}/selectedFoods`, selectedFoods);
    }
}
import http from "../../shared/services/http-common.js";

export class DishService {
    resourceEndpoint = '/dishes';
    orderEndpoint = '/orders';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getAllOrders(){
        return http.get(this.orderEndpoint);
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

    createDish(dish) {
        return http.post(this.resourceEndpoint, dish);
    }

    update(id, order) {
        return http.put(`${this.orderEndpoint}/${id}`, order);
    }

    delete(id) {
        return http.delete(`${this.orderEndpoint}/${id}`);
    }

    deleteDish(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    saveSelectedDishes(selectedFoods) {
        return http.post(`${this.orderEndpoint}/selectedFoods`, selectedFoods);
    }
}
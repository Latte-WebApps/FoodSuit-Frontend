import http from "../../shared/services/http-common.js";

export class ItemService {
    resourceEndpoint = '/inventory';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(itemResource) {
        return http.post(this.resourceEndpoint, itemResource);
    }

    update(id, itemResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, itemResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}
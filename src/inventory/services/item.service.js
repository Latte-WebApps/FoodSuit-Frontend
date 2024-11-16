import http from "../../shared/services/http-common.js";

export class ItemService {
    resourceEndpoint = '/products';

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


    patch(id, data) {
        return http.patch(`${this.resourceEndpoint}/${id}`, data);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}
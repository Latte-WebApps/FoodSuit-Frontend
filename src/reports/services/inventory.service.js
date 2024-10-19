import http from '../../shared/services/http-common.js';

class InventoryService {
    resourceEndpoint = '/inventory';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(productId) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }
}

export default new InventoryService();

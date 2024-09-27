import http from '../../shared/services/http-common.js';

class InventoryService {
    getAll() {
        return http.get('/inventory');
    }
}

export default new InventoryService();
import http from '../../shared/services/http-common.js';

class TopEmployeeService {
    resourceEndpoint = '/employees';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    create(topEmployeeResource) {
        return http.post(this.resourceEndpoint, topEmployeeResource);
    }

    update(id, topEmployeeResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, topEmployeeResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }
}

export default new TopEmployeeService();

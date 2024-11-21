import http from '../../shared/services/http-common.js';

class EmployeeService {
    resourceEndpoint = '/employees';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(employeeResource) {
        return http.post(this.resourceEndpoint, employeeResource);
    }

    update(id, employeeResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, employeeResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }
}

export default new EmployeeService();

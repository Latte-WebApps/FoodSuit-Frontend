import http from '../../shared/services/http-common.js';

class EmployeeService {
    getAll() {
        return http.get('/employees');
    }
}

export default new EmployeeService();

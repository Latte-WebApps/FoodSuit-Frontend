// attendance.service.js
import http from '../../shared/services/http-common.js';

class AttendanceService {
    resourceEndpoint = '/productivity';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getProductivity() {
        return http.get(this.resourceEndpoint);
    }

}

export default new AttendanceService();

import http from '../../shared/services/http-common.js';

class AttendanceService {
    resourceEndpoint = '/attendances';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(attendanceRecord) {
        return http.post(this.resourceEndpoint, attendanceRecord);
    }

    update(id, attendanceRecord) {
        return http.put(`${this.resourceEndpoint}/${id}`, attendanceRecord);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }
}

export default new AttendanceService();

import http from '../../shared/services/http-common.js';

class ReportService {
    resourceEndpoint = '/reports';

    getAll() {
        return http.get(this.resourceEndpoint);
    }
}

export default new ReportService();

import http from '../../shared/services/http-common.js';

class ReportesService {
    resourceEndpoint = '/reports';

    getAll() {
        return http.get(this.resourceEndpoint);
    }
}

export default new ReportesService();

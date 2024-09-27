import http from "../../shared/services/http-common.js";

export class ReportService {
    resourceEndpoint = '/reports';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    create(reportResource) {
        return http.post(this.resourceEndpoint, reportResource);
    }
}
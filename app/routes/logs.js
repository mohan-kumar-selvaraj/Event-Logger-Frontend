import Route from '@ember/routing/route';

export default class LogsRoute extends Route {
    queryParams = {
        page: { refreshModel: true },
        pageSize: { refreshModel: true }
    };

    async model(params) {
        let page = params.page || 1; // Default to page 1 if undefined
        let pageSize = params.pageSize || 10; // Default to pageSize 10 if undefined

        let response = await fetch(`http://localhost:8080/EventLogJNI/json?page=${page}&pageSize=${pageSize}`);
        let data = await response.json();

        return {
            logs: data.logs,
            totalPages: data.totalPages
        };
    }
}

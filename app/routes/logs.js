// app/routes/logs.js
import Route from '@ember/routing/route';

export default class LogsRoute extends Route {
    async model() {
        const response = await fetch(
            'http://localhost:8080/ServletJsonProject/json',
        );
        const data = await response.json();
        return data.logs;
    }
}

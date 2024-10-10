import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FilterFormComponent extends Component {

    @tracked type = '';
    @tracked value = '';

    @service router; // Inject router service to transition to routes

    @action
    updateType(event) {
        this.type = event.target.value;
    }

    @action
    updateValue(event) {
        this.value = event.target.value;
    }

    @action
    async searchLogs() {
        // Transition to the logs route with query params
        this.router.transitionTo('logs', {
            queryParams: {
            type: this.type,
            value: this.value,
            page: 1, // Reset to the first page when a new search is performed
            },
        });
    }
}

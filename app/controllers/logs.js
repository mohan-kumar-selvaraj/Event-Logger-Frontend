import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class LogsController extends Controller {
    queryParams = ['page', 'pageSize'];
    page = 1; // Default page number
    pageSize = 10; // Default page size

    @action
    previousPage() {
        if (this.page > 1) {
            this.decrementProperty('page');
        }
    }

    @action
    nextPage() {
        if (this.page < this.model.totalPages) {
            this.incrementProperty('page');
        }
    }
}

import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FilterFormComponent extends Component {

    @action
    updateFilterLogic(event) {
        this.args.updateFilterLogic(event, this.args.index); // Pass index to update the correct filter
    }


    // Handle type update and pass it to the parent component (LogsController)
    @action
    updateType(event) {
        this.args.updateType(event, this.args.index); // Pass index to update the correct filter
    }

    @action
    updateQueryType(event) {
        this.args.updateQueryType(event, this.args.index); // Pass index to update the correct filter
    }

    // Handle value update and pass it to the parent component (LogsController)
    @action
    updateValue(event) {
        this.args.updateValue(event, this.args.index); // Pass index to update the correct filter
    }

    // Remove filter and trigger action from the parent controller
    @action
    removeFilter() {
        this.args.removeFilter(this.args.index); // Call remove action with the index
    }
    
}

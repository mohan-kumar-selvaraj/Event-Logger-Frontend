import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LogsController extends Controller {
  // queryParams = ['page', 'pageSize'];
  page = 1; // Default page number
  pageSize = 10; // Default page size
  sortColumn = "";

  @tracked filters = [{ type: '', value: '', logic : '' }]; // Initial filter array

  // Add a new empty filter
  @action
  addFilter() {
      this.filters = [...this.filters, { type: '', value: '', logic : '' }];
  }

  // Update the filter type
  @action
  updateFilterLogic(event, index) {
      let filtersCopy = [...this.filters];
      filtersCopy[index].logic = event.target.value;
      this.filters = filtersCopy;
  }

  // Update the filter type
  @action
  updateFilterType(event, index) {
      let filtersCopy = [...this.filters];
      filtersCopy[index].type = event.target.value;
      this.filters = filtersCopy;
  }

  // Update the filter value
  @action
  updateFilterValue(event, index) {
      let filtersCopy = [...this.filters];
      filtersCopy[index].value = event.target.value;
      this.filters = filtersCopy;
  }

  // Remove a filter based on its index
  @action
  removeFilter(index) {
    this.filters = this.filters.filter((_, i) => i !== index);
  }

  @action
  async searchLogs(flag=false) {
    
    if(this.page == "") this.page = 1
    if(this.pageSize == "") this.pageSize = 10

    if(flag) this.page = 1
    const payload = {
      page: this.page,
      pageSize: this.pageSize,
      sortColumn : this.sortColumn,
      filters: this.filters // Send the filters array as part of the payload
    };

    try {
      const response = await fetch('/EventLogJNI/json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(payload) // Convert the payload to JSON string
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json(); // Parse JSON response

      console.log(data);
      

      // Handle the response (e.g., update the model with new logs)
      this.set('model', data);
    } catch (error) {
      console.error('Error sending filters:', error);
    }
  }

  @action
  previousPage() {
    if (this.page > 1) {
      this.decrementProperty('page');
      this.searchLogs()
    }
  }

  @action
  nextPage() {
    if (this.page < this.model.totalPages) {
      this.incrementProperty('page');
      this.searchLogs()
    }
  }

  @action
  updatePageNumber(event) {
    if (this.page < this.model.totalPages) {
      console.log(event);
      
      this.page = event.target.value;
      this.searchLogs();
    }
  }

  @action
  setSortColumn(column) {
      this.sortColumn = column;
      this.searchLogs(true);
  }
}

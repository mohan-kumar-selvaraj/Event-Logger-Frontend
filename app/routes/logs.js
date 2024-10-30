// app/routes/logs.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LogsRoute extends Route {
  @service router;
  @service session;

  async beforeModel() {
    console.log("BeforeModel called");
    
    try {
      if(!this.session.isAuthenticated){
        alert('Session Expired');
        this.router.replaceWith('login');
      }
    } catch (error) {
      console.error('Error during authentication check:', error);
      this.router.replaceWith('login');
    }
  }

  async model(params) {
    let page = params.page || 1;
    let pageSize = params.pageSize || 10;

    try {
      let response = await fetch(
        `/EventLogJNI/json?page=${page}&pageSize=${pageSize}`,
        {
          method: 'GET',
          credentials: 'include', // Send cookies or session info
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized access. Please log in.');
          this.router.replaceWith('login');
        }
        throw new Error('Failed to fetch logs');
      }

      let data = await response.json();

      data.logs = data.logs.map((log, index) => {
        return {
          ...log,
          SNO: index + 1,
        };
      });

      console.log(data);
      return {
        logs: data.logs,
        totalPages: data.totalPages,
      };
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  }
}

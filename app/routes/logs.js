// app/routes/logs.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LogsRoute extends Route {
  @service session;
  @service router;

  async beforeModel() {
    try {
      let response = await fetch('http://localhost:8080/EventLogJNI/auth-check', {
        method: 'GET',
        credentials: 'include',
      });

      let authStatus = await response.json();

      if (!authStatus.isAuthenticated) {
        alert("Session Timeout")
        this.router.replaceWith('login');
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
      this.router.replaceWith('login');
    }
  }


  queryParams = {
    page: { refreshModel: true },
    pageSize: { refreshModel: true },
  };

  async model(params) {
    let page = params.page || 1;
    let pageSize = params.pageSize || 10;

    try {
      let response = await fetch(
        `http://localhost:8080/EventLogJNI/json?page=${page}&pageSize=${pageSize}`,
        {
          method: 'GET',
          credentials: 'include', // Send cookies or session info
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized access. Please log in.');
          this.router.replaceWith('login');
        }
        throw new Error('Failed to fetch logs');
      }

      let data = await response.json();
      return {
        logs: data.logs,
        totalPages: data.totalPages,
      };

    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  }
}

// async model(params) {
//   let page = params.page || 1; // Default to page 1 if undefined
//   let pageSize = params.pageSize || 10; // Default to pageSize 10 if undefined

//   try {
//     let response = await fetch(
//       `http://localhost:8080/EventLogJNI/json?page=${page}&pageSize=${pageSize}`,
//       {
//         credentials: 'include', // Ensure session cookies are sent
//       }
//     );

//     if (!response.ok) {
//       // If the response is not ok, handle errors like Unauthorized
//       let errorText = await response.text();
//       if (response.status === 401) {
//         alert('Unauthorized access. Please login again.');
//         this.router.replaceWith('login');
//       } else {
//         throw new Error(errorText); // Handle other server-side errors
//       }
//       return;
//     }

//     // If the response is ok, parse it as JSON
//     let data = await response.json();

//     return {
//       logs: data.logs,
//       totalPages: data.totalPages,
//     };

//   } catch (error) {
//     console.error('Error fetching logs:', error);
//     alert('Failed to load logs. Please try again later.');
//   }
// }
// }


// import Route from '@ember/routing/route';
// import { inject as service } from '@ember/service';

// export default class LogsRoute extends Route {
//   @service session;
//   @service router;

//   beforeModel() {
//     if (!this.session.isAuthenticated) {
//       // Redirect to login if the user is not authenticated
//       alert("Authentication failed");
//       this.router.replaceWith('login');
//     }
//   }

//   queryParams = {
//     page: { refreshModel: true },
//     pageSize: { refreshModel: true },
//   };

//   async model(params) {
//     let page = params.page || 1; // Default to page 1 if undefined
//     let pageSize = params.pageSize || 10; // Default to pageSize 10 if undefined

//     let response = await fetch(
//       `http://localhost:8080/EventLogJNI/json?page=${page}&pageSize=${pageSize}`,
//     );
//     let data = await response.json();

//     return {
//       logs: data.logs,
//       totalPages: data.totalPages,
//     };
//   }
// }

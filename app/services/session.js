import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @tracked isAuthenticated = false;
  @tracked user = null;
  @service store;

  constructor() {
    super(...arguments);

    // Check for a isAuthenticated in localStorage when the service is initialized
    // if you didn't give the constructor then when you refresh the browser then the state resets and isAuthenticated goes to false
    const token = localStorage.getItem('isAuthenticated');
    if (token) {
      this.isAuthenticated = true;
    }
  }

  async authenticate(email, password) {
    const url = '/EventLogJNI/checkuser';

    const bodyData = {email,password};

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for sending and receiving cookies
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonResponse = await response.json();
      console.log('Success:', jsonResponse);

      if (jsonResponse.authenticated === true) {
        this.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', true);
      } else if (jsonResponse.passwordMismatch) {
        throw new Error('Password mismatch!!');
      } else {
        throw new Error('User not found!! Create an account!!');
      }
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Auhentication Failed!!');
    }
  }
}

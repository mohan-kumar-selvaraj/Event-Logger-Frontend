import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service'; // Correct import for router service

export default class LoginFormComponent extends Component {
  @service router; // Ensure this is correctly injected

  @tracked email = '';
  @tracked password = '';

  @action
  updateEmail(event) {
    this.email = event.target.value;
  }

  @action
  updatePassword(event) {
    this.password = event.target.value;
  }

  @action
  async login() {
    if (this.email === '') {
      alert('Email cannot be empty!!');
      return;
    }
    if (this.password === '') {
      alert('Password cannot be empty!!');
      return;
    }

    const url = '/EventLogJNI/checkuser';

    const bodyData = {
      email: this.email,
      password: this.password,
    };

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

      // Check if user is authenticated based on the backend response
      if (jsonResponse.authenticated === true) {
        // Redirect to the logs route
        this.router.replaceWith('logs');
      } else if (jsonResponse.passwordMismatch) {
        alert('Password mismatch!!');
        return;
      } else {
        alert('User not found!! Create an account!!');
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Auhentication Failed!!');
    }

    // Clear the form
    this.email = '';
    this.password = '';
  }

  @action
  transitionToSignup() {
    this.router.replaceWith('signup');
  }
}

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service'; // Correct import for router service

export default class LoginFormComponent extends Component {
  @service router; // Ensure this is correctly injected
  @service session;

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
    try {
      await this.session.authenticate(this.email, this.password);
      this.router.replaceWith('logs');
    } catch(error) {
      alert(error);
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

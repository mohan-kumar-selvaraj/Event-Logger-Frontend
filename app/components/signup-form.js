import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service'; // Correct import for router service

export default class SignupFormComponent extends Component {

    @service router; // Ensure this is correctly injected

    @tracked username = '';
    @tracked password = '';
    @tracked re_password = '';

    @action
    updateUsername(event) {
        this.username = event.target.value;
    }

    @action
    updatePassword(event) {
        this.password = event.target.value;
    }

    @action
    updateRePassword(event) {
        this.re_password = event.target.value;
    }

    @action
    signup() {
        alert(`Username: ${this.username}\nPassword: ${this.password}\nRe-Password: ${this.re_password}`);
        this.username = '';
        this.password = '';
        this.re_password = '';
    }

    @action
    transitionToLogin() {
        this.router.replaceWith('login');
    }
}

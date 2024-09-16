import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service'; // Correct import for router service

export default class LoginFormComponent extends Component {

    @service router; // Ensure this is correctly injected

    @tracked username = '';
    @tracked password = '';

    @action
    updateUsername(event) {
        this.username = event.target.value;
    }

    @action
    updatePassword(event) {
        this.password = event.target.value;
    }

    @action
    login() {
        alert(`Username: ${this.username}\nPassword: ${this.password}`);
        this.username = '';
        this.password = '';
    }

    @action
    transitionToSignup() {
        this.router.replaceWith('signup');
    }
}

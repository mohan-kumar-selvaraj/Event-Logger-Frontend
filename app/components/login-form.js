import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
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
        this.username = "";
        this.password = "";
    }
}

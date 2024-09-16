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
        if (this.email == "") {
            alert("Email cannot be empty!!");
            return;
        }
        if (this.password == "") {
            alert("Password cannot be empty!!");
            return;
        }

        const url = "http://localhost:8080/EventLogJNI/checkuser";

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
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonResponse = await response.json();
            console.log('Success:', jsonResponse);

            if (jsonResponse.email === true) {
                // User already exists
                if (jsonResponse.password === true) {
                    alert("User already exists");
                    this.router.replaceWith('logs');
                } else {
                    alert("Password mismatch!!");
                    return;
                }
            } else {
                // Proceed to create a new user
                alert("User not found!! Create an account!!");
                return;
            }

        } catch (error) {
            console.error('Error:', error);
        }

        // alert(`email: ${this.email}\nPassword: ${this.password}`);
        this.email = '';
        this.password = '';
    }

    @action
    transitionToSignup() {
        this.router.replaceWith('signup');
    }
}

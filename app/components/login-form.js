import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service'; // Correct import for router service

export default class LoginFormComponent extends Component {

    @service router; // Ensure this is correctly injected
    @service session;  // Inject the session service to manage session

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
        if (this.email === "") {
            alert("Email cannot be empty!!");
            return;
        }
        if (this.password === "") {
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
                credentials: 'include',  // Important for sending and receiving cookies
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonResponse = await response.json();
            console.log('Success:', jsonResponse);

            // Check if user is authenticated based on the backend response
            if (jsonResponse.authenticated === true) {
                // If authentication is successful, store the session in Ember's session service
                this.session.set('isAuthenticated', true);
                this.session.set('userEmail', this.email);
                this.session.set('user', this.email);

                // Redirect to the logs route
                this.router.replaceWith('logs');

                // Set a timer to automatically log out after 15 minutes (900,000 milliseconds)
                setTimeout(() => {
                    this.logout();
                }, 15 * 60 * 1000);  // 15 minutes
            } else if (jsonResponse.passwordMismatch) {
                alert("Password mismatch!!");
                return;
            } else {
                alert("User not found!! Create an account!!");
                return;
            }

        } catch (error) {
            console.error('Error:', error);
            alert("Auhentication Failed!!");
        }

        // Clear the form
        this.email = '';
        this.password = '';
    }

    @action
    logout() {
        // Call the backend to clear the session
        fetch('http://localhost:8080/EventLogJNI/logout', {
            method: 'POST',
            credentials: 'include',  // This ensures cookies or session info are sent
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Logout failed');
                }
                // Clear session on frontend
                this.session.set('isAuthenticated', false);
                this.session.set('userEmail', null);

                // Redirect to the login route
                this.router.replaceWith('login');
                alert('You have been logged out.');
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    }

    @action
    transitionToSignup() {
        this.router.replaceWith('signup');
    }
}

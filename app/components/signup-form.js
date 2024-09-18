import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service'; // Correct import for router service

export default class SignupFormComponent extends Component {
    @service router; // Ensure this is correctly injected

    @tracked email = '';
    @tracked password = '';
    @tracked re_password = '';

    @action
    updateEmail(event) {
        this.email = event.target.value;
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
    async signup() {
        if (this.email == "") {
            alert("Email cannot be empty!!");
            return;
        }
        if (this.password == "") {
            alert("Password cannot be empty!!");
            return;
        }
        if (this.re_password == "") {
            alert("Re-Enter Password cannot be empty!!");
            return;
        }
        if (this.password !== this.re_password) {
            alert('Passwords do not match.');
            return;
        }

        const url = "/EventLogJNI/checkuser";

        const bodyData = {
            email: this.email, // Using email now
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

            if (response.status === 401) {
                // User not found or unauthorized, attempt to create a new user

                try {
                    const createUserUrl = "/EventLogJNI/createuser";
                    const createUserResponse = await fetch(createUserUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(bodyData),
                    });

                    const createUserJson = await createUserResponse.json();

                    if (createUserJson.status === true) {
                        alert(createUserJson.message);
                    } else {
                        alert(createUserJson.message);
                    }
                } catch (error) {
                    console.log(error);

                }
                // Clear form fields after successful or failed signup
                this.email = '';
                this.password = '';
                this.re_password = '';
                return;

            } else if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonResponse = await response.json();
            console.log('Success:', jsonResponse);

            alert("User already exists");

        } catch (error) {
            console.error('Error:', error);
        }

        // Clear form fields after successful or failed signup
        this.email = '';
        this.password = '';
        this.re_password = '';
    }

    @action
    transitionToLogin() {
        this.router.replaceWith('login');
    }
}

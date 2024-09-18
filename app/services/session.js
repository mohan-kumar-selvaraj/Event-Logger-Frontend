// app/services/session.js
import Service from '@ember/service';

export default class SessionService extends Service {
    isAuthenticated = false;
    userEmail = null;
}

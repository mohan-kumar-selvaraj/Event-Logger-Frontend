import EmberRouter from '@ember/routing/router';
import config from 'event-logger/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('logs');
  this.route('signup');
  this.route('filter-page');
});

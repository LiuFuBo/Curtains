import ReactDOM from 'react-dom';
import routes from './router.js';

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(routes, document.querySelector('#container'));
});
// JS - 
//import './js/';

import $ from 'jquery';
global.jQuery = $;
global.$ = $;
global.jQuery = global.$ = $;
window.$ = window.jQuery = $;
import 'jquery/dist/jquery.min.js'
import './pages/page.js';
// SCSS
import './index.scss';
// PUG 
import './index.pug';
import {MDCRipple} from '@material/ripple/index';

const ripple = new MDCRipple(document.querySelector('.mdc-button'));
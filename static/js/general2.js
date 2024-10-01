import { getHeaderHtml } from './header.js';
import { getFooterHtml } from './footer.js';
import { getBaseFooterHtml } from './base-footer.js';

document.querySelector(".site-header").innerHTML = getHeaderHtml();
document.querySelector(".page-footer").innerHTML = getFooterHtml();
document.querySelector(".base-footer").innerHTML = getBaseFooterHtml();
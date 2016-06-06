import Promise from 'bluebird';
import $ from 'jquery';
import _ from 'underscore';
import ruleManager from './rule-manager';

function download(url) {
  return new Promise(resolve => $.get(url, resolve, 'text'));
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    ruleManager.fetch().each(({ user, pen, regex }) => {
      if (pen && tab.url.match(new RegExp(regex))) {
        download(`http://codepen.io/${user}/pen/${pen}.js`).then(code => {
          chrome.tabs.executeScript(tabId, { code }, _.noop);
        });
        download(`http://codepen.io/${user}/pen/${pen}.css`).then(code => {
          chrome.tabs.insertCSS(tabId, { code }, _.noop);
        });
      }
    });
  }
});

import $ from 'jquery';
import _ from 'underscore';

chrome.storage.sync.set({
  config: [
    { regex: '.*', pen: 'ezmXVX' },
  ],
}, _.noop);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get('config', ({
      config = [],
    }) => _.each(config, ({
      regex = '',
      pen = '',
    }) => {
      if (pen && tab.url.match(new RegExp(regex))) {
        $.get(`http://codepen.io/wewei/pen/${pen}.js`, code => {
          chrome.tabs.executeScript(tabId, { code }, _.noop);
        }, 'text');
        $.get(`http://codepen.io/wewei/pen/${pen}.css`, code => {
          chrome.tabs.insertCSS(tabId, { code }, _.noop);
        });
      }
    }));
  }
});

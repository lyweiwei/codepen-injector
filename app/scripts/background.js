import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

class Config extends Backbone.Collection {
  fetch() {
    chrome.storage.sync.get('config', result => {
      super.fetch({ data: result.config });
    });
  }

  sync() {
    chrome.storage.sync.set({
      config: this.toJSON(),
    }, _.noop);
  }
}

const config = new Config();

config.push({
	regex: '.*',
	pen: 'ezmXVX',
});

config.fetch();


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    config.each(model => {
      const regex = new RegExp(model.get('regex'));
      const pen = model.get('pen');

      if (tab.url.match(regex)) {
        $.get(`http://codepen.io/wewei/pen/${pen}.js`, code => {
          chrome.tabs.executeScript(tabId, { code }, _.noop);
        }, 'text');
        $.get(`http://codepen.io/wewei/pen/${pen}.css`, code => {
          chrome.tabs.insertCSS(tabId, { code }, _.noop);
        });
      }
    });
  }
});

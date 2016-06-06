import _ from 'underscore';
import Promise from 'bluebird';

class RuleManager {
  fetch() {
    return new Promise(resolve => chrome.storage.sync.get('rules', resolve))
      .then(obj => _.result(obj, 'rules', []));
  }

  sync(rules) {
    chrome.storage.sync.set({ rules }, _.noop);
  }
}

export default new RuleManager();

import _ from 'underscore';

export function uuid() {
  const str = '0123456789abcdef';

  return _.map(
    [12, 4, 4, 4, 8],
    n => _.times(n, () => str[_.random(16)]).join('')
  ).join('-');
}

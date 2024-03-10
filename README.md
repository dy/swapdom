# swapdom [![test](https://github.com/spectjs/swapdom/actions/workflows/test.yml/badge.svg)](https://github.com/spectjs/swapdom/actions/workflows/test.yml) [![npm version](https://img.shields.io/npm/v/swapdom)](http://npmjs.org/swapdom)

> Fast & tiny DOM swapper.

```js
import swap from 'swapdom'

swap(parentNode, oldNodes, newNodes, endNode)
```

`deflate.js` strategy is smaller (248b), but a bit slower on some cases and doesn't support live collections.<br/>
`inflate.js` strategy is bigger (318b), but faster and supports live collections.

Provide custom mutators as:
```js
swap.same = (a,b) => a?.isSameNode(b)
swap.replace = (a,b, parent) => a.replaceWith(b)
swap.insert = (a,b, parent) => a ? a.before(b) : parent.append(b)
swap.remove = (a, parent) => a.remove()
```

See [benchmark](https://github.com/luwes/js-diff-benchmark) (it's called _spect_ there).

## Alternatives

* [list-difference objects](https://github.com/paldepind/list-difference/blob/master/index.js)
* [list-difference maps](https://github.com/luwes/js-diff-benchmark/blob/master/libs/list-difference.js)

<p align="center">ॐ</p>

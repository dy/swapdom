# swapdom [![test](https://github.com/spectjs/swapdom/actions/workflows/test.yml/badge.svg)](https://github.com/spectjs/swapdom/actions/workflows/test.yml) [![npm version](https://img.shields.io/npm/v/swapdom)](http://npmjs.org/swapdom)

> Fast & tiny DOM swapper.

```js
import swap from './swap-inflate.js'

swap(parentNode, oldNodes, newNodes, endNode)
```

`swap-deflate.js` strategy is smaller (208b), but slower and doesn't support live collections.
`swap-inflate.js` strategy is bigger (363b), but faster and support live collections.

Provide custom mutators as:
```js
swap.same = (a,b) => a?.isSameNode(b)
swap.replace = (a,b, parent) => a.replaceWith(b)
swap.insert = (a,b, parent) => a ? a.before(b) : parent.append(b)
swap.remove = (a, parent) => a.remove()
```

See [benchmark](https://github.com/luwes/js-diff-benchmark).

<p align="center">ॐ</p>

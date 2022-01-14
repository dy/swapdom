# swapdom [![test](https://github.com/spectjs/swapdom/actions/workflows/test.yml/badge.svg)](https://github.com/spectjs/swapdom/actions/workflows/test.yml) [![npm version](https://img.shields.io/npm/v/swapdom)](http://npmjs.org/swapdom)

> Fast & tiny DOM swapper.

```js
import swap from './swap-inflate.js'

swap(parentNode, oldNodes, newNodes, endNode)
```

Deflate strategy is shorter (208b), but slower and doesn't support live collection.
Inflate strategy is bigger (363b), but faster and support live collection.

See [benchmark](https://github.com/luwes/js-diff-benchmark).

<p align="center">ॐ</p>

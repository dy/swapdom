// dom diff algo benchmark
import t, { is, ok, any } from './node_modules/tst/tst.js'
import { time } from './node_modules/wait-please/index.js'
// import diff from './libs/list-difference.js'
// import diff from './libs/udomdiff.js'
// import diff from './libs/snabbdom.js'
// import diff from './libs/stage0.js'
// import diff from './inflate.js'
import diff from './deflate.js'
// import diff from './deflate.obj.js'


const t1 = document.createElement('i1'),
  t2 = document.createElement('i2'),
  t3 = document.createElement('i3'),
  t4 = document.createElement('i4'),
  t5 = document.createElement('i5'),
  t6 = document.createElement('i6'),
  t7 = document.createElement('i7'),
  t8 = document.createElement('i8'),
  t9 = document.createElement('i9'),
  t0 = document.createElement('i0')


// test fragment stub with node-compatible API
const frag = () => {
  let f = document.createDocumentFragment()
  f.count = 0
  f.reset = () => f.count = 0

  let _insertBefore = f.insertBefore
  f.insertBefore = function () { _insertBefore.apply(this, arguments), f.count++ }
  let _appendChild = f.appendChild
  f.appendChild = function () { _appendChild.apply(this, arguments), f.count++ }
  let _replaceChild = f.replaceChild
  f.replaceChild = function () { _replaceChild.apply(this, arguments), f.count++ }
  let _removeChild = f.removeChild
  f.removeChild = function () { _removeChild.apply(this, arguments), f.count++ }

  return f
}

t('begin', () => console.time('total'))

t('create', t => {
  let parent = frag();

  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5], null);
  is([...parent.childNodes], [t1, t2, t3, t4, t5], 'create')
  ok(parent.count <= 5)
})

t('remove', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5],);

  console.log('---remove')
  diff(parent, [...parent.childNodes], [t1, t3, t5],);
  is([...parent.childNodes], [t1, t3, t5], 'remove')
})

t('insert', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t3, t5],);
  is([...parent.childNodes], [t1, t3, t5], 'created')

  console.log('insert')
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5],);
  is([...parent.childNodes], [t1, t2, t3, t4, t5], 'insert')
})

t('append before', t => {
  let parent = frag();
  diff(parent, [], [t1, t5]);
  diff(parent, [], [t3], t5);
  is([...parent.childNodes], [t1, t3, t5], 'insert')
})

t('prepend', t => {
  let parent = frag();
  diff(parent, [], [t4, t5], null);
  diff(parent, [t4, t5], [t1, t2, t3, t4, t5], null);
  is([...parent.childNodes], [t1, t2, t3, t4, t5], 'prepended')
})
t('swap 2/5', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5],);
  parent.reset()

  console.log('---swap')
  diff(parent, [...parent.childNodes], [t1, t5, t3, t4, t2],);
  is([...parent.childNodes], [t1, t5, t3, t4, t2])

  // ok(parent.count <= 2, 'ops')
  ok(parent.count <= 6, 'ops')
})
t('swap-replace', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5, t6],);
  parent.reset()

  console.log('---swap')
  diff(parent, [...parent.childNodes], [t1, t5, t3, t8, t4],);
  is([...parent.childNodes], [t1, t5, t3, t8, t4])
})

t('swap', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5, t6, t7, t8, t9],);
  parent.reset()

  console.log('---swap')
  diff(parent, [...parent.childNodes], [t1, t8, t3, t4, t5, t6, t7, t2, t9],);
  is([...parent.childNodes], [t1, t8, t3, t4, t5, t6, t7, t2, t9])

  // ok(parent.count <= 2, 'ops')
})

t('swap-tail', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5, t6, t7, t8, t9]);
  parent.reset()

  console.log('---swap')
  diff(parent, [...parent.childNodes], [t9, t2, t3, t4, t5, t6, t7, t8, t1]);
  is([...parent.childNodes], [t9, t2, t3, t4, t5, t6, t7, t8, t1])

  // ok(parent.count <= 2, 'ops')
})

t('single', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1]);
  parent.reset()

  diff(parent, [...parent.childNodes], [t2]);
  is([...parent.childNodes], [t2])

  ok(parent.count < 3, 'ops')
})

t('one in the middle', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---swap')
  diff(parent, [...parent.childNodes], [t1, t2, t6, t4, t5]);
  is([...parent.childNodes], [t1, t2, t6, t4, t5])

  // ok(parent.count <= 4, 'ops')
})

t('ring', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---ring')
  diff(parent, [...parent.childNodes], [t2, t3, t4, t5, t1]);
  is([...parent.childNodes], [t2, t3, t4, t5, t1])

  ok(parent.count <= 4, 'ops')
})

t('shiftpop', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---shiftpop')
  diff(parent, [...parent.childNodes], [t0, t1, t2, t3, t4]);
  is([...parent.childNodes], [t0, t1, t2, t3, t4])

  // ok(parent.count <= 4, 'ops')
})

t('endswap', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('--->')
  diff(parent, [...parent.childNodes], [t5, t2, t3, t4, t0]);
  is([...parent.childNodes], [t5, t2, t3, t4, t0])

  // ok(parent.count <= 6, 'ops')
})

t('endswap2', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('--->')
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t6]);
  is([...parent.childNodes], [t1, t2, t3, t4, t6])
})

// FIXME: this removes extra nodes
t.todo('foreign', t => {
  let parent = frag();
  diff(parent, [], [t1, t2, t3]);
  let t2clone = t2.cloneNode(true)
  parent.insertBefore(t2clone, t2)
  parent.reset()

  console.log('---foreign swap')
  diff(parent, [t1, t2, t3], [t2, t3]);
  is([...parent.childNodes], [t2clone, t2, t3])
})

t('shuffle1', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---swap')
  diff(parent, [...parent.childNodes], [t1, t3, t5, t4, t2],);
  is([...parent.childNodes], [t1, t3, t5, t4, t2])
  ok(parent.count <= 6, 'ops count')
})

t('shuffle2', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---swap')
  diff(parent, [...parent.childNodes], [t4, t5, t3, t2, t1],);
  is([...parent.childNodes], [t4, t5, t3, t2, t1])
  ok(parent.count < 7, 'ops count')
})

t('shuffle3', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---swap')
  diff(parent, [...parent.childNodes], [t2, t5, t1, t4, t3],);
  is([...parent.childNodes], [t2, t5, t1, t4, t3])
  ok(parent.count < 7, 'ops count')
})

t('shuffle4', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---swap')
  diff(parent, [...parent.childNodes], [t3, t4, t5, t2, t1],);
  is([...parent.childNodes], [t3, t4, t5, t2, t1])
  ok(parent.count < 10, 'ops count')
})

t('shuffle5', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---chain-swap')
  diff(parent, [...parent.childNodes], [t1, t2, t3, t5, t4],);
  is([...parent.childNodes], [t1, t2, t3, t5, t4])
  ok(parent.count < 10, 'ops count')
})

t('shuffle6', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---chain-swap')
  diff(parent, [...parent.childNodes], [t4, t3, t2, t1, t5],);
  is([...parent.childNodes], [t4, t3, t2, t1, t5])
  ok(parent.count < 10, 'ops count')
})

t('shuffle7', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---chain-swap')
  diff(parent, [...parent.childNodes], [t2, t3, t4, t5, t1],);
  is([...parent.childNodes], [t2, t3, t4, t5, t1])
  ok(parent.count < 10, 'ops count')
})

t('shuffle8', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  parent.reset()

  console.log('---chain-swap')
  diff(parent, [...parent.childNodes], [t3, t4, t2, t1, t5],);
  is([...parent.childNodes], [t3, t4, t2, t1, t5])
  ok(parent.count < 10, 'ops count')
})

t('tiny-random-2', t => {
  let parent = frag();
  const initial = [t1, t2, t3, t4, t5]
  diff(parent, [...parent.childNodes], initial);
  parent.reset()

  console.log('---chain-swap')
  let ordered = initial.slice().sort(() => Math.random() - Math.random())
  diff(parent, [...parent.childNodes], ordered, null);
  is([...parent.childNodes], ordered)
  ok(parent.count < 10, 'ops count')
})

t.skip('live-nodes', t => {
  // we skip since we test object as input
  let parent = frag();
  const initial = [t1, t2, t3, t4, t5]
  diff(parent, [...parent.childNodes], initial);
  parent.reset()

  console.log('---chain-swap')
  let ordered = initial.slice().sort(() => Math.random() - Math.random())
  diff(parent, parent.childNodes, ordered,);
  is([...parent.childNodes], ordered)
  ok(parent.count < 10, 'ops count')
})

t('reverse', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5],);
  is([...parent.childNodes], [t1, t2, t3, t4, t5])
  console.log('---reverse')
  diff(parent, [...parent.childNodes], [t5, t4, t3, t2, t1],);
  is([...parent.childNodes], [t5, t4, t3, t2, t1])
})

t('clear', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  console.log('---clear')
  diff(parent, [...parent.childNodes], [],);
  is([...parent.childNodes], [])
})
t.skip('clear live', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5]);
  console.log('---clear')
  diff(parent, parent.childNodes, [],);
  is([...parent.childNodes], [])
})

t('remove with head/tail', t => {
  let parent = frag();
  console.groupCollapsed('init')
  diff(parent, [...parent.childNodes], [t0, t1, t2, t3, t4, t5, t6]);
  console.groupEnd()
  console.log('---remove')
  diff(parent, [...parent.childNodes], [t1, t3, t5],);
  is([...parent.childNodes], [t1, t3, t5])
})

t('reverse-add', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t5, t4, t3, t2, t1],);

  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5, t6],);
  is([...parent.childNodes], [t1, t2, t3, t4, t5, t6])
  console.groupEnd()
})

t('swap 10', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5, t6, t7, t8, t9, t0],);
  parent.reset()
  console.log('---swap')
  diff(parent, [...parent.childNodes], [t1, t8, t3, t4, t5, t6, t7, t2, t9, t0],);
  is([...parent.childNodes], [t1, t8, t3, t4, t5, t6, t7, t2, t9, t0], 'order')
  // ok(parent.count < 5, 'ops count')
  // ok(parent.count < 7, 'ops count') // since we test deflate without shortcut
})

t('update each 3', t => {
  console.groupCollapsed('create')
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3, t4, t5, t6, t7, t8, t9],);
  console.groupEnd()
  console.log('---update')
  let x = document.createTextNode(0), y = document.createTextNode(0), z = document.createTextNode(0)
  diff(parent, [...parent.childNodes], [t1, t2, x, t4, t5, y, t7, t8, z],);
  is([...parent.childNodes], [t1, t2, x, t4, t5, y, t7, t8, z])
})

t.todo('morph text', t => {
  let parent = frag();
  diff(parent, [...parent.childNodes], [t1, t2, t3],);
  console.log('---update')
  let x = document.createTextNode('i1'), y = document.createTextNode('i2'), z = document.createTextNode('i3')
  diff(parent, [...parent.childNodes], [z, y, x],);
  is([...parent.childNodes], [z, t2, x])
})

t('create/replace ops', t => {
  // That's fine: failed due to wrong nodes
  let parent = frag()
  const N = 100

  let start = 0;
  let childNodes = [];
  for (let i = 0; i < N; i++) childNodes.push(document.createTextNode(start + i))

  parent.reset()
  diff(parent, [...parent.childNodes], childNodes,)

  ok(parent.count <= N)

  // replace
  start = N
  childNodes = []
  for (let i = 0; i < N; i++) childNodes.push(document.createTextNode(start + i))

  parent.reset()
  console.log('---replace')
  diff(parent, [...parent.childNodes], childNodes,)
  console.log(parent.count)
  is((parent.count - N) <= 100, true, 'ops count')
})

t('js-diff-benchmark random', t => {
  const parent = frag()
  let childNodes = create1000(parent, diff);

  const shuffled = childNodes.slice().sort(() => Math.random() - Math.random())
  childNodes = diff(parent, childNodes, shuffled);

  is(childNodes.length, 1000, 'result length')
  ok(childNodes.every((row, i) => row === parent.childNodes[i]), 'order')
})

// actual benchmark
t('create 1000', async t => {
  const parent = frag()
  console.time('create 1000');
  const rows = create1000(parent, diff);
  console.timeEnd('create 1000');
  is([...parent.childNodes].every((row, i) => row === rows[i]), true);
  const out = ['operations', parent.count];
  if (parent.count > 1000) {
    console.warn(`+${parent.count - 1000}`);
  }
  console.log(...out, '\n');
  parent.reset();
})

t('random', async t => {
  const parent = frag()
  create1000(parent, diff);
  parent.reset();
  console.time('random');
  const rows = random(parent, diff);
  console.timeEnd('random');

  ok([...parent.childNodes].every((row, i) => row === rows[i]), 'data is correct');
  const out = ['operations', parent.count];
  if (parent.count > 1000) {
    console.warn(`+${parent.count - 1000}`);
  }
  console.log(...out, '\n');
  parent.reset();
})

t('reverse 1000', async t => {
  const parent = frag()
  create1000(parent, diff);
  random(parent, diff);
  parent.reset()
  console.time('reverse');
  const rows = reverse(parent, diff);
  console.timeEnd('reverse');
  ok([...parent.childNodes].every((row, i) => row === rows[i]));
  const out = ['operations', parent.count];
  if (parent.count > 1000) {
    console.warn(`+${parent.count - 1000}`);
  }
  console.log(...out, '\n');
  parent.reset();
})

t('clear 1000', async t => {
  const parent = frag()
  create1000(parent, diff);
  parent.reset()
  console.time('clear');
  const rows = clear(parent, diff);
  console.timeEnd('clear');
  ok([...parent.childNodes].every((row, i) => row === rows[i]))
  is(rows.length, 0);
  const out = ['operations', parent.count];
  if (parent.count > 1000) {
    console.warn(`+${parent.count - 1000}`);
  }
  console.log(...out, '\n');
  parent.reset();
})

t('replace 1000', async t => {
  const parent = frag()
  create1000(parent, diff);
  parent.reset();
  console.time('replace 1000');
  const rows = create1000(parent, diff);
  console.timeEnd('replace 1000');
  is([...parent.childNodes].every((row, i) => row === rows[i]), true);
  const out = ['operations', parent.count];
  if (parent.count > 2000) {
    console.warn(`+${parent.count - 2000}`);
  }
  console.log(...out, '\n');
  clear(parent, diff);
  parent.reset();

})

t('append 1000', async t => {
  const parent = frag()
  create1000(parent, diff);
  parent.reset();
  console.time('append 1000');
  const rows = append1000(parent, diff);
  console.timeEnd('append 1000');
  ok([...parent.childNodes].every((row, i) => row === rows[i]))
  is(rows.length, 2000);
  const out = ['operations', parent.count];
  if (parent.count > 1000) {
    console.warn(`+${parent.count - 1000}`);
  }
  console.log(...out, '\n');
  parent.reset();
})

t('append more', async t => {
  const parent = frag()
  create1000(parent, diff);
  append1000(parent, diff);
  parent.reset();
  console.time('append more');
  const rows = append1000(parent, diff);
  console.timeEnd('append more');
  is([...parent.childNodes].every((row, i) => row === rows[i]), true)
  is(rows.length, 3000);
  const out = ['operations', parent.count];
  if (parent.count > 1000) {
    console.warn(`+${parent.count - 1000}`);
  }
  console.log(...out, '\n');
  parent.reset();
  clear(parent, diff);
})


t('swap rows', async t => {
  const parent = frag()
  create1000(parent, diff);
  parent.reset();
  console.time('swap rows');
  swapRows(parent, diff);
  console.timeEnd('swap rows');
  const out = ['operations', parent.count];
  if (parent.count > 2) {
    console.warn(`+${parent.count - 2}`);
  }
  console.log(...out, '\n');
  parent.reset();
})

t('update every 10th row', async t => {
  const parent = frag()
  create1000(parent, diff);
  parent.reset();
  console.time('update every 10th row');
  updateEach10thRow(parent, diff);
  console.timeEnd('update every 10th row');
  const out = ['operations', parent.count];
  if (parent.count > 200) {
    console.warn(`+${parent.count - 200}`);
  }
  console.log(...out, '\n');
  parent.reset();

  clear(parent, diff);
  parent.reset();
})

t('create comparisons', async t => {
  let parent, childNodes

  const N = 1e5

  parent = frag()
  childNodes = []
  for (let i = 0; i < N; i++) childNodes.push(document.createTextNode(i))
  console.time('appendChild')
  for (let i = 0; i < N; i++) parent.appendChild(childNodes[i]);
  console.timeEnd('appendChild')

  await time(250)

  parent = frag()
  childNodes = []
  for (let i = 0; i < N; i++) childNodes.push(document.createTextNode(i))
  console.time('insertBefore')
  for (let i = 0; i < N; i++) parent.insertBefore(childNodes[i], null);
  console.timeEnd('insertBefore')

  await time(250)

  parent = frag()
  childNodes = []
  for (let i = 0; i < N; i++) childNodes.push(document.createTextNode(i))
  console.time('diff')
  diff(parent, [], childNodes)
  console.timeEnd('diff')
})

t.skip('create 10000 rows', async t => {
  const parent = frag()

  console.time('create 10000 rows');
  create10000(parent, diff);
  console.timeEnd('create 10000 rows');

  const out = ['operations', parent.count];
  if (parent.count > 10000) {
    console.warn(`+${parent.count - 10000}`);
  }
  console.log(...out, '\n');
  parent.reset();
})

t.skip('swap over 10000 rows', async t => {
  const parent = frag()
  create10000(parent, diff);
  parent.reset()
  console.time('swap over 10000 rows');
  swapRows(parent, diff);
  console.timeEnd('swap over 10000 rows');
  const out = ['operations', parent.count];
  if (parent.count > 2) {
    console.warn(`+${parent.count - 2}`);
  }
  console.log(...out, '\n');
  parent.reset();
})

t.skip('clear 10000', async t => {
  const parent = frag()
  create10000(parent, diff);
  parent.reset()
  console.time('clear 10000');
  clear(parent, diff);
  console.timeEnd('clear 10000');
  const out = ['operations', parent.count];
  if (parent.count > 10000) {
    console.warn(`+${parent.count - 10000}`);
  }
  console.log(...out, '\n');
  parent.reset();
})

t('end', t => console.timeEnd('total'))


function random(parent, diff) {
  return diff(
    parent,
    [...parent.childNodes],
    Array.from(parent.childNodes).sort(() => Math.random() - Math.random()),
  );
}

function reverse(parent, diff) {
  return diff(
    parent,
    [...parent.childNodes],
    Array.from(parent.childNodes).reverse(),

  );
}

function clear(parent, diff) {
  return diff(
    parent,
    [...parent.childNodes],
    [],
  );
}

function create1000(parent, diff) {
  const start = parent.childNodes.length;
  const childNodes = [];
  for (let i = 0; i < 1000; i++)
    childNodes.push(document.createTextNode(start + i));
  return diff(
    parent,
    [...parent.childNodes],
    childNodes,
  );
}

function append1000(parent, diff) {
  const start = parent.childNodes.length - 1;
  const childNodes = [...parent.childNodes];
  for (let i = 0; i < 1000; i++)
    childNodes.push(document.createTextNode(start + i));
  return diff(
    parent,
    [...parent.childNodes],
    childNodes,
  );
}

function create10000(parent, diff) {
  const childNodes = [];
  for (let i = 0; i < 10000; i++)
    childNodes.push(document.createTextNode(i));
  return diff(
    parent,
    [...parent.childNodes],
    childNodes,

  );
}

function swapRows(parent, diff) {
  const childNodes = [...parent.childNodes];
  const $1 = childNodes[1];
  childNodes[1] = childNodes[998];
  childNodes[998] = $1;
  return diff(
    parent,
    [...parent.childNodes],
    childNodes,

  );
}

function updateEach10thRow(parent, diff) {
  const childNodes = [...parent.childNodes];
  for (let i = 0; i < childNodes.length; i += 10)
    childNodes[i] = document.createTextNode(i + '!');
  return diff(
    parent,
    [...parent.childNodes],
    childNodes,

  );
}

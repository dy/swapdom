// deflate version, but for objects as inputs
const swap = (parent, a, b, end = null, { insert, remove } = swap) => {
  let i = 0, cur, bi, next, ins,
    bidx = new WeakSet(b),
    keys = Object.keys(b)

  // first remove unneeded
  for (i in a) bi = a[i], !bidx.has(bi) ? remove(bi, parent) : (cur ||= bi)
  cur ||= end

  // then add needed
  while (i = keys.shift()) {
    bi = b[i], next = cur?.nextSibling || end
    if (cur === bi) cur = next
    else {
      // swap 1:1 (saves costly swaps)
      if (b[keys[0]] === next) cur = next

      insert(bi, cur, parent), ins = 1
    }
  }

  return b
}

swap.insert = (a, b, parent) => parent.insertBefore(a, b)
swap.remove = (a, parent) => parent.removeChild(a)

export default swap

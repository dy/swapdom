// inflate version of differ, ~260b
// + no sets / maps used
// + prepend/append/remove/clear short paths
// + a can be live childNodes/HTMLCollection

const swap = (parent, a, b, end = null) => {
  let i = 0, cur, next, bi, n = b.length, m = a.length, { remove, same, insert, replace } = swap

  // skip head/tail
  while (i < n && i < m && same(a[i], b[i])) i++
  while (i < n && i < m && same(b[n-1], a[m-1])) end = b[--m, --n]

  // append/prepend/trim shortcuts
  if (i == m) while (i < n) insert(end, b[i++], parent)
  // FIXME: can't use shortcut for childNodes as input
  // if (i == n) while (i < m) parent.removeChild(a[i++])

  else {
    cur = a[i]

    while (i < n) {
      bi = b[i++], next = cur ? cur.nextSibling : end

      // skip
      if (same(cur, bi)) cur = next

      // swap / replace
      else if (i < n && same(b[i], next)) (replace(cur, bi, parent), cur = next)

      // insert
      else insert(cur, bi, parent)
    }

    // remove tail
    while (cur != end) (next = cur.nextSibling, remove(cur, parent), cur = next)
  }

  return b
}

swap.same = (a,b) => a == b
swap.replace = (a,b, parent) => parent.replaceChild(b, a)
swap.insert = (a,b, parent) => parent.insertBefore(b, a)
swap.remove = (a, parent) => parent.removeChild(a)


export default swap

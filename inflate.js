// inflate version of differ, ~260b
// + no sets / maps used
// + prepend/append/remove/clear short paths
// + a can be live childNodes/HTMLCollection

const swap = (parent, a, b, end = null, { remove, insert, replace } = swap) => {
  let i = 0, cur, next, bi, n = b.length, m = a.length

  // skip head/tail
  while (i < n && i < m && a[i] === b[i]) i++
  while (i < n && i < m && b[n - 1] === a[m - 1]) end = b[--m, --n]

  // append/prepend/trim shortcuts
  if (i == m) while (i < n) insert(end, b[i++], parent)

  // NOTE: can't use shortcut for childNodes as input
  if (i == n) while (i < m) remove(a[i++], parent)

  else {
    cur = a[i]

    while (i < n) {
      bi = b[i++], next = cur ? cur.nextSibling : end

      // skip
      if (cur === bi) cur = next

      // swap / replace
      else if (i < n && b[i] === next) (replace(cur, bi, parent), cur = next)

      // insert
      else insert(cur, bi, parent)
    }

    // remove tail
    // NOTE: that can remove elements not in a (if inserted externally)
    while (cur !== end) (next = cur.nextSibling, remove(cur, parent), cur = next)
  }

  return b
}

swap.replace = (a, b, parent) => parent.replaceChild(b, a)
swap.insert = (a, b, parent) => parent.insertBefore(b, a)
swap.remove = (a, parent) => parent.removeChild(a)


export default swap

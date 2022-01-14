// inflate version of differ, ~260b
// + no sets / maps used
// + prepend/append/remove/clear short paths
// + a can be live childNodes/HTMLCollection

const swap = (parent, a, b, end = null) => {
  let i = 0, cur, next, bi, n = b.length, m = a.length

  // skip head/tail
  while (i < n && i < m && a[i] == b[i]) i++
  while (i < n && i < m && b[n-1] == a[m-1]) end = b[--m, --n]

  // append/prepend/trim shortcuts
  if (i == m) while (i < n) parent.insertBefore(b[i++], end)
  // FIXME: can't use shortcut for childNodes as input
  // if (i == n) while (i < m) parent.removeChild(a[i++])

  else {
    cur = a[i]

    while (i < n) {
      bi = b[i++], next = cur ? cur.nextSibling : end

      // skip
      if (cur == bi) cur = next

      // swap / replace
      else if (i < n && b[i] == next) (swap.replace(parent, cur, bi), cur = next)

      // insert
      else swap.insert(parent, cur, bi)
    }

    // remove tail
    while (cur != end) (next = cur.nextSibling, swap.remove(parent, cur), cur = next)
  }

  return b
}

swap.replace = (parent, a,b) => parent.replaceChild(b, a)
swap.insert = (parent, a,b) => parent.insertBefore(b, a)
swap.remove = (parent, a) => parent.removeChild(a)


export default swap

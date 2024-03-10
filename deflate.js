// deflate version of differ, ~170b
// NOTE: doesn't support live b
const swap = (parent, a, b, end = null) => {
  let i = 0, cur, next, bi, bidx = new Set(b), { same, remove, insert } = swap

  while (bi = a[i++]) !bidx.has(bi) ? remove(bi, parent) : cur = cur || bi
  cur = cur || end, i = 0

  while (bi = b[i++]) {
    next = cur ? cur.nextSibling : end

    // skip
    if (same(cur, bi)) cur = next

    else {
      // swap 1:1 (saves costly swaps)
      if (same(b[i], next)) cur = next

      // insert
      insert(bi, cur, parent)
    }
  }

  return b
}

swap.same = (a, b) => a === b
swap.replace = (a, b, parent) => parent.replaceChild(b, a)
swap.insert = (a, b, parent) => parent.insertBefore(a, b)
swap.remove = (a, parent) => parent.removeChild(a)

export default swap

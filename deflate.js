// deflate version of differ, ~170b
// NOTE: doesn't support live b
const swap = (parent, a, b, end = null, { remove, insert } = swap) => {
  let i = 0, cur, next, bi, bidx = new Set(b)

  while (bi = a[i++]) !bidx.has(bi) ? remove(bi, parent) : cur = cur || bi
  cur = cur || end, i = 0

  while (bi = b[i++]) {
    next = cur ? cur.nextSibling : end

    // skip
    if (cur === bi) cur = next

    else {
      // swap 1:1 (saves costly swaps)
      if (b[i] === next) cur = next

      // insert
      insert(bi, cur, parent)
    }
  }

  return b
}

swap.insert = (a, b, parent) => parent.insertBefore(a, b)
swap.remove = (a, parent) => parent.removeChild(a)

export default swap

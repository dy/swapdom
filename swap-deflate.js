// deflate version of differ, ~170b
// - doesn't support live b
const swap = (parent, a, b, end = null) => {
  let i = 0, cur, next, bi, bidx = new Set(b)

  while (bi = a[i++]) !bidx.has(bi) ? swap.remove(parent, bi) : cur = cur || bi
  cur = cur || end, i = 0

  while (bi = b[i++]) {
    next = cur ? cur.nextSibling : end

    // skip
    if (cur == bi) cur = next

    else {
      // swap 1:1
      if (b[i] === next) cur = next

      // insert
      swap.insert(parent, cur, bi)
    }
  }

  return b
}

swap.replace = (parent, a,b) => parent.replaceChild(b, a)
swap.insert = (parent, a,b) => parent.insertBefore(b, a)
swap.remove = (parent, a) => parent.removeChild(a)

export default swap

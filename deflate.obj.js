// deflate version, but for objects as inputs
const swap = (parent, a, b, end = null) => {
  let i = 0, cur, next, bi, bidx = new Set(b), { same, remove, insert } = swap

  for (i in a) {
    bi = a[i]
    !bidx.has(bi) ? remove(bi, parent) : cur ||= bi
  }
  cur ||= end

  for (i in b) {
    bi = b[i], next = cur ? cur.nextSibling : end

    // skip
    if (same(cur, bi)) cur = next

    // insert
    else insert(cur, bi, parent)
  }

  return b
}

swap.same = (a, b) => a === b
swap.insert = (a, b, parent) => parent.insertBefore(b, a)
swap.remove = (a, parent) => parent.removeChild(a)

export default swap

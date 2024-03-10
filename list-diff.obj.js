
export default function diff(parent, a, b, end) {
  const key = a => a
  const insert = (a, b) => parent.insertBefore(a, b)
  const remove = (a) => parent.removeChild(a)

  var aIdx = new Map,
    bIdx = new Map,
    i, j;

  for (i = 0; i < a.length; i++) { aIdx.set(key(a[i]), i) }
  for (i = 0; i < b.length; i++) { bIdx.set(key(b[i]), i) }

  for (i = j = 0; i !== a.length || j !== b.length;) {
    var aElm = a[i], bElm = b[j];
    // This is a element that has been moved to earlier in the list
    if (aElm === null) {
      i++;
    }
    // No more elements in new, this is a delete
    else if (b.length <= j) { remove(a[i]); i++; }
    // No more elements in old, this is an addition
    else if (a.length <= i) { insert(bElm, a[i] || end); j++; }
    // No difference, we move on
    else if (key(aElm) === key(bElm)) { i++; j++; }
    // Look for the current element at this location in the new list
    else {
      // This gives us the idx of where this element should be
      var curElmInNew = bIdx[key(aElm)];
      // Look for the the wanted elment at this location in the old list
      // This gives us the idx of where the wanted element is now
      var wantedElmInOld = aIdx[key(bElm)];
      if (curElmInNew === undefined) {
        // Current element is not in new list, it has been removed
        remove(a[i]);
        i++;
      } else if (wantedElmInOld === undefined) {
        // New element is not in old list, it has been added
        insert(bElm, a[i] || end);
        j++;
      } else {
        // Element is in both lists, it has been moved
        // move(wantedElmInOld, i);
        insert(a[wantedElmInOld], a[i] || end);
        a[wantedElmInOld] = null;
        j++;
      }
    }
  }

  return b;
};

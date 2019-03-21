const charToIndex = ch => ch.codePointAt(0) - 'a'.codePointAt(0)

const traverse = (root, [ key, ...rest ], fn, index = 0) => {
  const i = charToIndex(key)
  fn(root, i, !rest.length, index)

  if (!rest.length) return
  return traverse(root.children[i], rest, fn, index + 1)
}

const Node = ({children = [], isEndOfWord = false } = {}) => ({
  children,
  isEndOfWord
})

export default (root = Node()) => ({
  insert ([ key, ...rest ], node = root) {
    const i = charToIndex(key)
    const children = node.children
    const isEndOfWord = !rest.length
    if (!children[i]) children[i] = Node({ isEndOfWord })
    if (!rest.length) return

    return this.insert(rest, children[i])
  },
  contains ([ key, ...rest ], node = root) {
    if (!key) return node
    const index = charToIndex(key)
    const child = node.children[index]
    if (key && !child) return false
    return this.contains(rest, child)
  },
  search (key) {
    const node = this.contains(key)
    return node && node.isEndOfWord
  }
})

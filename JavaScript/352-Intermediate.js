const parseInput = input => input.replace(/[[|\]|\s]/g, '').split(',')
const createMap = input => input.reduce((map, resource) => map.set(resource, (map.get(resource) || 0) + 1), new Map())
const useResource = (map, resource) => {
  const matches = [...map].filter(([key]) => key.indexOf(resource) > -1)
  if (!matches.length) return false
  const [key, val] = matches.reduce((smallest, [key, val]) => key.length < smallest[0].length ? [key, val] : smallest)
  const newMap = map.set(key, val - 1)
  return new Map([...newMap].filter(([_, v]) => v))
}
const canBuild = (map, input) => input.split('').reduce((m, t) =>  m ? useResource(m, t) : m, map)
const make = str => {
  const [_, myResources, build] = /^Cards \[(.+)\]\. Can you make (.+)\?$/.exec(str.replace('\n', ''))
  const resources = parseInput(myResources)
  const map = createMap(resources)
  const result = canBuild(new Map(map), build)
  if (result) {
    const solution = [...result].reduce((m, [key, value]) => {
      return m.set(key, m.get(key) - value)
    }, map)
    console.log('Used resources:', solution)
  } else console.log(`uCannot make ${str}`) 
}

const NS_PER_SEC = 1e9
const time = process.hrtime()
make('Cards [A/B/D/E, A/B/E/F/G, A/D, A/D/E, A/D/E, B/C/D/G, B/C/E, B/C/E/F, B/C/E/F, B/D/E, B/D/E, B/E/F, C/D/F, C/E, C/E/F/G, C/F, C/F, D/E/F/G, D/F, E/G]. Can you make AABCCCCCCDDDEEEEFFGG?')
const diff = process.hrtime(time)
console.log(`Ran in ${diff[0] * NS_PER_SEC + diff[1] / 1000000 } ms`)

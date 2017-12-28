const EventEmitter = require('events')

class Packet {
  constructor(message) {
    const tokens = this.tokenize(message)
    this.id = tokens[0]
    this.mid = tokens[1]
    this.max = tokens[2]
    this.message = tokens[3]
    this.raw = message
  }

  tokenize(packet) { return this.split(packet, 3) }

  split(packet, limit) {
    const arr = packet.split(/\s+/)
    const result = arr.splice(0, limit)
    return result.concat(arr.join(' '))
  }

  toString() { return this.raw }
}

class Assembler extends EventEmitter {
  constructor() {
    super()
    this.messages = {}
  }

  add(message) {
    const packet = new Packet(message)
    if (!this.messages[packet.id]) this.messages[packet.id] = { max: packet.max, packets: [] }
    this.messages[packet.id].packets = this.messages[packet.id].packets.concat(packet)
    this.emitIfCompleted(packet.id)
  }

  emitIfCompleted(pid) {
    if(this.messages[pid].packets.length == this.messages[pid].max) {
      this.messages[pid].packets.sort((a, b) => a.mid - b.mid)
      this.emit('completed', this.messages[pid])
      delete this.messages[pid]
    }
  }
}


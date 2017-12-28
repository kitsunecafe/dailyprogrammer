// https://www.reddit.com/r/dailyprogrammer/comments/7jzy8k/20171215_challenge_344_hard_write_a_web_client/

    const net = require('net')

    function parseURL(url) {
      const re = /(http(s)?:\/\/)?(?:w{3}\.)?([a-zA-Z0-9\-]*(?:\.[a-zA-Z0-9]+))(?::([0-9]+))?(\/[a-zA-Z0-9\-%]*\??(.*)?)?/gi.exec(url)
      return {
        protocol: re[1],
        hostname: re[3],
        port: Number(re[4]) || (re[2] ? 443 : 80),
        path: re[5] || '/',
        query: re[6]
      }
    }

    function generateHeaderObject(target, method, options = {}) {
      const defaultHeaders = {
        'Host': target.hostname,
        'Connection': 'close'
      }

      const data = options.data || ''
      const methods = {
        'POST': options => Object.assign({}, defaultHeaders, {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': data.length
        }, options.headers),
        default: options => Object.assign({}, defaultHeaders, options.headers)
      }

      return methods.hasOwnProperty(method) ? methods[method](options) : methods.default(options)
    }

    function generateHeader(target, method = 'GET', options = {}) {
      const headers = generateHeaderObject(target, method, options)
      const headerString = Object.entries(headers).reduce(
        (prev, cur) => prev + `${cur[0]}: ${cur[1]}\r\n`,
        `${method} ${target.path} HTTP/1.1\r\n`
      )
      
      return headerString + (options.data ? '\r\n' + options.data : '') + '\r\n'
    }

    function request(url, method, options = {}) {
      const conn = parseURL(url)
      const header = generateHeader(conn, method, options)
      const client = net.Socket()
      client.connect(conn.port, conn.hostname)
      client.write(header)
      client.end()


      client.on('data', c => console.log(c.toString()))
      client.on('error', c => console.error(c))
      client.on('end', () => console.log('Disconnected.'))
    }

const tests = [
  // GET
  { t: 'http://www.httpbin.org/anything', m: 'GET' },
  // POST without data
  { t: 'http://www.httpbin.org/post', m: 'POST' },
  // POST with data
  { t: 'http://www.httpbin.org/post', m: 'POST', d: { data: 'test=data' } },
  // POST with custom header
  {
    t: 'http://www.httpbin.org/post',
    m: 'POST', 
    d: {
      data: 'test=data',
      headers: { 'Content-Type': 'application/json', 'X-Fake-Header': 'test' }
    }
  }
]

const r = tests.map(test => request(test.t, test.m, test.d))

// console.log(r)
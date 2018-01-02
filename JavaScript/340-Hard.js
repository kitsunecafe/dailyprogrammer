'use strict'
// https://www.reddit.com/r/dailyprogrammer/comments/7dlaeq/20171117_challenge_340_hard_write_a_web_crawler/

/*
  Your crawler MUST support the following features:

    HTTP/1.1 client behaviors
    GET requests are the only method you must support
    Parse all links presented in HTML - anchors, images, scripts, etc
    Take at least two options - a starting (seed) URL and a maximum depth to recurse to (e.g. "1" would be fetch the HTML page and all resources like images and script associated with it but don't visit any outgoing anchor links; a depth of "2" would visit the anchor links found on that first page only, etc ...)
    Do not visit the same link more than once per session

*/

const Path = require('path')
const Parser = require('parse5')
const http = require('http')
const { URL } = require('url')

class Bot {
  constructor(url) {
    this.url = url
  }

  _request({ hostname, port, pathname: path }) {
    return new Promise((resolve, reject) => {
      http.get({ hostname, port, path, agent: false }, res => {
        let body = ''
        
        res.on('error', err => reject(err))
        res.on('data', chunk => { body += chunk })
        res.on('end', () => resolve(body))
      })
    })
  }
}

class Exclusions extends Bot {
  constructor(url) {
    super(url)
  }

  
}

class Spider extends Bot {
  constructor(url) {
    super(url)
    this.getExclusions = this._getExclusions()
    this.getExclusions.then(console.log)
  }

  _getMyExclusions(rules) {
    const uaStart = rules.search(/user\-agent:\ ?\*/gi)
    const uaNext = rules.toLowerCase().indexOf('user-agent', uaStart + 1)
    const uaEnd = uaNext === -1 ? rules.length : uaNext
    
    return rules.substring(uaStart, uaEnd)
  }

  _getExclusions(url) {
    const exclusionsRequest = this._request(new URL(Path.join(this.baseUrl, '/robots.txt')))
    return exclusionsRequest.then(rules => {
      const formattedRules = this._getMyExclusions(rules)
        .replace(/#.*$/gm, '') // Remove comments
        .split('\n')           // Split each line
        .map(x => x.trim())    // Remove whitespace
        .filter(x => x)        // Remove excess newlines

      const disallowed = formattedRules.filter(line => line.split(/:\ ?/)[0].toLowerCase() === 'disallow')
    })
  }
  
  _isLink(str) { return str.name == 'src' || str.name == 'href' }

  _extract(node, attrs = node.attrs || [], children = node.childNodes || []) {
    const newUrls = attrs.reduce((prev, cur) => this._isLink(cur) ? prev.concat(cur.value) : prev, [])
    return children.reduce((prev, cur) => prev.concat(this._extract(cur)), newUrls)
  }

  crawl(options = {}) {
    const defaultOpts = {
      depth: 1,
      page: '/',
      ignore: []
    }

    const opts = Object.assign({}, defaultOpts, options)
    
    if (!opts.depth || opts.ignore.includes(opts.page)) return Promise.resolve({})

    const thisPage = new URL(Path.join(this.baseUrl, opts.page))
    return this._request(thisPage)
      .then(Parser.parse)
      .then(html => this._extract(html))
      .then(links => {
        const childRequests = links.map(link =>
          this.crawl({ depth: opts.depth - 1, page: link, ignore: opts.ignore.concat(opts.page) })
        )
        
        return Promise.all(childRequests).then(children =>
          children.reduce((prev, cur) =>
            Object.assign({}, prev, cur),
            { [thisPage.pathname]: links }
          )
        )
      })
      .catch(console.error)
  }
}

const crawl = new Spider('http://localhost:8080').crawl({ depth: 4 })
crawl.then(results => console.log('Results', results))

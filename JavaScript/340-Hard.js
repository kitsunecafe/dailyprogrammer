'use strict'
// https://www.reddit.com/r/dailyprogrammer/comments/7dlaeq/20171117_challenge_340_hard_write_a_web_crawler/

const Path = require('path')
const Parser = require('parse5')
const http = require('http')
const { URL } = require('url')

class HTTPRequest {
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

class Exclusions extends HTTPRequest {
  constructor(url) {
    super(url)

    this.rules = this._request(new URL(this.url)).then(this._parse)
    this.allowed = this.rules.then(file => this.getField(file, 'allow'))
    this.disallowed = this.rules.then(file => this.getField(file, 'disallow'))
    this.delay = this.rules.then(file => parseInt(this.getField(file, 'crawl-delay', 0), 10))
  }

  _parse(file) {
    const uaStart = file.search(/user\-agent:\ ?\*/gi)
    const uaNext = file.toLowerCase().indexOf('user-agent', uaStart + 1)
    const uaEnd = uaNext === -1 ? file.length : uaNext

    return file.substring(uaStart, uaEnd)
      .replace(/#.*$/gm, '') // Remove comments
      .split('\n')           // Split each line
      .map(x => x.trim())    // Remove whitespace
      .filter(x => x)        // Remove excess newlines
  }

  getField(rules, field, defaultValue) {
    const result = rules.filter(line => new RegExp(`^${field}:\ +?`, 'i').test(line))
    .map(line => line.split(/:\ ?/)[1])

    return !result.length && defaultValue != null ? defaultValue : result
  }

  isAllowed(path) {
    return Promise.all([this.allowed, this.disallowed])
      .then(([allowed, disallowed]) =>
        !disallowed.some(rule => rule.indexOf(path) > -1) || allowed.indexOf(path) > -1
      )
  }
}

class Spider extends HTTPRequest {
  constructor(url) {
    super(url)

    this.exclusions = new Exclusions(Path.join(url, 'robots.txt'))
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
      ignore: [],
      delay: 0
    }

    const opts = Object.assign({}, defaultOpts, options)
    
    if (!opts.depth || opts.ignore.includes(opts.page)) return Promise.resolve({})

    const thisPage = new URL(Path.join(this.url, opts.page))
    const request = new Promise((resolve, reject) => setTimeout(() => resolve(this._request(thisPage)), opts.delay * 1000))
    return request
      .then(Parser.parse)
      .then(html => this._extract(html))
      .then(links => {
        const childRequests = links.map(link => {
          return Promise.all([this.exclusions.isAllowed(link), this.exclusions.delay])
            .then(([isAllowed, delay]) =>
              isAllowed ? this.crawl({ depth: opts.depth - 1, page: link, ignore: opts.ignore.concat(opts.page), delay }) : null
            )
        })
        
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

const crawl = new Spider('http://httpbin.org').crawl({ depth: 4 })
crawl.then(results => console.log('Results', results))

// const bot = new Exclusions('http://localhost:8080/robots.txt')
// bot.isAllowed('/foo/bar').then(console.log)
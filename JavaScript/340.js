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

const Parser = require('parse5')
const http = require('http')
const { URL } = require('url')

class Spider {
  request(url) {
    return new Promise((resolve, reject) => {
      const { hostname, port, pathname } = url

      http.get({
        hostname,
        port,
        path: pathname,
        agent: false  // create a new agent just for this one request
      }, res => {
        let body = ''
        
        res.on('error', err => reject(err))
        res.on('data', chunk => { body += chunk })
        res.on('end', () => {
          resolve(body)
        })
      })
    })
  }

  crawl(_url, depth = 1) {
    const baseUrl = new URL(_url)
    
    async recurse(url, dep) {
      if (!dep) return
      return this.request(url).then(req => this.extract(req))
    }
  }
  
  isLink(str) { return str.name == 'src' || str.name == 'href' }

  extract(node, attrs = node.attrs || [], children = node.childNodes || []) {
    const newUrls = attrs.reduce((prev, cur) => this.isLink(cur) ? prev.concat(cur.value) : prev, [])
    return children.reduce((prev, cur) => prev.concat(this.extract(cur)), newUrls)
  }
}

const result = new Spider().crawl('http://localhost:8080')

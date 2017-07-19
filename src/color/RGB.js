//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

import { Namespace } from '@takram/planck-core'

import Primaries from '../color/Primaries'

const internal = Namespace('RGB')

export default class RGB {
  constructor(...args) {
    const rest = [...args]
    const scope = internal(this)
    if (args[args.length - 1] instanceof Primaries) {
      scope.primaries = rest.pop()
    } else {
      scope.primaries = Primaries.sRGB
    }
    if (rest.length === 0) {
      this.r = 0
      this.g = 0
      this.b = 0
    } else if (rest.length === 1) {
      const [value] = rest
      this.r = value || 0
      this.g = value || 0
      this.b = value || 0
    } else {
      const [r, g, b] = rest
      this.r = r || 0
      this.g = g || 0
      this.b = b || 0
    }
  }

  get red() {
    return this.r
  }

  set red(value) {
    this.r = value
  }

  get green() {
    return this.g
  }

  set green(value) {
    this.g = value
  }

  get blue() {
    return this.b
  }

  set blue(value) {
    this.b = value
  }

  get primaries() {
    const scope = internal(this)
    return scope.primaries
  }

  toArray() {
    return [this.r, this.g, this.b]
  }

  toString() {
    return `${this.constructor.name} { ${[
      'r',
      'g',
      'b',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

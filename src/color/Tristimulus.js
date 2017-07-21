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

const internal = Namespace('Tristimulus')

export default class Tristimulus {
  constructor(chromaticity, luminance = 1) {
    const scope = internal(this)
    const { x, y } = chromaticity
    scope.y = luminance
    scope.x = (luminance / y) * x
    scope.z = (luminance / y) * (1 - x - y)
  }

  get x() {
    const scope = internal(this)
    return scope.x
  }

  get y() {
    const scope = internal(this)
    return scope.y
  }

  get z() {
    const scope = internal(this)
    return scope.z
  }

  equals(other) {
    return other.x === this.x && other.y === this.y && other.z === this.z
  }

  toArray() {
    return [this.x, this.y, this.z]
  }

  toString() {
    return `${this.constructor.name} { ${[
      'x',
      'y',
      'z',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

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

import Chromaticity from '../color/Chromaticity'

const internal = Namespace('Illuminant')

export default class Illuminant {
  constructor(chromaticity) {
    const scope = internal(this)
    scope.chromaticity = chromaticity
  }

  get x() {
    const scope = internal(this)
    return scope.chromaticity.x
  }

  get y() {
    const scope = internal(this)
    return scope.chromaticity.y
  }

  get z() {
    const scope = internal(this)
    return scope.chromaticity.z
  }

  get chromaticity() {
    const scope = internal(this)
    return chromaticity
  }

  toArray() {
    return [this.x, this.y, this.z]
  }

  toString() {
    return `${this.constructor.name} { ${[
      'chromaticity',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

Illuminant.D50 = new Illuminant(new Chromaticity(0.3457, 0.3585))
Illuminant.D65 = new Illuminant(new Chromaticity(0.3127, 0.3290))

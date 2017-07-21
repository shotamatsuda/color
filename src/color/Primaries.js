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
import Illuminant from '../color/Illuminant'

const internal = Namespace('Primaries')

export default class Primaries {
  constructor(r, g, b, w) {
    const scope = internal(this)
    scope.r = r
    scope.g = g
    scope.b = b
    scope.w = w
  }

  get r() {
    const scope = internal(this)
    return scope.r
  }

  get g() {
    const scope = internal(this)
    return scope.g
  }

  get b() {
    const scope = internal(this)
    return scope.b
  }

  get w() {
    const scope = internal(this)
    return scope.w
  }

  get red() {
    return this.r
  }

  get green() {
    return this.g
  }

  get blue() {
    return this.b
  }

  get white() {
    return this.w
  }

  toArray() {
    return [this.r, this.g, this.b, this.w]
  }

  toString() {
    return `${this.constructor.name} { ${[
      'r',
      'g',
      'b',
      'w',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

Object.assign(Primaries, {
  // Specification of sRGB.
  // http://www.color.org/srgb.pdf
  // Retrieved 2016.
  sRGB: new Primaries(
    new Chromaticity(0.64, 0.33),
    new Chromaticity(0.30, 0.60),
    new Chromaticity(0.15, 0.06),
    new Illuminant(0.3127, 0.3290),
  ),

  // Adobe RGB (1998) Color Image Encoding. Version 2005-05. May 2005.
  // https://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf
  // Retrieved 2016.
  AdobeRGB: new Primaries(
    new Chromaticity(0.6400, 0.3300),
    new Chromaticity(0.2100, 0.7100),
    new Chromaticity(0.1500, 0.0600),
    new Illuminant(0.3127, 0.3290),
  ),
})

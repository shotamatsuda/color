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

import Illuminant from '../color/Illuminant'
import Lab from '../color/Lab'
import Primaries from '../color/Primaries'

const internal = Namespace('LCh')

export default class LCh {
  constructor(...args) {
    const rest = [...args]
    const scope = internal(this)
    if (args[args.length - 1] instanceof Illuminant) {
      scope.illuminant = rest.pop()
    } else {
      scope.illuminant = Illuminant.D50
    }
    if (rest.length === 0) {
      this.l = 0
      this.c = 0
      this.h = 0
    } else {
      const [l, c, h] = rest
      this.l = l || 0
      this.c = c || 0
      this.h = h || 0
    }
  }

  get lightness() {
    return this.l
  }

  set lightness(value) {
    this.l = value
  }

  get chroma() {
    return this.c
  }

  set chroma(value) {
    this.c = value
  }

  get hue() {
    return this.h
  }

  set hue(value) {
    this.h = value
  }

  get illuminant() {
    const scope = internal(this)
    return scope.illuminant
  }

  static fromRGB(rgb, illuminant = Illuminant.D50) {
    return this.fromLab(Lab.fromRGB(rgb, illuminant))
  }

  toRGB(primaries = Primaries.sRGB) {
    return this.toLab().toRGB(primaries)
  }

  static fromLab(lab) {
    const { l, a, b, illuminant } = lab
    return new this(
      l,
      Math.sqrt(a * a + b * b),
      Math.atan2(b, a),
      illuminant,
    )
  }

  toLab() {
    const { l, c, h, illuminant } = this
    return new Lab(
      l,
      c * Math.cos(h),
      c * Math.sin(h),
      illuminant,
    )
  }

  toArray() {
    return [this.l, this.c, this.h]
  }

  toString() {
    return `${this.constructor.name} { ${[
      'l',
      'c',
      'h',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

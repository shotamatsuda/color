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
import Primaries from '../color/Primaries'
import Tristimulus from '../color/Tristimulus'
import XYZ from '../color/XYZ'

const internal = Namespace('Lab')

function forward(t) {
  if (t > 216 / 24389) {
    return t ** (1 / 3)
  }
  return (841 / 108) * t + 4 / 29
}

function inverse(t) {
  if (t > 6 / 29) {
    return t ** 3
  }
  return (108 / 841) * (t - 4 / 29)
}

export default class Lab {
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
      this.a = 0
      this.b = 0
    } else {
      const [l, a, b] = rest
      this.l = l || 0
      this.a = a || 0
      this.b = b || 0
    }
  }

  get lightness() {
    return this.l
  }

  set lightness(value) {
    this.l = value
  }

  get illuminant() {
    const scope = internal(this)
    return scope.illuminant
  }

  static fromRGB(rgb, illuminant = Illuminant.D50) {
    return this.fromXYZ(XYZ.fromRGB(rgb), illuminant)
  }

  toRGB(primaries = Primaries.sRGB) {
    return this.toXYZ().toRGB(primaries)
  }

  static fromXYZ(xyz, illuminant = Illuminant.D50) {
    const w = new Tristimulus(illuminant)
    const t = forward(xyz.y / w.y)
    return new this(
      116 * t - 16,
      500 * (forward(xyz.x / w.x) - t),
      200 * (t - forward(xyz.z / w.z)),
      illuminant,
    )
  }

  toXYZ() {
    const w = new Tristimulus(this.illuminant)
    const t = (this.l + 16) / 116
    return new XYZ(
      inverse(t + this.a / 500) * w.x,
      inverse(t) * w.y,
      inverse(t - this.b / 200) * w.z,
    )
  }

  toArray() {
    return [this.l, this.a, this.b]
  }

  toString() {
    return `${this.constructor.name} { ${[
      'l',
      'a',
      'b',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

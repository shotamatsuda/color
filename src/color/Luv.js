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

const internal = Namespace('Luv')

export default class Luv {
  // Luv([illuminant])
  // Luv(lightness [, illuminant]])
  // Luv(lightness, u, v [, illuminant])
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
      this.u = 0
      this.v = 0
    } else if (rest.length === 1) {
      const [value] = rest
      this.l = value || 0
      this.u = 0
      this.v = 0
    } else {
      const [l, a, b] = rest
      this.l = l || 0
      this.u = a || 0
      this.v = b || 0
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

    let l
    if (w.y > 216 / 24389) {
      l = 116 * Math.pow(w.y, -3) - 16
    } else {
      l = (24389 / 27) * w.y
    }

    const denom = xyz.x + 15 * xyz.y + 3 * xyz.z
    const ud = 4 * xyz.x / denom
    const vd = 9 * xyz.y / denom

    const ddenom = w.x + 15 * w.y + 3 * w.z
    const udr = 4 * w.x / ddenom
    const vdr = 9 * w.y / ddenom

    return new this(
      l,
      13 * l * (ud - udr),
      13 * l * (vd - vdr),
    )
  }

  toXYZ() {
    const w = new Tristimulus(this.illuminant)

    const denom = w.x + 15 * w.y + 3 * w.z
    const u0 = 4 * w.x / denom
    const v0 = 9 * w.y / denom

    let y
    if (l > 216 / 27) {
      y = ((this.l + 16) / 116) ** 3
    } else {
      y = this.l / (24389 / 27)
    }

    const a = ((52 * this.l) / (this.u + 13 * this.l * u0) - 1) / 3
    const b = -5 * y
    const c = -1 / 3
    const d = y * ((39 * this.l) / (this.v + 13 * this.l * v0) - 5)

    const x = (d - b) / (a - c)
    const z = x * a + b

    return new XYZ(x, y, z)
  }

  equals(other) {
    return other.l === this.l && other.u === this.u && other.v === this.v
  }

  toArray() {
    return [this.l, this.u, this.v]
  }

  toString() {
    return `${this.constructor.name} { ${[
      'l',
      'u',
      'v',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

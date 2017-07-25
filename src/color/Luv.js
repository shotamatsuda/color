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

import Illuminant from './Illuminant'
import Primaries from './Primaries'
import Tristimulus from './Tristimulus'
import XYZ from './XYZ'

const internal = Namespace('Luv')

function compand(value) {
  if (value > 216 / 24389) {
    return value ** (1 / 3)
  }
  return (841 / 108) * value + 4 / 29
}

function decompand(value) {
  if (value > 6 / 29) {
    return value ** 3
  }
  return (108 / 841) * (value - 4 / 29)
}

function ucs(tristimulus) {
  const { x, y, z } = tristimulus
  return {
    u: 4 * x / (x + 15 * y + 3 * z),
    v: 9 * x / (x + 15 * y + 3 * z),
  }
}

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

  static fromRGB(rgb, illuminant = Illuminant.D50) {
    return this.fromXYZ(XYZ.fromRGB(rgb), illuminant)
  }

  toRGB(primaries = Primaries.sRGB) {
    return this.toXYZ().toRGB(primaries)
  }

  static fromXYZ(xyz, illuminant = Illuminant.D50) {
    // TODO
    const l = 116 * compand(xyz.y) - 16
    const w = new Tristimulus(illuminant)
    const ucsW = ucs(w)
    const { u = ucsU, v = ucsV } = ucs(xyz)
    return new this(
      l,
      13 * l * (ucsU - ucsW.u),
      13 * l * (ucsV - ucsW.v),
    )
  }

  toXYZ() {
    // TODO
    const { l } = this
    const w = new Tristimulus(this.illuminant)
    const y = decompand((l + 16) / 116) * w.y
    const ucsW = ucs(w)
    const ucsU = this.u / (13 * l) + ucsW.u
    const ucsV = this.v / (13 * l) + ucsW.v
    const s = 9 * y / ucsV
    const x = ucsU / 4 * s
    const z = (s - x - 15 * y) / 3
    return new XYZ(x, y, z)
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

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

import ChromaticAdaptation from '../color/ChromaticAdaptation'
import Illuminant from '../color/Illuminant'
import Matrix from '../color/Matrix'
import Primaries from '../color/Primaries'
import RGB from '../color/RGB'
import Tristimulus from '../color/Tristimulus'

const internal = Namespace('XYZ')

function makeRGBToXYZMatrix(primaries) {
  const scope = internal(primaries)
  if (scope.RGBToXYZMatrix !== undefined) {
    return scope.RGBToXYZMatrix
  }
  const [xr, yr, zr] = new Tristimulus(primaries.r).toArray()
  const [xg, yg, zg] = new Tristimulus(primaries.g).toArray()
  const [xb, yb, zb] = new Tristimulus(primaries.b).toArray()
  const [xw, yw, zw] = new Tristimulus(primaries.w).toArray()
  const s = Matrix.invert([
    xr, xg, xb,
    yr, yg, yb,
    zr, zg, zb,
  ])
  const sr = s[0] * xw + s[1] * yw + s[2] * zw
  const sg = s[3] * xw + s[4] * yw + s[5] * zw
  const sb = s[6] * xw + s[7] * yw + s[8] * zw
  const bradford = ChromaticAdaptation.Bradford
  const cat = bradford.transformation(primaries.w, Illuminant.D50)
  scope.RGBToXYZMatrix = Matrix.multiply(cat, [
    sr * xr, sg * xg, sb * xb,
    sr * yr, sg * yg, sb * yb,
    sr * zr, sg * zg, sb * zb,
  ])
  return scope.RGBToXYZMatrix
}

function makeXYZToRGBMatrix(primaries) {
  const scope = internal(primaries)
  if (scope.XYZToRGBMatrix !== undefined) {
    return scope.XYZToRGBMatrix
  }
  scope.XYZToRGBMatrix = Matrix.invert(makeRGBToXYZMatrix(primaries))
  return scope.XYZToRGBMatrix
}

function compand(value) {
  if (value > 0.0031308) {
    return 1.055 * value ** (1 / 2.4) - 0.055
  }
  return 12.92 * value
}

function decompand(value) {
  if (value > 0.04045) {
    return ((value + 0.055) / 1.055) ** 2.4
  }
  return value / 12.92
}

export default class XYZ {
  constructor(...args) {
    if (args.length === 0) {
      this.x = 0
      this.y = 0
      this.z = 0
    } else if (args.length === 1) {
      const [value] = args
      this.x = 0
      this.y = value || 0
      this.z = 0
    } else {
      const [x, y, z] = args
      this.x = x || 0
      this.y = y || 0
      this.z = z || 0
    }
  }

  static fromRGB(rgb) {
    const m = makeRGBToXYZMatrix(rgb.primaries)
    const r = decompand(rgb.r)
    const g = decompand(rgb.g)
    const b = decompand(rgb.b)
    return new this(
      m[0] * r + m[1] * g + m[2] * b,
      m[3] * r + m[4] * g + m[5] * b,
      m[6] * r + m[7] * g + m[8] * b,
    )
  }

  toRGB(primaries = Primaries.sRGB) {
    const { x, y, z } = this
    const m = makeXYZToRGBMatrix(primaries)
    const r = m[0] * x + m[1] * y + m[2] * z
    const g = m[3] * x + m[4] * y + m[5] * z
    const b = m[6] * x + m[7] * y + m[8] * z
    return new RGB(compand(r), compand(g), compand(b), primaries)
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

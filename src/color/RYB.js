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

import Primaries from '../color/Primaries'
import RGB from '../color/RGB'

function convertRGBToRYB(rgb) {
  let [r, g, b] = rgb
  const white = Math.min(r, g, b)
  r -= white
  g -= white
  b -= white
  const maxG = Math.max(r, g, b)
  let y = Math.min(r, g)
  r -= y
  g -= y
  if (b !== 0 && g !== 0) {
    b /= 2
    g /= 2
  }
  y += g
  b += g
  const maxY = Math.max(r, y, b)
  if (maxY !== 0) {
    const n = maxG / maxY
    r *= n
    y *= n
    b *= n
  }
  r += white
  y += white
  b += white
  return [r, y, b]
}

function convertRYBToRGB(ryb) {
  let [r, y, b] = ryb
  const white = Math.min(r, y, b)
  r -= white
  y -= white
  b -= white
  const maxY = Math.max(r, y, b)
  let g = Math.min(y, b)
  y -= g
  b -= g
  if (b !== 0 && g !== 0) {
    b *= 2
    g *= 2
  }
  r += y
  g += y
  const maxG = Math.max(r, g, b)
  if (maxG !== 0) {
    const n = maxY / maxG
    r *= n
    g *= n
    b *= n
  }
  r += white
  g += white
  b += white
  return [r, g, b]
}

export default class RYB {
  constructor(...args) {
    if (args.length === 0) {
      this.r = 0
      this.y = 0
      this.b = 0
    } else if (args.length === 1) {
      const [value] = args
      this.r = value || 0
      this.y = value || 0
      this.b = value || 0
    } else {
      const [r, y, b] = args
      this.r = r || 0
      this.y = y || 0
      this.b = b || 0
    }
  }

  get red() {
    return this.r
  }

  set red(value) {
    this.r = value
  }

  get yellow() {
    return this.y
  }

  set yellow(value) {
    this.y = value
  }

  get blue() {
    return this.b
  }

  set blue(value) {
    this.b = value
  }

  static fromRGB(rgb) {
    return new this(...convertRGBToRYB(rgb.toArray()))
  }

  toRGB(primaries = Primaries.sRGB) {
    return new RGB(...convertRYBToRGB(this.toArray()), primaries)
  }

  toArray() {
    return [this.r, this.y, this.b]
  }

  toString() {
    return `${this.constructor.name} { ${[
      'r',
      'y',
      'b',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

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

import Primaries from './Primaries'
import RGB from './RGB'

function convertRGBToHSL(rgb) {
  const [r, g, b] = rgb
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h
  let s
  const l = (max + min) / 2
  if (max === min) {
    h = 0
    s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) {
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    } else if (max === g) {
      h = ((b - r) / d + 2) / 6
    } else {
      h = ((r - g) / d + 4) / 6
    }
  }
  return [h, s, l]
}

function convertHSLToRGB(hsl) {
  const [h, s, l] = hsl
  let r
  let g
  let b
  if (s === 0) {
    r = l
    g = l
    b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    const f = s => {
      let t = s
      if (t < 0) {
        t += 1
      }
      if (t > 1) {
        t -= 1
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t
      }
      if (t < 1 / 2) {
        return q
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6
      }
      return p
    }
    r = f(h + 1 / 3)
    g = f(h)
    b = f(h - 1 / 3)
  }
  return [r, g, b]
}

export default class HSL {
  // HSL([lightness])
  // HSL(hue, saturation, lightness)
  constructor(...args) {
    if (args.length === 0) {
      this.h = 0
      this.s = 0
      this.l = 0
    } else if (args.length === 1) {
      const [value] = args
      this.h = 0
      this.s = 0
      this.l = value || 0
    } else {
      const [h, s, l] = args
      this.h = h || 0
      this.s = s || 0
      this.l = l || 0
    }
  }

  static fromRGB(rgb) {
    return new this(...convertRGBToHSL(rgb.toArray()))
  }

  toRGB(primaries = Primaries.sRGB) {
    return new RGB(...convertHSLToRGB(this.toArray()), primaries)
  }

  get hue() {
    return this.h
  }

  set hue(value) {
    this.h = value
  }

  get saturation() {
    return this.s
  }

  set saturation(value) {
    this.s = value
  }

  get lightness() {
    return this.l
  }

  set lightness(value) {
    this.l = value
  }

  equals(other) {
    return other.h === this.h && other.s === this.s && other.l === this.l
  }

  toArray() {
    return [this.h, this.s, this.l]
  }

  toString() {
    return `${this.constructor.name} { ${[
      'h',
      's',
      'l',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

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

function convertRGBToHSV(rgb) {
  const [r, g, b] = rgb
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  const s = max === 0 ? 0 : d / max
  const v = max
  let h
  if (max === min) {
    h = 0
  } else if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  } else if (max === g) {
    h = ((b - r) / d + 2) / 6
  } else {
    h = ((r - g) / d + 4) / 6
  }
  return [h, s, v]
}

function convertHSVToRGB(hsv) {
  const [h, s, v] = hsv
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0:
      return [v, t, p]
    case 1:
      return [q, v, p]
    case 2:
      return [p, v, t]
    case 3:
      return [p, q, v]
    case 4:
      return [t, p, v]
    case 5:
      return [v, p, q]
    default:
      break
  }
  return [0, 0, 0]
}

export default class HSV {
  // HSV([value])
  // HSV(hue, saturation, value)
  constructor(...args) {
    if (args.length === 0) {
      this.h = 0
      this.s = 0
      this.v = 0
    } else if (args.length === 1) {
      const [value] = args
      this.h = 0
      this.s = 0
      this.v = value || 0
    } else {
      const [h, s, v] = args
      this.h = h || 0
      this.s = s || 0
      this.v = v || 0
    }
  }

  static fromRGB(rgb) {
    return new this(...convertRGBToHSV(rgb.toArray()))
  }

  toRGB(primaries = Primaries.sRGB) {
    return new RGB(...convertHSVToRGB(this.toArray()), primaries)
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

  get value() {
    return this.v
  }

  set value(value) {
    this.v = value
  }

  equals(other) {
    return other.h === this.h && other.s === this.s && other.v === this.v
  }

  toArray() {
    return [this.h, this.s, this.v]
  }

  toString() {
    return `${this.constructor.name} { ${[
      'h',
      's',
      'v',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

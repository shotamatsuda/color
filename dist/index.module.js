import { Namespace } from '@takram/planck-core';

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

const internal = Namespace('Chromaticity');

class Chromaticity {
  constructor(x, y) {
    const scope = internal(this);
    scope.x = x;
    scope.y = y;
  }

  get x() {
    const scope = internal(this);
    return scope.x;
  }

  get y() {
    const scope = internal(this);
    return scope.y;
  }

  get z() {
    const scope = internal(this);
    return 1 - scope.x - scope.y;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  toString() {
    return `${this.constructor.name} { ${['x', 'y', 'z'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

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

const internal$2 = Namespace('Illuminant');

class Illuminant {
  constructor(chromaticity) {
    const scope = internal$2(this);
    scope.chromaticity = chromaticity;
  }

  get x() {
    const scope = internal$2(this);
    return scope.chromaticity.x;
  }

  get y() {
    const scope = internal$2(this);
    return scope.chromaticity.y;
  }

  get z() {
    const scope = internal$2(this);
    return scope.chromaticity.z;
  }

  get chromaticity() {
    const scope = internal$2(this);
    return scope.chromaticity;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  toString() {
    return `${this.constructor.name} { ${['chromaticity'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

Illuminant.D50 = new Illuminant(new Chromaticity(0.3457, 0.3585));
Illuminant.D65 = new Illuminant(new Chromaticity(0.3127, 0.3290));

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

const internal$1 = Namespace('Primaries');

class Primaries {
  constructor(r, g, b, w) {
    const scope = internal$1(this);
    scope.r = r;
    scope.g = g;
    scope.b = b;
    scope.w = w;
  }

  get r() {
    const scope = internal$1(this);
    return scope.r;
  }

  get g() {
    const scope = internal$1(this);
    return scope.g;
  }

  get b() {
    const scope = internal$1(this);
    return scope.b;
  }

  get w() {
    const scope = internal$1(this);
    return scope.w;
  }

  toArray() {
    return [this.r, this.g, this.b, this.w];
  }

  toString() {
    return `${this.constructor.name} { ${['r', 'g', 'b', 'w'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

Primaries.sRGB = new Primaries(new Chromaticity(0.64, 0.33), new Chromaticity(0.30, 0.60), new Chromaticity(0.15, 0.06), Illuminant.D65);

Primaries.AdobeRGB = new Primaries(new Chromaticity(0.64, 0.33), new Chromaticity(0.21, 0.71), new Chromaticity(0.15, 0.06), Illuminant.D65);

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

const internal$3 = Namespace('RGB');

class RGB {
  constructor(...args) {
    const rest = [...args];
    const scope = internal$3(this);
    if (args[args.length - 1] instanceof Primaries) {
      scope.primaries = rest.pop();
    } else {
      scope.primaries = Primaries.sRGB;
    }
    if (rest.length === 0) {
      this.r = 0;
      this.g = 0;
      this.b = 0;
    } else if (rest.length === 1) {
      const [value] = rest;
      this.r = value || 0;
      this.g = value || 0;
      this.b = value || 0;
    } else {
      const [r, g, b] = rest;
      this.r = r || 0;
      this.g = g || 0;
      this.b = b || 0;
    }
  }

  get red() {
    return this.r;
  }

  set red(value) {
    this.r = value;
  }

  get green() {
    return this.g;
  }

  set green(value) {
    this.g = value;
  }

  get blue() {
    return this.b;
  }

  set blue(value) {
    this.b = value;
  }

  get primaries() {
    const scope = internal$3(this);
    return scope.primaries;
  }

  toArray() {
    return [this.r, this.g, this.b];
  }

  toString() {
    return `${this.constructor.name} { ${['r', 'g', 'b'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

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

function convertRGBToHSL(rgb) {
  const [r, g, b] = rgb;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;
  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) {
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / d + 2) / 6;
    } else {
      h = ((r - g) / d + 4) / 6;
    }
  }
  return [h, s, l];
}

function convertHSLToRGB(hsl) {
  const [h, s, l] = hsl;
  let r;
  let g;
  let b;
  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const f = s => {
      let t = s;
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };
    r = f(h + 1 / 3);
    g = f(h);
    b = f(h - 1 / 3);
  }
  return [r, g, b];
}

class HSL {
  constructor(...args) {
    if (args.length === 0) {
      this.h = 0;
      this.s = 0;
      this.l = 0;
    } else if (args.length === 1) {
      const [value] = args;
      this.h = 0;
      this.s = 0;
      this.l = value || 0;
    } else {
      const [h, s, l] = args;
      this.h = h || 0;
      this.s = s || 0;
      this.l = l || 0;
    }
  }

  get hue() {
    return this.h;
  }

  set hue(value) {
    this.h = value;
  }

  get saturation() {
    return this.s;
  }

  set saturation(value) {
    this.s = value;
  }

  get lightness() {
    return this.l;
  }

  set lightness(value) {
    this.l = value;
  }

  static fromRGB(rgb) {
    return new this(...convertRGBToHSL(rgb.toArray()));
  }

  toRGB(primaries = Primaries.sRGB) {
    return new RGB(...convertHSLToRGB(this.toArray()), primaries);
  }

  toArray() {
    return [this.h, this.s, this.l];
  }

  toString() {
    return `${this.constructor.name} { ${['h', 's', 'l'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

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

function convertRGBToHSV(rgb) {
  const [r, g, b] = rgb;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  let h;
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  } else if (max === g) {
    h = ((b - r) / d + 2) / 6;
  } else {
    h = ((r - g) / d + 4) / 6;
  }
  return [h, s, v];
}

function convertHSVToRGB(hsv) {
  const [h, s, v] = hsv;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
    default:
      break;
  }
  return [0, 0, 0];
}

class HSV {
  constructor(...args) {
    if (args.length === 0) {
      this.h = 0;
      this.s = 0;
      this.v = 0;
    } else if (args.length === 1) {
      const [value] = args;
      this.h = 0;
      this.s = 0;
      this.v = value || 0;
    } else {
      const [h, s, v] = args;
      this.h = h || 0;
      this.s = s || 0;
      this.v = v || 0;
    }
  }

  get hue() {
    return this.h;
  }

  set hue(value) {
    this.h = value;
  }

  get saturation() {
    return this.s;
  }

  set saturation(value) {
    this.s = value;
  }

  get value() {
    return this.v;
  }

  set value(value) {
    this.v = value;
  }

  static fromRGB(rgb) {
    return new this(...convertRGBToHSV(rgb.toArray()));
  }

  toRGB(primaries = Primaries.sRGB) {
    return new RGB(...convertHSVToRGB(this.toArray()), primaries);
  }

  toArray() {
    return [this.h, this.s, this.v];
  }

  toString() {
    return `${this.constructor.name} { ${['h', 's', 'v'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

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

const internal$5 = Namespace('Tristimulus');

class Tristimulus {
  constructor(chromaticity, luminance = 1) {
    const scope = internal$5(this);
    const { x, y } = chromaticity;
    scope.y = luminance;
    scope.x = luminance / y * x;
    scope.z = luminance / y * (1 - x - y);
  }

  get x() {
    const scope = internal$5(this);
    return scope.x;
  }

  get y() {
    const scope = internal$5(this);
    return scope.y;
  }

  get z() {
    const scope = internal$5(this);
    return scope.z;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  toString() {
    return `${this.constructor.name} { ${['x', 'y', 'z'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

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

const internal$6 = Namespace('XYZ');

function makeInverseMatrix(matrix) {
  const [a, b, c, d, e, f, g, h, i] = matrix;
  const p = e * i - f * h;
  const q = f * g - d * i;
  const r = d * h - e * g;
  const determinant = a * p + b * q + c * r;
  if (determinant === 0) {
    throw new Error();
  }
  return [p / determinant, (c * h - b * i) / determinant, (b * f - c * e) / determinant, q / determinant, (a * i - c * g) / determinant, (c * d - a * f) / determinant, r / determinant, (b * g - a * h) / determinant, (a * e - b * d) / determinant];
}

function makeRGBToXYZMatrix(primaries) {
  const scope = internal$6(primaries);
  if (scope.RGBToXYZMatrix !== undefined) {
    return scope.RGBToXYZMatrix;
  }
  const [xr, yr, zr] = new Tristimulus(primaries.r).toArray();
  const [xg, yg, zg] = new Tristimulus(primaries.g).toArray();
  const [xb, yb, zb] = new Tristimulus(primaries.b).toArray();
  const [xw, yw, zw] = new Tristimulus(primaries.w).toArray();
  const s = makeInverseMatrix([xr, xg, xb, yr, yg, yb, zr, zg, zb]);
  const sr = s[0] * xw + s[1] * yw + s[2] * zw;
  const sg = s[3] * xw + s[4] * yw + s[5] * zw;
  const sb = s[6] * xw + s[7] * yw + s[8] * zw;
  scope.RGBToXYZMatrix = [sr * xr, sg * xg, sb * xb, sr * yr, sg * yg, sb * yb, sr * zr, sg * zg, sb * zb];
  return scope.RGBToXYZMatrix;
}

function makeXYZToRGBMatrix(primaries) {
  const scope = internal$6(primaries);
  if (scope.XYZToRGBMatrix !== undefined) {
    return scope.XYZToRGBMatrix;
  }
  const m = makeRGBToXYZMatrix(primaries);
  scope.XYZToRGBMatrix = makeInverseMatrix(m);
  return scope.XYZToRGBMatrix;
}

function compand(value) {
  if (value > 0.0031308) {
    return 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
  }
  return 12.92 * value;
}

function decompand(value) {
  if (value > 0.04045) {
    return Math.pow((value + 0.055) / 1.055, 2.4);
  }
  return value / 12.92;
}

class XYZ {
  constructor(...args) {
    if (args.length === 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    } else if (args.length === 1) {
      const [value] = args;
      this.x = 0;
      this.y = value || 0;
      this.z = 0;
    } else {
      const [x, y, z] = args;
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }
  }

  static fromRGB(rgb) {
    const m = makeRGBToXYZMatrix(rgb.primaries);
    const r = decompand(rgb.r);
    const g = decompand(rgb.g);
    const b = decompand(rgb.b);
    return new this(m[0] * r + m[1] * g + m[2] * b, m[3] * r + m[4] * g + m[5] * b, m[6] * r + m[7] * g + m[8] * b);
  }

  toRGB(primaries = Primaries.sRGB) {
    const { x, y, z } = this;
    const m = makeXYZToRGBMatrix(primaries);
    const r = m[0] * x + m[1] * y + m[2] * z;
    const g = m[3] * x + m[4] * y + m[5] * z;
    const b = m[6] * x + m[7] * y + m[8] * z;
    return new RGB(compand(r), compand(g), compand(b), primaries);
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  toString() {
    return `${this.constructor.name} { ${['x', 'y', 'z'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

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

const internal$4 = Namespace('Lab');

function forward(t) {
  if (t > 216 / 24389) {
    return Math.pow(t, 1 / 3);
  }
  return 841 / 108 * t + 4 / 29;
}

function inverse(t) {
  if (t > 6 / 29) {
    return Math.pow(t, 3);
  }
  return 108 / 841 * (t - 4 / 29);
}

class Lab {
  constructor(...args) {
    const rest = [...args];
    const scope = internal$4(this);
    if (args[args.length - 1] instanceof Illuminant) {
      scope.illuminant = rest.pop();
    } else {
      scope.illuminant = Illuminant.D50;
    }
    if (rest.length === 0) {
      this.l = 0;
      this.a = 0;
      this.b = 0;
    } else if (rest.length === 1) {
      const [value] = rest;
      this.l = value || 0;
      this.a = 0;
      this.b = 0;
    } else {
      const [l, a, b] = rest;
      this.l = l || 0;
      this.a = a || 0;
      this.b = b || 0;
    }
  }

  get lightness() {
    return this.l;
  }

  set lightness(value) {
    this.l = value;
  }

  get illuminant() {
    const scope = internal$4(this);
    return scope.illuminant;
  }

  static fromRGB(rgb, illuminant = Illuminant.D50) {
    return this.fromXYZ(XYZ.fromRGB(rgb), illuminant);
  }

  toRGB(primaries = Primaries.sRGB) {
    return this.toXYZ().toRGB(primaries);
  }

  static fromXYZ(xyz, illuminant = Illuminant.D50) {
    const w = new Tristimulus(illuminant);
    const t = forward(xyz.y / w.y);
    return new this(116 * t - 16, 500 * (forward(xyz.x / w.x) - t), 200 * (t - forward(xyz.z / w.z)), illuminant);
  }

  toXYZ() {
    const w = new Tristimulus(this.illuminant);
    const t = (this.l + 16) / 116;
    return new XYZ(inverse(t + this.a / 500) * w.x, inverse(t) * w.y, inverse(t - this.b / 200) * w.z);
  }

  toArray() {
    return [this.l, this.a, this.b];
  }

  toString() {
    return `${this.constructor.name} { ${['l', 'a', 'b'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

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

const internal$7 = Namespace('LCh');

class LCh {
  constructor(...args) {
    const rest = [...args];
    const scope = internal$7(this);
    if (args[args.length - 1] instanceof Illuminant) {
      scope.illuminant = rest.pop();
    } else {
      scope.illuminant = Illuminant.D50;
    }
    if (rest.length === 0) {
      this.l = 0;
      this.c = 0;
      this.h = 0;
    } else if (rest.length === 1) {
      const [value] = rest;
      this.l = value || 0;
      this.c = 0;
      this.h = 0;
    } else {
      const [l, c, h] = rest;
      this.l = l || 0;
      this.c = c || 0;
      this.h = h || 0;
    }
  }

  get lightness() {
    return this.l;
  }

  set lightness(value) {
    this.l = value;
  }

  get chroma() {
    return this.c;
  }

  set chroma(value) {
    this.c = value;
  }

  get hue() {
    return this.h;
  }

  set hue(value) {
    this.h = value;
  }

  get illuminant() {
    const scope = internal$7(this);
    return scope.illuminant;
  }

  static fromRGB(rgb, illuminant = Illuminant.D50) {
    return this.fromLab(Lab.fromRGB(rgb, illuminant));
  }

  toRGB(primaries = Primaries.sRGB) {
    return this.toLab().toRGB(primaries);
  }

  static fromLab(lab) {
    const { l, a, b, illuminant } = lab;
    return new this(l, Math.sqrt(a * a + b * b), Math.atan2(b, a), illuminant);
  }

  toLab() {
    const { l, c, h, illuminant } = this;
    return new Lab(l, c * Math.cos(h), c * Math.sin(h), illuminant);
  }

  toArray() {
    return [this.l, this.c, this.h];
  }

  toString() {
    return `${this.constructor.name} { ${['l', 'c', 'h'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

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

function convertRGBToRYB(rgb) {
  let [r, g, b] = rgb;
  const white = Math.min(r, g, b);
  r -= white;
  g -= white;
  b -= white;
  const maxG = Math.max(r, g, b);
  let y = Math.min(r, g);
  r -= y;
  g -= y;
  if (b !== 0 && g !== 0) {
    b /= 2;
    g /= 2;
  }
  y += g;
  b += g;
  const maxY = Math.max(r, y, b);
  if (maxY !== 0) {
    const n = maxG / maxY;
    r *= n;
    y *= n;
    b *= n;
  }
  r += white;
  y += white;
  b += white;
  return [r, y, b];
}

function convertRYBToRGB(ryb) {
  let [r, y, b] = ryb;
  const white = Math.min(r, y, b);
  r -= white;
  y -= white;
  b -= white;
  const maxY = Math.max(r, y, b);
  let g = Math.min(y, b);
  y -= g;
  b -= g;
  if (b !== 0 && g !== 0) {
    b *= 2;
    g *= 2;
  }
  r += y;
  g += y;
  const maxG = Math.max(r, g, b);
  if (maxG !== 0) {
    const n = maxY / maxG;
    r *= n;
    g *= n;
    b *= n;
  }
  r += white;
  g += white;
  b += white;
  return [r, g, b];
}

class RYB {
  constructor(...args) {
    if (args.length === 0) {
      this.r = 0;
      this.y = 0;
      this.b = 0;
    } else if (args.length === 1) {
      const [value] = args;
      this.r = value || 0;
      this.y = value || 0;
      this.b = value || 0;
    } else {
      const [r, y, b] = args;
      this.r = r || 0;
      this.y = y || 0;
      this.b = b || 0;
    }
  }

  get red() {
    return this.r;
  }

  set red(value) {
    this.r = value;
  }

  get yellow() {
    return this.y;
  }

  set yellow(value) {
    this.y = value;
  }

  get blue() {
    return this.b;
  }

  set blue(value) {
    this.b = value;
  }

  static fromRGB(rgb) {
    return new this(...convertRGBToRYB(rgb.toArray()));
  }

  toRGB(primaries = Primaries.sRGB) {
    return new RGB(...convertRYBToRGB(this.toArray()), primaries);
  }

  toArray() {
    return [this.r, this.y, this.b];
  }

  toString() {
    return `${this.constructor.name} { ${['r', 'y', 'b'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

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

export { Chromaticity, HSL, HSV, Illuminant, Lab, LCh, Primaries, RGB, RYB, Tristimulus, XYZ };
//# sourceMappingURL=index.module.js.map

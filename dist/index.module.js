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

var Matrix = {
  get identity() {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  },

  equals(matrix1, matrix2) {
    if (matrix1 === matrix2) {
      return true;
    }
    if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
      return false;
    }
    if (matrix1.length !== matrix2.length) {
      return false;
    }
    return matrix1.every((value, index) => value === matrix2[index]);
  },

  transform(matrix, vector) {
    const [x, y, z] = vector;
    return [matrix[0] * x + matrix[1] * y + matrix[2] * z, matrix[3] * x + matrix[4] * y + matrix[5] * z, matrix[6] * x + matrix[7] * y + matrix[8] * z];
  },

  multiply(matrix1, matrix2) {
    const [a11, a12, a13, a21, a22, a23, a31, a32, a33] = matrix1;
    const [b11, b12, b13, b21, b22, b23, b31, b32, b33] = matrix2;
    return [a11 * b11 + a12 * b21 + a13 * b31, a11 * b12 + a12 * b22 + a13 * b32, a11 * b13 + a12 * b23 + a13 * b33, a21 * b11 + a22 * b21 + a23 * b31, a21 * b12 + a22 * b22 + a23 * b32, a21 * b13 + a22 * b23 + a23 * b33, a31 * b11 + a32 * b21 + a33 * b31, a31 * b12 + a32 * b22 + a33 * b32, a31 * b13 + a32 * b23 + a33 * b33];
  },

  invert(matrix) {
    const [m11, m12, m13, m21, m22, m23, m31, m32, m33] = matrix;
    const p = m22 * m33 - m23 * m32;
    const q = m23 * m31 - m21 * m33;
    const r = m21 * m32 - m22 * m31;
    const determinant = m11 * p + m12 * q + m13 * r;
    if (determinant === 0) {
      throw new Error();
    }
    return [p / determinant, (m13 * m32 - m12 * m33) / determinant, (m12 * m23 - m13 * m22) / determinant, q / determinant, (m11 * m33 - m13 * m31) / determinant, (m13 * m21 - m11 * m23) / determinant, r / determinant, (m12 * m31 - m11 * m32) / determinant, (m11 * m22 - m12 * m21) / determinant];
  }
};

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

const internal$1 = Namespace('Tristimulus');

class Tristimulus {
  constructor(chromaticity, luminance = 1) {
    const scope = internal$1(this);
    const { x, y } = chromaticity;
    scope.y = luminance;
    const ly = luminance / y;
    scope.x = ly * x;
    scope.z = ly * (1 - x - y);
  }

  get x() {
    const scope = internal$1(this);
    return scope.x;
  }

  get y() {
    const scope = internal$1(this);
    return scope.y;
  }

  get z() {
    const scope = internal$1(this);
    return scope.z;
  }

  equals(other) {
    return other.x === this.x && other.y === this.y && other.z === this.z;
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

const internal = Namespace('ChromaticAdaptation');

class ChromaticAdaptation {
  constructor(matrix, inverseMatrix) {
    const scope = internal(this);
    scope.matrix = matrix;
    scope.inverseMatrix = inverseMatrix || Matrix.invert(matrix);
    scope.transformations = new Map();
  }

  static new(matrix, inverseMatrix) {
    const scope = internal(this);
    if (!scope.instances) {
      scope.instances = new Map();
    }
    const found = Array.from(scope.instances.keys()).find(key => {
      return Matrix.equals(matrix, key.matrix) && Matrix.equals(inverseMatrix, key.inverseMatrix);
    });
    let instance;
    if (found) {
      instance = scope.instances.get(found);
    } else {
      instance = new this(matrix, inverseMatrix);
      scope.instances.set({ matrix, inverseMatrix }, instance);
    }
    return instance;
  }

  get matrix() {
    const scope = internal(this);
    return [...scope.matrix];
  }

  get inverseMatrix() {
    const scope = internal(this);
    return [...scope.inverseMatrix];
  }

  transformation(source, destination) {
    const scope = internal(this);
    const found = Array.from(scope.transformations.keys()).find(key => {
      return source.equals(key.source) && destination.equals(key.destination);
    });
    let transformation;
    if (found) {
      transformation = scope.transformations.get(found);
    } else {
      const [Xs, Ys, Zs] = new Tristimulus(source).toArray();
      const [Xd, Yd, Zd] = new Tristimulus(destination).toArray();
      const s = Matrix.transform(this.matrix, [Xs, Ys, Zs]);
      const d = Matrix.transform(this.matrix, [Xd, Yd, Zd]);
      transformation = Matrix.multiply(this.inverseMatrix, [d[0] / s[0], 0, 0, 0, d[1] / s[1], 0, 0, 0, d[2] / s[2]]);
      transformation = Matrix.multiply(transformation, this.matrix);
      scope.transformations.set({ source, destination }, transformation);
    }
    return transformation;
  }

  toString() {
    return `${this.constructor.name} { ${['matrix', 'inverseMatrix'].map(name => {
      return `${name}: ${this[name]}`;
    }).join(', ')} }`;
  }

  inspect() {
    return this.toString();
  }
}

Object.assign(ChromaticAdaptation, {
  // Performance Of Five Chromatic Adaptation Transforms Using Large Number Of
  // Color Patches
  // http://hrcak.srce.hr/file/95370
  // Retrieved 2016.
  // * We need to find the primary source.
  XYZ: ChromaticAdaptation.new(Matrix.identity, Matrix.identity),
  Bradford: ChromaticAdaptation.new([0.8951, 0.2664, -0.1614, -0.7502, 1.7135, 0.0367, 0.0389, -0.0685, 1.0296]),
  VonKries: ChromaticAdaptation.new([0.4002, 0.7076, -0.0808, -0.2263, 1.1653, 0.0457, 0.0000, 0.0000, 0.9182]),

  // The CIE 1997 Interim Colour Appearance Model (Simple Version), CIECAM97s
  // http://rit-mcsl.org/fairchild/PDFs/CIECAM97s_TC_Draft.pdf
  // Retrieved 2016.
  CIECAM97: ChromaticAdaptation.new([0.8951, 0.2664, -0.1614, -0.7502, 1.7135, 0.0367, 0.0389, -0.0685, 1.0296]),

  // Color Appearance Models: CIECAM02 and Beyond
  // http://rit-mcsl.org/fairchild/PDFs/AppearanceLec.pdf
  // Retrieved 2016.
  // * We need to find the primary source.
  CIECAM02: ChromaticAdaptation.new([0.7328, 0.4296, -0.1624, -0.7036, 1.6975, 0.0061, 0.0030, 0.0136, 0.9834])
});

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

const internal$2 = Namespace('Chromaticity');

class Chromaticity {
  constructor(x, y) {
    const scope = internal$2(this);
    scope.x = x;
    scope.y = y;
  }

  get x() {
    const scope = internal$2(this);
    return scope.x;
  }

  get y() {
    const scope = internal$2(this);
    return scope.y;
  }

  get z() {
    const scope = internal$2(this);
    return 1 - scope.x - scope.y;
  }

  equals(other) {
    return other.x === this.x && other.y === this.y;
  }

  toArray() {
    return [this.x, this.y];
  }

  toString() {
    return `${this.constructor.name} { ${['x', 'y'].map(name => {
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

class Illuminant extends Chromaticity {}

// Standard illuminant / White points of standard illuminants / CIE 1931 2°
// https://en.wikipedia.org/wiki/Standard_illuminant
// Retrieved 2016.
// * We need to find the primary source.
Object.assign(Illuminant, {
  A: new Illuminant(0.44757, 0.40745),
  B: new Illuminant(0.34842, 0.35161),
  C: new Illuminant(0.31006, 0.31616),
  D50: new Illuminant(0.34567, 0.35850),
  D55: new Illuminant(0.33242, 0.34743),
  D65: new Illuminant(0.31271, 0.32902),
  D75: new Illuminant(0.29902, 0.31485),
  E: new Illuminant(1 / 3, 1 / 3),
  F1: new Illuminant(0.31310, 0.33727),
  F2: new Illuminant(0.37208, 0.37529),
  F3: new Illuminant(0.40910, 0.39430),
  F4: new Illuminant(0.44018, 0.40329),
  F5: new Illuminant(0.31379, 0.34531),
  F6: new Illuminant(0.37790, 0.38835),
  F7: new Illuminant(0.31292, 0.32933),
  F8: new Illuminant(0.34588, 0.35875),
  F9: new Illuminant(0.37417, 0.37281),
  F10: new Illuminant(0.34609, 0.35986),
  F11: new Illuminant(0.38052, 0.37713),
  F12: new Illuminant(0.43695, 0.40441)
});

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

const internal$3 = Namespace('Primaries');

class Primaries {
  constructor(r, g, b, w) {
    const scope = internal$3(this);
    scope.r = r;
    scope.g = g;
    scope.b = b;
    scope.w = w;
  }

  get r() {
    const scope = internal$3(this);
    return scope.r;
  }

  get g() {
    const scope = internal$3(this);
    return scope.g;
  }

  get b() {
    const scope = internal$3(this);
    return scope.b;
  }

  get w() {
    const scope = internal$3(this);
    return scope.w;
  }

  get red() {
    return this.r;
  }

  get green() {
    return this.g;
  }

  get blue() {
    return this.b;
  }

  get white() {
    return this.w;
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

Object.assign(Primaries, {
  // Specification of sRGB.
  // http://www.color.org/srgb.pdf
  // Retrieved 2016.
  sRGB: new Primaries(new Chromaticity(0.64, 0.33), new Chromaticity(0.30, 0.60), new Chromaticity(0.15, 0.06), new Illuminant(0.3127, 0.3290)),

  // Adobe RGB (1998) Color Image Encoding. Version 2005-05. May 2005.
  // https://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf
  // Retrieved 2016.
  AdobeRGB: new Primaries(new Chromaticity(0.6400, 0.3300), new Chromaticity(0.2100, 0.7100), new Chromaticity(0.1500, 0.0600), new Illuminant(0.3127, 0.3290))
});

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

const internal$4 = Namespace('RGB');

class RGB {
  // RGB([primaries])
  // RGB(value [, primaries]])
  // RGB(red, green, blue [, primaries])
  constructor(...args) {
    const rest = [...args];
    const scope = internal$4(this);
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
    const scope = internal$4(this);
    return scope.primaries;
  }

  equals(other) {
    return other.r === this.r && other.g === this.g && other.b === this.b;
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
  // HSL([lightness])
  // HSL(hue, saturation, lightness)
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

  equals(other) {
    return other.h === this.h && other.s === this.s && other.l === this.l;
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
  // HSV([value])
  // HSV(hue, saturation, value)
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

  equals(other) {
    return other.h === this.h && other.s === this.s && other.v === this.v;
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

const internal$6 = Namespace('XYZ');

function compand$1(value) {
  if (value <= 0.0031308) {
    return 12.92 * value;
  }
  return 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
}

function decompand$1(value) {
  if (value <= 0.04045) {
    return value / 12.92;
  }
  return Math.pow((value + 0.055) / 1.055, 2.4);
}

class XYZ {
  // XYZ([lightness])
  // XYZ(x, y, z)
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
    const m = this.getRGBToXYZMatrix(rgb.primaries);
    const r = decompand$1(rgb.r);
    const g = decompand$1(rgb.g);
    const b = decompand$1(rgb.b);
    return new this(m[0] * r + m[1] * g + m[2] * b, m[3] * r + m[4] * g + m[5] * b, m[6] * r + m[7] * g + m[8] * b);
  }

  toRGB(primaries = Primaries.sRGB) {
    const { x, y, z } = this;
    const m = this.constructor.getXYZToRGBMatrix(primaries);
    const r = m[0] * x + m[1] * y + m[2] * z;
    const g = m[3] * x + m[4] * y + m[5] * z;
    const b = m[6] * x + m[7] * y + m[8] * z;
    return new RGB(compand$1(r), compand$1(g), compand$1(b), primaries);
  }

  static getRGBToXYZMatrix(primaries) {
    const scope = internal$6(primaries);
    if (scope.RGBToXYZMatrix !== undefined) {
      return scope.RGBToXYZMatrix;
    }
    const [xr, yr, zr] = new Tristimulus(primaries.r).toArray();
    const [xg, yg, zg] = new Tristimulus(primaries.g).toArray();
    const [xb, yb, zb] = new Tristimulus(primaries.b).toArray();
    const [xw, yw, zw] = new Tristimulus(primaries.w).toArray();
    const s = Matrix.invert([xr, xg, xb, yr, yg, yb, zr, zg, zb]);
    const sr = s[0] * xw + s[1] * yw + s[2] * zw;
    const sg = s[3] * xw + s[4] * yw + s[5] * zw;
    const sb = s[6] * xw + s[7] * yw + s[8] * zw;
    const cat = ChromaticAdaptation.Bradford.transformation(primaries.w, Illuminant.D50);
    scope.RGBToXYZMatrix = Matrix.multiply(cat, [sr * xr, sg * xg, sb * xb, sr * yr, sg * yg, sb * yb, sr * zr, sg * zg, sb * zb]);
    return scope.RGBToXYZMatrix;
  }

  static getXYZToRGBMatrix(primaries) {
    const scope = internal$6(primaries);
    if (scope.XYZToRGBMatrix !== undefined) {
      return scope.XYZToRGBMatrix;
    }
    scope.XYZToRGBMatrix = Matrix.invert(this.getRGBToXYZMatrix(primaries));
    return scope.XYZToRGBMatrix;
  }

  equals(other) {
    return other.x === this.x && other.y === this.y && other.z === this.z;
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

const internal$5 = Namespace('Lab');

function compand(t) {
  if (t > 216 / 24389) {
    return Math.pow(t, 1 / 3);
  }
  return 841 / 108 * t + 4 / 29;
}

function decompand(t) {
  if (t > 6 / 29) {
    return Math.pow(t, 3);
  }
  return 108 / 841 * (t - 4 / 29);
}

class Lab {
  // Lab([illuminant])
  // Lab(lightness [, illuminant]])
  // Lab(lightness, a, b [, illuminant])
  constructor(...args) {
    const rest = [...args];
    const scope = internal$5(this);
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
    const scope = internal$5(this);
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
    const t = compand(xyz.y / w.y);
    return new this(116 * t - 16, 500 * (compand(xyz.x / w.x) - t), 200 * (t - compand(xyz.z / w.z)), illuminant);
  }

  toXYZ() {
    const w = new Tristimulus(this.illuminant);
    const t = (this.l + 16) / 116;
    return new XYZ(decompand(t + this.a / 500) * w.x, decompand(t) * w.y, decompand(t - this.b / 200) * w.z);
  }

  equals(other) {
    return other.l === this.l && other.a === this.a && other.b === this.b;
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

const internal$7 = Namespace('LChab');

class LChab {
  // LChab([illuminant])
  // LChab(lightness [, illuminant]])
  // LChab(lightness, c, h [, illuminant])
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

  equals(other) {
    return other.l === this.l && other.c === this.c && other.h === this.h;
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

const internal$9 = Namespace('Luv');

function compand$2(value) {
  if (value > 216 / 24389) {
    return Math.pow(value, 1 / 3);
  }
  return 841 / 108 * value + 4 / 29;
}

function decompand$2(value) {
  if (value > 6 / 29) {
    return Math.pow(value, 3);
  }
  return 108 / 841 * (value - 4 / 29);
}

function ucs(tristimulus) {
  const { x, y, z } = tristimulus;
  return {
    u: 4 * x / (x + 15 * y + 3 * z),
    v: 9 * x / (x + 15 * y + 3 * z)
  };
}

class Luv {
  // Luv([illuminant])
  // Luv(lightness [, illuminant]])
  // Luv(lightness, u, v [, illuminant])
  constructor(...args) {
    const rest = [...args];
    const scope = internal$9(this);
    if (args[args.length - 1] instanceof Illuminant) {
      scope.illuminant = rest.pop();
    } else {
      scope.illuminant = Illuminant.D50;
    }
    if (rest.length === 0) {
      this.l = 0;
      this.u = 0;
      this.v = 0;
    } else if (rest.length === 1) {
      const [value] = rest;
      this.l = value || 0;
      this.u = 0;
      this.v = 0;
    } else {
      const [l, a, b] = rest;
      this.l = l || 0;
      this.u = a || 0;
      this.v = b || 0;
    }
  }

  get lightness() {
    return this.l;
  }

  set lightness(value) {
    this.l = value;
  }

  get illuminant() {
    const scope = internal$9(this);
    return scope.illuminant;
  }

  static fromRGB(rgb, illuminant = Illuminant.D50) {
    return this.fromXYZ(XYZ.fromRGB(rgb), illuminant);
  }

  toRGB(primaries = Primaries.sRGB) {
    return this.toXYZ().toRGB(primaries);
  }

  static fromXYZ(xyz, illuminant = Illuminant.D50) {
    const l = 116 * compand$2(xyz.y) - 16;
    const w = new Tristimulus(illuminant);
    const ucsW = ucs(w);
    const { u = ucsU, v = ucsV } = ucs(xyz);
    return new this(l, 13 * l * (ucsU - ucsW.u), 13 * l * (ucsV - ucsW.v));
  }

  toXYZ() {
    const { l } = this;
    const w = new Tristimulus(this.illuminant);
    const y = decompand$2((l + 16) / 116) * w.y;
    const ucsW = ucs(w);
    const ucsU = this.u / (13 * l) + ucsW.u;
    const ucsV = this.v / (13 * l) + ucsW.v;
    const s = 9 * y / ucsV;
    const x = ucsU / 4 * s;
    const z = (s - x - 15 * y) / 3;
    return new XYZ(x, y, z);
  }

  equals(other) {
    return other.l === this.l && other.u === this.u && other.v === this.v;
  }

  toArray() {
    return [this.l, this.u, this.v];
  }

  toString() {
    return `${this.constructor.name} { ${['l', 'u', 'v'].map(name => {
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

const internal$8 = Namespace('LChuv');

class LChuv {
  // LChuv([illuminant])
  // LChuv(lightness [, illuminant]])
  // LChuv(lightness, c, h [, illuminant])
  constructor(...args) {
    const rest = [...args];
    const scope = internal$8(this);
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
    const scope = internal$8(this);
    return scope.illuminant;
  }

  static fromRGB(rgb, illuminant = Illuminant.D50) {
    return this.fromLuv(Luv.fromRGB(rgb, illuminant));
  }

  toRGB(primaries = Primaries.sRGB) {
    return this.toLuv().toRGB(primaries);
  }

  static fromLuv(luv) {
    const { l, u, v, illuminant } = luv;
    return new this(l, Math.sqrt(u * u + v * v), Math.atan2(v, u), illuminant);
  }

  toLuv() {
    const { l, c, h, illuminant } = this;
    return new Luv(l, c * Math.cos(h), c * Math.sin(h), illuminant);
  }

  equals(other) {
    return other.l === this.l && other.c === this.c && other.h === this.h;
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
  // RGB([value])
  // RGB(red, yellow, blue)
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

  equals(other) {
    return other.r === this.r && other.y === this.y && other.b === this.b;
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

export { ChromaticAdaptation, Chromaticity, HSL, HSV, Illuminant, Lab, LChab, LChuv, Luv, Primaries, RGB, RYB, Tristimulus, XYZ };
//# sourceMappingURL=index.module.js.map

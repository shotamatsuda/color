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

import Matrix from '../color/Matrix'
import Tristimulus from '../color/Tristimulus'

const internal = Namespace('ChromaticAdaptation')

export default class ChromaticAdaptation {
  constructor(matrix, inverseMatrix) {
    const scope = internal(this)
    scope.matrix = matrix
    scope.inverseMatrix = inverseMatrix || Matrix.invert(matrix)
    scope.transformations = new Map()
  }

  static new(matrix, inverseMatrix) {
    const scope = internal(this)
    if (!scope.instances) {
      scope.instances = new Map()
    }
    const found = Array.from(scope.instances.keys()).find(key => {
      return Matrix.equals(matrix, key.matrix) &&
             Matrix.equals(inverseMatrix, key.inverseMatrix)
    })
    let instance
    if (found) {
      instance = scope.instances.get(found)
    } else {
      instance = new this(matrix, inverseMatrix)
      scope.instances.set({ matrix, inverseMatrix }, instance)
    }
    return instance
  }

  get matrix() {
    const scope = internal(this)
    return [...scope.matrix]
  }

  get inverseMatrix() {
    const scope = internal(this)
    return [...scope.inverseMatrix]
  }

  transformation(source, destination) {
    const scope = internal(this)
    const found = Array.from(scope.transformations.keys()).find(key => {
      return source.equals(key.source) && destination.equals(key.destination)
    })
    let transformation
    if (found) {
      transformation = scope.transformations.get(found)
    } else {
      const [Xs, Ys, Zs] = new Tristimulus(source).toArray()
      const [Xd, Yd, Zd] = new Tristimulus(destination).toArray()
      const s = Matrix.transform(this.matrix, [Xs, Ys, Zs])
      const d = Matrix.transform(this.matrix, [Xd, Yd, Zd])
      transformation = Matrix.multiply(this.inverseMatrix, [
        d[0] / s[0], 0, 0,
        0, d[1] / s[1], 0,
        0, 0, d[2] / s[2],
      ])
      transformation = Matrix.multiply(transformation, this.matrix)
      scope.transformations.set({ source, destination }, transformation)
    }
    return transformation
  }

  toString() {
    return `${this.constructor.name} { ${[
      'matrix',
      'inverseMatrix',
    ].map(name => {
      return `${name}: ${this[name]}`
    }).join(', ')} }`
  }

  inspect() {
    return this.toString()
  }
}

Object.assign(ChromaticAdaptation, {
  // Performance Of Five Chromatic Adaptation Transforms Using Large Number Of
  // Color Patches
  // http://hrcak.srce.hr/file/95370
  // Retrieved 2016.
  // * We need to find the primary source.
  XYZ: ChromaticAdaptation.new(Matrix.identity, Matrix.identity),
  Bradford: ChromaticAdaptation.new([
    0.8951, 0.2664, -0.1614,
    -0.7502, 1.7135, 0.0367,
    0.0389, -0.0685, 1.0296,
  ]),
  VonKries: ChromaticAdaptation.new([
    0.4002, 0.7076, -0.0808,
    -0.2263, 1.1653, 0.0457,
    0.0000, 0.0000, 0.9182,
  ]),

  // The CIE 1997 Interim Colour Appearance Model (Simple Version), CIECAM97s
  // http://rit-mcsl.org/fairchild/PDFs/CIECAM97s_TC_Draft.pdf
  // Retrieved 2016.
  CIECAM97: ChromaticAdaptation.new([
    0.8951, 0.2664, -0.1614,
    -0.7502, 1.7135, 0.0367,
    0.0389, -0.0685, 1.0296,
  ]),

  // Color Appearance Models: CIECAM02 and Beyond
  // http://rit-mcsl.org/fairchild/PDFs/AppearanceLec.pdf
  // Retrieved 2016.
  // * We need to find the primary source.
  CIECAM02: ChromaticAdaptation.new([
    0.7328, 0.4296, -0.1624,
    -0.7036, 1.6975, 0.0061,
    0.0030, 0.0136, 0.9834,
  ]),
})

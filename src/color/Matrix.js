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

export default {
  get identity() {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1]
  },

  equals(matrix1, matrix2) {
    if (matrix1 === matrix2) {
      return true
    }
    if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
      return false
    }
    if (matrix1.length !== matrix2.length) {
      return false
    }
    return matrix1.every((value, index) => value === matrix2[index])
  },

  transform(matrix, vector) {
    const [x, y, z] = vector
    return [
      matrix[0] * x + matrix[1] * y + matrix[2] * z,
      matrix[3] * x + matrix[4] * y + matrix[5] * z,
      matrix[6] * x + matrix[7] * y + matrix[8] * z,
    ]
  },

  multiply(matrix1, matrix2) {
    const [a11, a12, a13, a21, a22, a23, a31, a32, a33] = matrix1
    const [b11, b12, b13, b21, b22, b23, b31, b32, b33] = matrix2
    return [
      a11 * b11 + a12 * b21 + a13 * b31,
      a11 * b12 + a12 * b22 + a13 * b32,
      a11 * b13 + a12 * b23 + a13 * b33,
      a21 * b11 + a22 * b21 + a23 * b31,
      a21 * b12 + a22 * b22 + a23 * b32,
      a21 * b13 + a22 * b23 + a23 * b33,
      a31 * b11 + a32 * b21 + a33 * b31,
      a31 * b12 + a32 * b22 + a33 * b32,
      a31 * b13 + a32 * b23 + a33 * b33,
    ]
  },

  invert(matrix) {
    const [m11, m12, m13, m21, m22, m23, m31, m32, m33] = matrix
    const p = m22 * m33 - m23 * m32
    const q = m23 * m31 - m21 * m33
    const r = m21 * m32 - m22 * m31
    const determinant = m11 * p + m12 * q + m13 * r
    if (determinant === 0) {
      throw new Error()
    }
    return [
      p / determinant,
      (m13 * m32 - m12 * m33) / determinant,
      (m12 * m23 - m13 * m22) / determinant,
      q / determinant,
      (m11 * m33 - m13 * m31) / determinant,
      (m13 * m21 - m11 * m23) / determinant,
      r / determinant,
      (m12 * m31 - m11 * m32) / determinant,
      (m11 * m22 - m12 * m21) / determinant,
    ]
  },
}

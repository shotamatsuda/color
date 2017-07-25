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

import Chromaticity from './Chromaticity'

export default class Illuminant extends Chromaticity {}

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
  F12: new Illuminant(0.43695, 0.40441),
})

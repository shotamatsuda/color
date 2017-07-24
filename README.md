Color
=====

[![License](http://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat
)](http://mit-license.org)

## API Reference

#### RGB Color Model

- <a href="#rgb">RGB</a>
- <a href="#ryb">RYB</a>
- <a href="#hsv">HSV</a>
- <a href="#hsl">HSL</a>

#### XYZ Color Model

- <a href="#xyz">XYZ</a>
- <a href="#lab">Lab</a>
- <a href="#luv">Luv</a>
- <a href="#lchab">LCHab</a>
- <a href="#lchuv">LCHuv</a>

#### Data Types

- <a href="#chromaticity">Chromaticity</a>
- <a href="#tristimulus">Tristimulus</a>
- <a href="#illuminant">Illuminant</a>
- <a href="#primaries">Primaries</a>
- <a href="#chromaticadaptation">ChromaticAdaptation</a>

### Chromaticity

<a id="new-chromaticity" href="#new-chromaticity">#</a>
new **Chromaticity**(*x*, *y*)

##### Functions

<a id="chromaticity-equals" href="#chromaticity-equals">#</a>
*chromaticity*.**equals**(*other*)

<a id="chromaticity-toarray" href="#chromaticity-toarray">#</a>
*chromaticity*.**toArray**()

##### Properties

<a id="chromaticity-x" href="#chromaticity-x">#</a>
*chromaticity*.**x**

<a id="chromaticity-y" href="#chromaticity-y">#</a>
*chromaticity*.**y**

<a id="chromaticity-z" href="#chromaticity-z">#</a>
*chromaticity*.**z**

### Tristimulus

<a id="new-tristimulus" href="#new-tristimulus">#</a>
new **Tristimulus**(*chromaticity* [, *luminance*)

##### Functions

<a id="tristimulus-equals" href="#tristimulus-equals">#</a>
*tristimulus*.**equals**(*other*)

<a id="tristimulus-toarray" href="#tristimulus-toarray">#</a>
*tristimulus*.**toArray**()

##### Properties

<a id="tristimulus-x" href="#tristimulus-x">#</a>
*tristimulus*.**x**

<a id="tristimulus-y" href="#tristimulus-y">#</a>
*tristimulus*.**y**

<a id="tristimulus-z" href="#tristimulus-z">#</a>
*tristimulus*.**z**

### Illuminant

##### Constants

<a id="illuminant-class-a" href="#illuminant-class-a">#</a>
Illuminant.**A**

<a id="illuminant-class-b" href="#illuminant-class-b">#</a>
Illuminant.**B**

<a id="illuminant-class-c" href="#illuminant-class-c">#</a>
Illuminant.**C**

<a id="illuminant-class-d50" href="#illuminant-class-d50">#</a>
Illuminant.**D50**

<a id="illuminant-class-d55" href="#illuminant-class-d55">#</a>
Illuminant.**D55**

<a id="illuminant-class-d65" href="#illuminant-class-d65">#</a>
Illuminant.**D65**

<a id="illuminant-class-d75" href="#illuminant-class-d75">#</a>
Illuminant.**D75**

<a id="illuminant-class-e" href="#illuminant-class-e">#</a>
Illuminant.**E**

<a id="illuminant-class-f1" href="#illuminant-class-f1">#</a>
Illuminant.**F1**

<a id="illuminant-class-f2" href="#illuminant-class-f2">#</a>
Illuminant.**F2**

<a id="illuminant-class-f3" href="#illuminant-class-f3">#</a>
Illuminant.**F3**

<a id="illuminant-class-f4" href="#illuminant-class-f4">#</a>
Illuminant.**F4**

<a id="illuminant-class-f5" href="#illuminant-class-f5">#</a>
Illuminant.**F5**

<a id="illuminant-class-f6" href="#illuminant-class-f6">#</a>
Illuminant.**F6**

<a id="illuminant-class-f7" href="#illuminant-class-f7">#</a>
Illuminant.**F7**

<a id="illuminant-class-f8" href="#illuminant-class-f8">#</a>
Illuminant.**F8**

<a id="illuminant-class-f9" href="#illuminant-class-f9">#</a>
Illuminant.**F9**

<a id="illuminant-class-f10" href="#illuminant-class-f10">#</a>
Illuminant.**F10**

<a id="illuminant-class-f11" href="#illuminant-class-f11">#</a>
Illuminant.**F11**

<a id="illuminant-class-f12" href="#illuminant-class-f12">#</a>
Illuminant.**F12**

### Primaries

<a id="new-primaries" href="#new-primaries">#</a>
new **Primaries**(*red*, *green*, *blue*, *white*)

##### Constants

<a id="primaries-class-srgb" href="#primaries-class-srgb">#</a>
Primaries.**sRGB**

<a id="primaries-class-adobergb" href="#primaries-class-adobergb">#</a>
Primaries.**AdobeRGB**

##### Functions

<a id="primaries-equals" href="#primaries-equals">#</a>
*primaries*.**equals**(*other*)

<a id="primaries-toarray" href="#primaries-toarray">#</a>
*primaries*.**toArray**()

##### Properties

<a id="primaries-r" href="#primaries-r">#</a>
*primaries*.**r**<br>
<a id="primaries-red" href="#primaries-red">#</a>
*primaries*.**red**

<a id="primaries-g" href="#primaries-g">#</a>
*primaries*.**g**<br>
<a id="primaries-green" href="#primaries-green">#</a>
*primaries*.**green**

<a id="primaries-b" href="#primaries-b">#</a>
*primaries*.**b**<br>
<a id="primaries-blue" href="#primaries-blue">#</a>
*primaries*.**blue**

<a id="primaries-w" href="#primaries-w">#</a>
*primaries*.**w**<br>
<a id="primaries-white" href="#primaries-white">#</a>
*primaries*.**white**

### ChromaticAdaptation

<a id="new-chromaticadaptation" href="#new-chromaticadaptation">#</a>
new **ChromaticAdaptation**(*matrix* [, *inverseMatrix*])

##### Constants

<a id="chromaticadaptation-class-srgb" href="#chromaticadaptation-class-srgb">#</a>
ChromaticAdaptation.**XYZ**

<a id="chromaticadaptation-class-adobergb" href="#chromaticadaptation-class-adobergb">#</a>
ChromaticAdaptation.**Bradford**

<a id="chromaticadaptation-class-adobergb" href="#chromaticadaptation-class-adobergb">#</a>
ChromaticAdaptation.**VonKries**

<a id="chromaticadaptation-class-cam97" href="#chromaticadaptation-class-cam97">#</a>
ChromaticAdaptation.**CAM97**

<a id="chromaticadaptation-class-cam02" href="#chromaticadaptation-class-cam02">#</a>
ChromaticAdaptation.**CAM02**

##### Functions

<a id="chromaticadaptation-transformationMatrix" href="#chromaticadaptation-transform">#</a>
*chromaticAdaptation*.**transformationMatrix**(*source*, *destination*)

##### Properties

<a id="chromaticadaptation-matrix" href="#chromaticadaptation-matrix">#</a>
*chromaticAdaptation*.**matrix**<br>

<a id="chromaticadaptation-inversematrix" href="#chromaticadaptation-inversematrix">#</a>
*chromaticAdaptation*.**inverseMatrix**

### RGB

<a id="new-rgb-0" href="#new-rgb-0">#</a>
new **RGB**([*primaries*])<br>
<a id="new-rgb-2" href="#new-rgb-2">#</a>
new **RGB**(*value* [, *primaries*])<br>
<a id="new-rgb-3" href="#new-rgb-3">#</a>
new **RGB**(*red*, *green*, *blue* [, *primaries*])

##### Functions

<a id="rgb-equals" href="#rgb-equals">#</a>
*rgb*.**equals**(*other*)

<a id="rgb-toarray" href="#rgb-toarray">#</a>
*rgb*.**toArray**()

##### Properties

<a id="rgb-r" href="#rgb-r">#</a>
*rgb*.**r**<br>
<a id="rgb-red" href="#rgb-red">#</a>
*rgb*.**red**

<a id="rgb-g" href="#rgb-g">#</a>
*rgb*.**g**<br>
<a id="rgb-green" href="#rgb-green">#</a>
*rgb*.**green**

<a id="rgb-b" href="#rgb-b">#</a>
*rgb*.**b**<br>
<a id="rgb-blue" href="#rgb-blue">#</a>
*rgb*.**blue**

<a id="rgb-primaries" href="#rgb-primaries">#</a>
*rgb*.**primaries**

### RYB

<a id="new-ryb-0" href="#new-ryb-0">#</a>
new **RYB**()<br>
<a id="new-ryb-2" href="#new-ryb-2">#</a>
new **RYB**(*value*)<br>
<a id="new-ryb-3" href="#new-ryb-3">#</a>
new **RYB**(*red*, *yellow*, *blue*)

##### Functions

<a id="ryb-class-fromrgb" href="#ryb-class-fromrgb">#</a>
RYB.**fromRGB**(*rgb*)

<a id="ryb-torgb" href="#ryb-torgb">#</a>
*ryb*.**toRGB**([*primaries*])

<a id="ryb-equals" href="#ryb-equals">#</a>
*ryb*.**equals**(*other*)

<a id="ryb-toarray" href="#ryb-toarray">#</a>
*ryb*.**toArray**()

##### Properties

<a id="ryb-r" href="#ryb-r">#</a>
*ryb*.**r**<br>
<a id="ryb-red" href="#ryb-red">#</a>
*ryb*.**red**

<a id="ryb-y" href="#ryb-y">#</a>
*ryb*.**y**<br>
<a id="ryb-yellow" href="#ryb-yellow">#</a>
*ryb*.**yellow**

<a id="ryb-b" href="#ryb-b">#</a>
*ryb*.**b**<br>
<a id="ryb-blue" href="#ryb-blue">#</a>
*ryb*.**blue**

<a id="ryb-equals" href="#ryb-equals">#</a>
*ryb*.**equals**(*other*)

<a id="ryb-toarray" href="#ryb-toarray">#</a>
*ryb*.**toArray**()

### HSV

<a id="new-hsv-0" href="#new-hsv-0">#</a>
new **HSV**()<br>
<a id="new-hsv-2" href="#new-hsv-2">#</a>
new **HSV**(*value*)<br>
<a id="new-hsv-3" href="#new-hsv-3">#</a>
new **HSV**(*hue*, *saturation*, *value*)

##### Functions

<a id="hsv-class-fromrgb" href="#hsv-class-fromrgb">#</a>
HSV.**fromRGB**(*rgb*)

<a id="hsv-torgb" href="#hsv-torgb">#</a>
*hsv*.**toRGB**([*primaries*])

<a id="hsv-equals" href="#hsv-equals">#</a>
*hsv*.**equals**(*other*)

<a id="hsv-toarray" href="#hsv-toarray">#</a>
*hsv*.**toArray**()

##### Properties

<a id="hsv-h" href="#hsv-h">#</a>
*hsv*.**h**<br>
<a id="hsv-hue" href="#hsv-hue">#</a>
*hsv*.**hue**

<a id="hsv-s" href="#hsv-h">#</a>
*hsv*.**s**<br>
<a id="hsv-saturation" href="#hsv-saturation">#</a>
*hsv*.**saturation**

<a id="hsv-v" href="#hsv-v">#</a>
*hsv*.**v**<br>
<a id="hsv-value" href="#hsv-value">#</a>
*hsv*.**value**

### HSL

<a id="new-hsl-0" href="#new-hsl-0">#</a>
new **HSL**()<br>
<a id="new-hsl-2" href="#new-hsl-2">#</a>
new **HSL**(*lightness*)<br>
<a id="new-hsl-3" href="#new-hsl-3">#</a>
new **HSL**(*hue*, *saturation*, *lightness*)

##### Functions

<a id="hsl-class-fromrgb" href="#hsl-class-fromrgb">#</a>
HSL.**fromRGB**(*rgb*)

<a id="hsl-torgb" href="#hsl-torgb">#</a>
*hsl*.**toRGB**([*primaries*])

<a id="hsl-equals" href="#hsl-equals">#</a>
*hsl*.**equals**(*other*)

<a id="hsl-toarray" href="#hsl-toarray">#</a>
*hsl*.**toArray**()

##### Properties

<a id="hsl-h" href="#hsl-h">#</a>
*hsl*.**h**<br>
<a id="hsl-hue" href="#hsl-hue">#</a>
*hsl*.**hue**

<a id="hsl-s" href="#hsl-h">#</a>
*hsl*.**s**<br>
<a id="hsl-saturation" href="#hsl-saturation">#</a>
*hsl*.**saturation**

<a id="hsl-l" href="#hsl-l">#</a>
*hsl*.**l**<br>
<a id="hsl-value" href="#hsl-lightness">#</a>
*hsl*.**lightness**

### XYZ

<a id="new-xyz-0" href="#new-xyz-0">#</a>
new **XYZ**([*illuminant*])<br>
<a id="new-xyz-2" href="#new-xyz-2">#</a>
new **XYZ**(*lightness* [, *illuminant*])<br>
<a id="new-xyz-3" href="#new-xyz-3">#</a>
new **XYZ**(*x*, *y*, *z* [, *illuminant*])

##### Functions

<a id="xyz-class-fromrgb" href="#xyz-class-fromrgb">#</a>
XYZ.**fromRGB**(*rgb* [, *illuminant*])

<a id="xyz-torgb" href="#xyz-torgb">#</a>
*xyz*.**toRGB**([*primaries*])

<a id="xyz-class-rgbtoxyzmatrix" href="#xyz-class-rgbtoxyzmatrix">#</a>
XYZ.**RGBToXYZMatrix**(*primaries* [, *illuminant*])

<a id="xyz-class-xyztorgbmatrix" href="#xyz-class-xyztorgbmatrix">#</a>
XYZ.**XYZToRGBMatrix**(*primaries* [, *illuminant*])

<a id="xyz-equals" href="#xyz-equals">#</a>
*xyz*.**equals**(*other*)

<a id="xyz-toarray" href="#xyz-toarray">#</a>
*xyz*.**toArray**()

##### Properties

<a id="xyz-x" href="#xyz-x">#</a>
*xyz*.**x**

<a id="xyz-y" href="#xyz-y">#</a>
*xyz*.**y**

<a id="xyz-z" href="#xyz-z">#</a>
*xyz*.**z**

<a id="xyz-illuminant" href="#xyz-illuminant">#</a>
*xyz*.**illuminant**

### Lab

<a id="new-lab-0" href="#new-lab-0">#</a>
new **Lab**([*illuminant*])<br>
<a id="new-lab-2" href="#new-lab-2">#</a>
new **Lab**(*lightness* [, *illuminant*])<br>
<a id="new-lab-3" href="#new-lab-3">#</a>
new **Lab**(*lightness*, *a*, *b* [, *illuminant*])

##### Functions

<a id="lab-class-fromrgb" href="#lab-class-fromrgb">#</a>
Lab.**fromRGB**(*rgb* [, *illuminant*])

<a id="lab-torgb" href="#lab-torgb">#</a>
*lab*.**toRGB**([*primaries*])

<a id="lab-class-fromxyz" href="#lab-class-fromxyz">#</a>
Lab.**fromXYZ**(*xyz* [, *illuminant*])

<a id="lab-toxyz" href="#lab-toxyz">#</a>
*lab*.**toXYZ**()

<a id="lab-equals" href="#lab-equals">#</a>
*lab*.**equals**(*other*)

<a id="lab-toarray" href="#lab-toarray">#</a>
*lab*.**toArray**()

##### Properties

<a id="lab-l" href="#lab-l">#</a>
*lab*.**l**<br>
<a id="lab-lightness" href="#lab-lightness">#</a>
*lab*.**lightness**

<a id="lab-a" href="#lab-a">#</a>
*lab*.**a**

<a id="lab-b" href="#lab-b">#</a>
*lab*.**b**

<a id="lab-illuminant" href="#lab-illuminant">#</a>
*lab*.**illuminant**

### Luv

<a id="new-luv-0" href="#new-luv-0">#</a>
new **Luv**([*illuminant*])<br>
<a id="new-luv-2" href="#new-luv-2">#</a>
new **Luv**(*lightness* [, *illuminant*])<br>
<a id="new-luv-3" href="#new-luv-3">#</a>
new **Luv**(*lightness*, *u*, *v* [, *illuminant*])

##### Functions

<a id="luv-class-fromrgb" href="#luv-class-fromrgb">#</a>
Luv.**fromRGB**(*rgb* [, *illuminant*])

<a id="luv-torgb" href="#luv-torgb">#</a>
*luv*.**toRGB**([*primaries*])

<a id="luv-class-fromxyz" href="#luv-class-fromxyz">#</a>
Luv.**fromXYZ**(*xyz* [, *illuminant*])

<a id="luv-toxyz" href="#luv-toxyz">#</a>
*luv*.**toXYZ**()

<a id="luv-equals" href="#luv-equals">#</a>
*luv*.**equals**(*other*)

<a id="luv-toarray" href="#luv-toarray">#</a>
*luv*.**toArray**()

##### Properties

<a id="luv-l" href="#luv-l">#</a>
*luv*.**l**<br>
<a id="luv-lightness" href="#luv-lightness">#</a>
*luv*.**lightness**

<a id="luv-u" href="#luv-u">#</a>
*luv*.**u**

<a id="luv-v" href="#luv-v">#</a>
*luv*.**v**

<a id="luv-illuminant" href="#luv-illuminant">#</a>
*luv*.**illuminant**

### LCHab

<a id="new-lchab-0" href="#new-lchab-0">#</a>
new **LCHab**([*illuminant*])<br>
<a id="new-lchab-2" href="#new-lchab-2">#</a>
new **LCHab**(*lightness* [, *illuminant*])<br>
<a id="new-lchab-3" href="#new-lchab-3">#</a>
new **LCHab**(*lightness*, *chroma*, *hue* [, *illuminant*])

##### Functions

<a id="lchab-class-fromrgb" href="#lchab-class-fromrgb">#</a>
LCHab.**fromRGB**(*rgb* [, *illuminant*])

<a id="lchab-torgb" href="#lchab-torgb">#</a>
*lchab*.**toRGB**([*primaries*])

<a id="lchab-class-fromlab" href="#lchab-class-fromlab">#</a>
LCHab.**fromLab**(*lab*)

<a id="lchab-tolab" href="#lchab-tolab">#</a>
*lchab*.**toLab**()

<a id="lchab-equals" href="#lchab-equals">#</a>
*lchab*.**equals**(*other*)

<a id="lchab-toarray" href="#lchab-toarray">#</a>
*lchab*.**toArray**()

##### Properties

<a id="lchab-l" href="#lchab-lightness">#</a>
*lchab*.**l**<br>
<a id="lchab-lightness" href="#lchab-lightness">#</a>
*lchab*.**lightness**

<a id="lchab-c" href="#lchab-c">#</a>
*lchab*.**c**<br>
<a id="lchab-chroma" href="#lchab-chroma">#</a>
*lchab*.**chroma**

<a id="lchab-h" href="#lchab-h">#</a>
*lchab*.**h**<br>
<a id="lchab-hue" href="#lchab-hue">#</a>
*lchab*.**hue**

<a id="lchab-illuminant" href="#lchab-illuminant">#</a>
*lchab*.**illuminant**

### LCHuv

<a id="new-lchuv-0" href="#new-lchuv-0">#</a>
new **LCHuv**([*illuminant*])<br>
<a id="new-lchuv-2" href="#new-lchuv-2">#</a>
new **LCHuv**(*lightness* [, *illuminant*])<br>
<a id="new-lchuv-3" href="#new-lchuv-3">#</a>
new **LCHuv**(*lightness*, *chroma*, *hue* [, *illuminant*])

##### Functions

<a id="lchuv-class-fromrgb" href="#lchuv-class-fromrgb">#</a>
LCHuv.**fromRGB**(*rgb* [, *illuminant*])

<a id="lchuv-torgb" href="#lchuv-torgb">#</a>
*lchuv*.**toRGB**([*primaries*])

<a id="lchuv-class-fromluv" href="#lchuv-class-fromluv">#</a>
LCHuv.**fromLuv**(*luv*)

<a id="lchuv-toluv" href="#lchuv-toluv">#</a>
*lchuv*.**toLuv**()

<a id="lchuv-equals" href="#lchuv-equals">#</a>
*lchuv*.**equals**(*other*)

<a id="lchuv-toarray" href="#lchuv-toarray">#</a>
*lchuv*.**toArray**()

##### Properties

<a id="lchuv-l" href="#lchuv-lightness">#</a>
*lchuv*.**l**<br>
<a id="lchuv-lightness" href="#lchuv-lightness">#</a>
*lchuv*.**lightness**

<a id="lchuv-c" href="#lchuv-c">#</a>
*lchuv*.**c**<br>
<a id="lchuv-chroma" href="#lchuv-chroma">#</a>
*lchuv*.**chroma**

<a id="lchuv-h" href="#lchuv-h">#</a>
*lchuv*.**h**<br>
<a id="lchuv-hue" href="#lchuv-hue">#</a>
*lchuv*.**hue**

<a id="lchuv-illuminant" href="#lchuv-illuminant">#</a>
*lchuv*.**illuminant**

## License

The MIT License

Copyright (C) 2016-Present Shota Matsuda

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

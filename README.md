# getClassName

Simple function for managing css classes. It was made with react in mind. The function returns a string object so if you want the primitive value you have to call toString. You can safely pass the value to className prop in react.

## Installation

```shell
yarn add getclassname
// or
npm install getclassname
```

## Usage

It is a function that returns a string with a couple more methods. The common use cases are as follows:

```javascript
import getClassName from 'getclassname';

const common = getClassName({
    "class1": true,
    "not-included": false,
    "class2": () => true
})

// common === "class1 class2"

const interpolation = getClassName({
    base: "base",
    "&--active": true,
})

// interpolation === "base base--active"

const extended = interpolation.extend("&__extended");

// extended === "base__extended"

const extra = interpolation.extend("&__extended").recompute({
    "&--active": false
})

// extra === "base__extended base__extended--active"

const changeInterpolationToken = getClassName({
    base: "base",
    token: "$",
    "$--different": true
})

// changeInterpolationToken === "base base--different"
```

And that's all there is...
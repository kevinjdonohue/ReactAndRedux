# Building Applications with React and Redux in ES6

A repo for notes and examples from the Building Applications with React and Redux in ES6 PluralSight course by Cory House.

## Environment Setup - Goals

* Automated Testing
* Linting
* Minification
* Bundling
* JSX compilation
* ES6 transpilation
* with a single command...

## Technologies

* Babel
* Webpack
* Mocha
* ESLint

### Babel

**babel-polyfill** - Allows the use of ES6 features that are not transpiled.

* Positive:  Can use array.from, set, map, promise, generators, etc.
* Negative:  Package size is ~50k minified; best to use individual polyfills for what you need for Production builds

**babel-preset-react-hmre** - Hot reloading

* Experimental 
* Does NOT reload functional or container components; use class components at the top of the hierarchy to enable hot reloading?



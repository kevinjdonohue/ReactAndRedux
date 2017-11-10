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

## React in ES6

* No autobind; unlike in ES5 you must bind to the 'this' keyword properly
* PropTypes declared separately
* Default props declared separately
* Set initial state in constructor

ES5 autobind example

```js

<div onClick={this.handleClick}></div>

```

ES6 example with binding

```js

// binding inline:

<div onClick={this.handleClick.bind(this)}></div>

// or even better do it in the constructor - better performance:

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
}

```

## Class Components vs Stateless Components

### Stateless Components

* React assumes that the return statement of the function is the it's render function
* Takes in a single argument, props
* Use if you don't need to manage state, utilize component lifecycle methods, or do perf optimizations

ES5 Stateless Component Example:

```js

var HelloWorld = function(props) {
  return (
    <h1>Hello World</h1>
  );
}

```

ES6 Stateless Component Example:

```js

const HelloWorld = (props) => {
  return (
    <h1>Hello World</h1>
  );
}

```

### 9 Benefits to using Stateless Components

1. No class needed
1. Avoid 'this' keyword
1. Enforced best practices (no local state, container components used for state mgmt, etc.)
1. High signal-to-noise ratio; clean(er) code
1. Enhanced code completion; intellisense
1. Bloated components are obvious
1. Easy to understand
1. East to test
1. Performance

### When to use a Class Component vs. Stateless Component

WHERE/WHEN TO USE

| Class Component               | Stateless Component |
| ----------------------------- | ------------------- |
| State                         |  everywhere else    |
| Refs                          |                     |
| Lifecycle Methods             |                     |
| Child functions (performance) |                     |

### Container Component vs Presentation Components

WHERE/WHEN TO USE

| Container Component         | Presentation Component              |
| --------------------------- | ----------------------------------- |
| Little to no markup         |  Nearly all markup                  |
| Pass data and actions down  |  Receive data and actions via props |
| Knows about Redux           |  Doesn't know about Redux           |
| Often Stateful              |  Typically functional components    |

Alternative naming for these components:

* Container vs Presentational
* Stateful vs Stateless
* Smart vs Dumb
* Controller View vs View

Prefer Container vs Presentational

## Redux

### Do I Need It

It's often needed when you have:

* Complex data flows
* Inter-component communication
* Non-hierarchical data
* Many actions
* Same data used in multiple places

### 3 Core Principles

1. One immutable store
1. Actions trigger changes
1. Reducers update state

### Similarities with Flux

* Unidirectional Flow
* Actions
* Stores

### Differences with Flux

* Reducers
* Containers
* Immutability

Also, Flux has multiple stores while Redux uses the concept of a single store.

### Conceptual Differences

Flux:

* Action
* Dispatcher
* Store
* React

Redux:

* Action
* Store
* React
* Reducers

| Flux                                  | Redux                                       |
| ------------------------------------- | ------------------------------------------- |
| Stores contain state and change logic | Store and change logic are separate         |
| Multiple stores                       | One store                                   |
| Flat and disconnected stores          | Single store with hierarchical reducers     |
| Singleton dispatcher                  | No dispatcher                               |
| React components subscribe to stores  | Container components utilize connect (lib)  |
| State is mutated                      | State is immutable                          |

## Actions, Stores & Reducers

### Actions

* Describes user intent.
* Must have a type.

Action Example:

```js

{ type: RATE_COURSE, rating: 5 }

```

### Action Creators

* Created by convenience functions called Action Creators.
* Often have the same name as the action they are creating.



Action Creator Example:

```js

rateCourse(rating) {
  return { type: RATE_COURSE, rating: rating }
}

```

### Stores

* Created at your application's entry point.
* Single source of truth
* Immutable

### Store API

* store.dispatch(action)
* store.subscribe(listener)
* store.getState()
* store.replaceReducer(nextReducer)

### Immutability

* To change state, return a new object

#### Creating a copy of an existing object in ES6

* Object.assign(target, ...sources)

Copy Example:

```js

Object.assign({}, state, {role: 'admin'});

```

#### Why Immutability

* Clarity - answers "Who changed the state?"
* Performance - reference comparison between state - instead of comparing individual pieces of data
* Awesome sauce - time travel debugging, play interactions back

#### Handling Immutability in ES6

* Object.assign
* Spread operator

In addition, you could use the following to handle things further:

* ~~react-addons-update~~ - immutability-helper
* Immutable.js

#### Enforcing Immutability

Since JavaScript does not contain immutable data structures, there are 3 approaches:

1. Trust your team members
1. redux-immutable-state-invariant - for Dev only
1. Immutable.js - immutable data structures

### Reducers

(def) A reducer is a function that takes in state and an action and returns new state.

* Must be "pure" functions - no side effects.
* Forbidden:
  * Mutate arguments
  * Perform side-effects
  * Call non-pure functions
* Each is responsible for managing a "slice" of the state.

Everytime some change occurs, every reducer is called.

```js

function myReducer(state, action) {
  switch(action.type) {
    case 'INCREMENT_COUNTER':
      return (Object.assign(
          {},
          state,
          {counter: state.counter + 1}
        )
      );
  }
}

```

## Connecting React to Redux


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

* react-redux library
* Provider component - wraps application
* Connect function - connect components to store
* A chat with Redux

| Container Component         | Presentation Component              |
| --------------------------- | ----------------------------------- |
| Focus on how things work    | Focus on how things look            |
| Aware of Redux              | Unaware of Redux                    |
| Subscribe to Redux State    | Read data from props                |
| Dispatch Redux actions      | Invoke callbacks on props           |
| Generated by react-redux    | Written by hand                     |

react-redux library connects your Store with React (components)

2 core items:

1. Provider Component
1. Connect Function

### Provider Component

* Attaches your application to your Redux Store.
* Wraps your top most component.

NOTE: If you didn't use the Provider Component, then you'd need to pass your store to every component that needs it.  Instead by using the Provider Component every React component has access to the Redux Store.

Provider Component Exmaple:

```js

<Provider store={this.props.store}>
  <App/>
</Provider>

```

### Connect Function

* Creates container components
* Wraps components so it is connected to the Redux store
* Declare which parts of the store we'd like attached to our components as props
* Declare which actions we want to expose as well?

```js

function mapStateToProps(state, ownProps) {
  return {appState: state.authorReducer};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);

```

### mapStateToProps Function

* Answers the question - What state should I expose as props?

mapStateToProps Example:

```js

function mapStateToProps(state) {
  return {
    appState: state
  };
}

```

Memoization?

### mapDispatchToProps Function

* Answers the question - What actiosn do I want on props?

3 ways to handle mapDispatchToProps:

1. Ignore it.  Use Dispatch directly
1. Manually wrap (action creator function)
1. Use bindActionCreators

Use Dispatch Directly:

```js

this.props.dispatch(loadCourses());

```

Pros:

1. ? Simple ?

Cons:

1. Boilerplate
1. Redux concerns in child components (children need to know about Redux concepts)

Manually Wrap Action Creator Function:

```js

function mapDispatchToProps(dispatch) {
  return {
    loadCourses: () => {
      dispatch(loadCourses());
    },
    createCourse: () => {
      dispatch(createCourse());
    },
    updateCourse: () => {
      dispatch(updateCourse());
    }
  };
}

// when used in a component:

this.props.loadCourses()

```

Pros:

1. Good option when you are getting started with Redux
1. Obvious what is being handled; explicit

Cons:

1. Redundant / Boilerplate code

Use bindActionCreators Function:

```js

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
    }
  };
}

// when used in a component:

this.props.actions.loadCourses()

```

Pros:

1. Clean(er) - automatically wraps actions in a dispatch call

Cons:

1. ?

### A Chat With Redux

In order to gain an understanding of all of the things in play between React and Redux consider each of the items as an actor.

Here is a typical flow between the items:

| Item        | Conversation                                                                |
| ------------ ---------------------------------------------------------------------------- |
| React       | Hey CourseAction, someone clicked this "Save Course" button                 |
| Action      | Thanks React!  I will dispatch an Action so Reducers that care can update state |
| Reducer     | Ah, thanks Action.  I see you passed me the current State and the Action to perform.  I'll make a new copy of the state and return it |
| Store       | Thanks for update the state Reducer.  I'll make sure that all connected components are aware |
| React-Redux | Thanks for the new data Store.  I'll now intelligently determine if I should tell React about this change so that it only has to bother with updating the UI when necessary |
| React       | New data has been passed down via props from the Store.  I'll update the UI to reflect this |

## Async in Redux

### Mock APIs

Why a Mock API?

Pros:

* Start before API exists
* Independence from others (teams, developers, etc.)
* Ultra-fast; rapid development
* Test slowness; test performance (set timeout)
* Aids testing; fast and reliable, deterministic data, etc.
* Point to the real API later; change config

### Async

Comparison of async handling:

| Flux                  | Redux               |
| ----------------------  --------------------|
| Handled in action     | ?                   |

### Async in Redux - Libraries

* redux-thunk
* redux-promise
* redux-saga

### redux-thunk

* Written by Dan Abramov (Redux)
* Return functions from action creators instead of objects

### redux-promise

* Newer library
* Uses Flux standard actions and promises
* _Very new_ so caution on this one -- least popular at this time

### redux-saga

* Uses ES6 generators
* Rich, domain-specific language
* Powerful

### redux-thunk vs. redux-saga

| Thunk                   | Sagas                 |
| ----------------------- | ----------------------|
| Functions               | Generators            |
| Clunky to test          | Easy to test          |
| Easy to learn           | Hard to learn         |

### Thunk

```js

export function deleteAuthor(authorId) {
  return dispatch => {
    return AuthorApi.deleteAuthor(authorId).then(() => {
      dispatch(deletedAuthor(authorId));
    }).catch(handleError);
  };
}

```

### Saga

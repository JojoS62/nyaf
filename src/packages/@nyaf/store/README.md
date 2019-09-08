[![Version](https://img.shields.io/npm/v/%40nyaf%2Fstore.svg?style=flat-square)](https://npmjs.com/package/@nyaf/store)
[![License](https://img.shields.io/npm/l/%40nyaf%2Fstore.svg?style=flat-square)](https://npmjs.com/package/@nyaf/store)

# NYAF is "Not Yet Another Framework" 

And it is, well, just another framework. It's simple, has a flat learning curve, doesn't need any special tools.

## Preface

This is an extension to the famous micro framework NYAF. You need to build your project on top of NYAF, then *@nyaf/store* makes your life easier, again.

> Credits go to [Fluxiny](https://github.com/krasimir/fluxiny) for inspiration and examples. It is, however, not a dependency. Some basic ideas comes also from https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/. 


# NYAF-STORE

This is the store implementation, a mini flux variant without the burden of Redux.

## How it works

It's very much like Redux, but makes use of decorators to write less code.

### Actions

Define the capabilities of your app, along with some default or initial value. In this example I use `Symbol` to define unique constants that are being used for any further request of an action.

~~~
export const INC = 'INC';
export const DEC = 'DEC';
export const SET = 'SET';

export default {
  [INC]: () => 1, // initial value of payload
  [DEC]: () => -1,
  [SET]: () => 0
};
~~~

### Reducer

Define, what happens if an action is being dispatched:

~~~
import { INC, DEC } from '../actions/counter.action';
import stateType from '../states/counter.state';

export default {
    [INC]: (state: stateType, payload: number) => {
      state.counter = state.counter + payload;
      return state;
    },
    [DEC]: (state: stateType, payload: number) => {
      state.counter = state.counter - payload;
      return state;
    }
};
~~~

The returned payload is the whole store object by reference. The type for the store is optional and helps elevating the power of TypeScript and getting a type safe store.

### Store and Dispatcher

The store holds the state, provides a dispatch function and fires events in case a store value changes. First, the store can by defined by types, but this is an option and you may decide to go with a simple object just for the sake of simplicity. The example shows a store that consists of fragments. This allows one to use parts of the store just by using the type fragments.

~~~
// This is a store fragment
export interface DemoTitleStore {
  title: string;
}
// This is a store fragment
export interface CounterStore {
  counter: number;
}
// This is the complete store, which can be used complete or in fragments
type store = CounterStore & DemoTitleStore;
// This is for convenient access
export default store;
~~~

Now the usage within a component. First, you must configure the store with the elements written before. As shown it's easy to combine reducers and add the various actions. To have the state typed a generic is being used.

~~~
import counterReducer from '../reducer/counter.reducer';
import setReducer from '../reducer/set.reducer';
import counterActions from '../actions/counter.action';
import storeStateType from '../states/counter.state';

const store = new Store<storeStateType>({
  actions: counterActions,
  mutations: { ...counterReducer, ...setReducer  },
  state: { counter: 0 }
});
~~~

Now make the *store* constant available in the component, if it's not yet defined there. This store can handle just on single component or spread multiple components and form eventually a single source of truth for the whole application.

~~~
@CustomElement('app-store-counter')
@ProvideStore<storeStateType>(store)
export class StoreCounterComponent extends StoreComponent<storeStateType, { cnt: number }> {
  constructor() {
    super();
    super.setData('cnt', 0);
    // fire if a value changes in the store, takes name of the store value
    this.store.subscribe('counter', str => {
      super.setData('cnt', str.counter);
    });
  }

  clickMeAdd(e) {
    console.log('Counter Element Click INC');
    this.store.dispatch(INC, 1);
  }

  clickMeSub(e) {
    console.log('Counter Element Click DEC');
    this.store.dispatch(DEC, 1);
  }

  clickMeSet(e) {
    console.log('Counter Element Click SET');
    this.store.dispatch(SET, 100);
  }

  render() {
    return (
      <>
        <div>
          <button type='button' n-on-Click={e => this.clickMeAdd(e)}>
            Add 1
          </button>
          <button type='button' n-on-Click={e => this.clickMeSub(e)} n-async>
            Sub 1
          </button>
          <button type='button' n-on-Click={e => this.clickMeSet(e)} n-async>
            Set 100
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{super.data.cnt}</pre>
      </>
    );
  }
}

~~~


# Installation

Install the package:

~~~
npm i @nyaf/store -S
~~~
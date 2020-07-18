/**
 * Action definition for the increment task.
 */
export const INC = 'INC';
/**
 * Action definition for the decrement task.
 */
export const DEC = 'DEC';
/**
 * Action definition for the set task.
 */
export const SET = 'SET';

/**
 * The defaults that we use in case a reducer doesn'Ä't exists. This usually set's a default. It's mandatory.
 */
export const actions = {
  [INC]: () => 1, // initial value of payload
  [DEC]: () => -1,
  [SET]: () => 0
};

/**
 * A store contains a data structure that helds up to the entire app's state.
 * It can have any complexity, from a single value up to deep nested objects.
 */
interface CounterStore {
  counter: number;
}

/**
 * We export a single store type that contains all single stores as one default.
 */
export type counterStoreType = CounterStore;

/**
 * The reducer functions are the executing logic. They "do" what the action is asking for.
 */
export const counterReducer = {
  /**
   * The increment action takes the current state, operates as requested and returns the state for storage.
   */
  [INC]: (state: counterStoreType, payload: number): Partial<counterStoreType> => {
    const counter = state.counter + payload;
    return  { counter };
  },
  /**
   * The decrement action takes the current state, operates as requested and returns the state for storage.
   */
  [DEC]: (state: counterStoreType, payload: number): Partial<counterStoreType> => {
    const counter = state.counter - payload;
    return { counter };
  }
};

export const setReducer = {
  [SET]: (state: counterStoreType, payload: number): Partial<counterStoreType> => {
    const counter = payload;
    return { counter };
  }
};



import { BaseComponent, ComponentData, InjectService } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

import { CounterService } from '../services/counter.service';

const COUNTER_SERVICE = 'myCounter';

/**
 * Shows how to create a simple interactive component using events and state.
 */
@CustomElement('app-service-counter')
@InjectService(COUNTER_SERVICE, CounterService)
export class ServiceCounterComponent extends BaseComponent<{ cnt: number }> {
  constructor() {
    super();
    this.data.cnt = 0;
  }

  clickMeAdd(v: number) {
    console.log('Counter Service Element Click');
    this.services(COUNTER_SERVICE).increment();
    super.setData('cnt', this.services('myService').value);
  }

  clickMeSub(v: number) {
    console.log('Counter Element Click');
    this.services(COUNTER_SERVICE).decrement();
    super.setData('cnt', this.services('myService').value);
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
        </div>
        <pre style='border: 1px solid gray;'>{this.data.cnt}</pre>
      </>
    );
  }
}
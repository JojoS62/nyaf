## Events

Events are defined by a special instruction. They are attached to `document` object, regardless the usage.

![](/assets/eventlistener.png)

### n-on-[event]

Events are easy to add directly using it like `n-on-click`. All JavaScript events are supported. Just replace 'click' in the example with any other JavaScript event.

~~~
  <button n-on-click={() => this.clickMe()}>OK</button>
~~~

> There is no `bind` necessary, events are bound to components anyway.

You can get the (original HTML 5 API) event using a parameter, like *e* in the example below:

~~~
<button n-on-click={(e) => this.clickMe(e)}>OK</button>
~~~

There is an alternative syntax that takes the method name directly (note that here are single quotes being used instead of curly braces):

~~~
<button n-on-click={this.clickMe}>OK</button>
~~~

The method is bound with or without the event object as a parameter, hence the method can have a parameter like this:

~~~
clickMe(e?: Event) {

}
~~~

The `Event` type conforms to HTML 5 DOM. Replace according the attached event (`MouseEvent` etc., see [here](https://developer.mozilla.org/en-US/docs/Web/API/Event) for details).

### Syntax Enhancements

#### Short Form

If you don't need access to the parameter of the event (example: a click, which just happens), the a short form is possible:

~~~tsx
<button type="button" n-on-click={this.clickMe}>
~~~

#### Additional Parameters

You can add constant values like this:

~~~tsx
<button type="button" n-on-click={(e) => this.clickMe(e, 'PROP')}>
~~~

> **Warning!** Regardless the type, the received value will be a `string` type at runtime.

~~~tsx
<button type="button" n-on-click={(e) => this.clickMe(e, 100)}>
~~~

This works, but the function will receive "100".

~~~tsx
<button type="button" n-on-click={(e) => this.clickMe(e, 1 + 2)}>
~~~

This works, too, but the function will receive "1 + 2". The expression is not being executed! So, this is somehow limited in the current version. You can add multiple parameters, though.

~~~tsx
<button type="button" n-on-click={(e) => this.clickMe(e, 1, 2)}>

clickMe(e: Event, a: string, b: string) {
  const r = +a + +b;
}
~~~

Usually, it doesn't make sense to have calculation on constant values. So in reality this isn't a serious limitation.

### Async

You can combine any event with the attribute `n-async` to make the call to the event's handler function async. This attribute does not take any parameters. The handler method must not be decorated with `async`.

~~~
<button n-on-click={this.clickMe} n-async>OK</button>
~~~

### Custom Events

Sometimes the JavaScript events are not flexible enough. So you can define your own ones. That's done by three simple steps:

* Add a decorator `@Events` to declare the events (it's an array to declare multiple in one step). Mandatory.
* Create `CustomEventInit` object and dispatch (that's [native Web Component behavior](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent))
* use the `n-on-<myCustomEventName>` attribute to attach the event.

Imagine a button component like this:

~~~tsx
@CustomElement('app-button')
@Events(['showAlert'])
export class ButtonComponent extends BaseComponent {
  constructor() {
    super();
  }

  clickMe() {
    const checkEvent: CustomEventInit = {
      bubbles: true,
      cancelable: false,
    };
    super.dispatch('showAlert', checkEvent);
  }

  async render() {
    return await (
      <button type="button" n-on-click={this.clickMe}>
        Demo
      </button>
    );
  }
}
~~~

The custom event in this example is called *showAlert*. It's invoked by a click. The element's host component has code like this:

~~~tsx
<app-button n-on-showAlert={(e) => this.someHandler(e)} />
~~~

The argument *e* contains an `CustomEvent` object. It can carry any number of custom data. The `click`-invoker is just an example, any action can call a custom event, even a web socket callback, a timer, or an HTTP request result. Both `CustomEvent` and `CustomEventInit` have a field `detail` that can carry any object or scalar and is the proposed way to transport custom data with the event. The event handler could look like this:

~~~ts
private showAlert(e: CustomEvent) {
  const data = e.detail;
  // Your code that handles the event
}
~~~

> Custom events can be async, too. Just add `n-async` to the element that fires the event and add the `async` modifier to the handler.


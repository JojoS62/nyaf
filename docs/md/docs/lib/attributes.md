## State and Properties

There is no explicit difference between State and Property. Compared with React it's much more simpler. A state still exists and it supports smart rendering.

![](/assets/smartprops.png)

### State

To declare a state object use a generic like this:

~~~ts
export class MainComponent extends BaseComponent<{ cnt: number}> {
  // ... omitted for brevity
}
~~~

> The State generic is optional. If there is no state necessary just use `any` or an empty object such  as `{}`.

Now two functions are available:

* `data`: Returns the instance of the data object and contains all properties defined in the generic. This is protected and only available within the class.
* `setData`: Sets a changed value and, if the value differs, re-renders the component.

A simple counter shows how to use:

~~~ts
export class CounterComponent extends BaseComponent<{ cnt: number }> {

  constructor() {
    super();
    super.setData('cnt',  10);
  }

  clickMeAdd(v: number) {
    super.setData('cnt', super.data.cnt + 1);
  }

  clickMeSub(v: number) {
    super.setData('cnt', super.data.cnt - 1);
  }

  async render() {
    return await (
      <>
        <div>
          <button type='button' n-on-click={e => this.clickMeAdd(e)}>
            Add 1
          </button>
          <button type='button' n-on-click={e => this.clickMeSub(e)}>
            Sub 1
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{ this.data.cnt }</pre>
      </>
    );
  }
}
~~~

### Properties

Property names in JavaScript are in camel case while HTML attribute names are in kebab case (dash-separated) to match HTML standards. For example, a JavaScript property named itemName maps to an HTML attribute named item-name.

Don’t start a property name with these characters:

* `on` (for example, *onClick*)
* `aria` (for example, *ariaDescribedby*)
* `data` (for example, *dataProperty*)

Don’t use these reserved words for property names.

* `slot`
* `part`
* `is`

To use properties, you must define those. Each property is automatically part of the state and once it changes, the component re-renders.

~~~ts
@CustomElement('app-btn')
@Properties<{ title: string }>({ title: 'Default' })
export class ButtonComponent extends BaseComponent<{ title: string, cnt: number }> {
  // ... omitted for brevity
}
~~~

![](/assets/smartprops2.png)

The initializer with default's is ____not____ optional, you must provide an object that matches the generic.

This is how you use such a component (part of the render method):

~~~tsx
const someTitle='Demo';
return (<app-btn title={someTitle} />);
~~~

The `@Properties` decorator defines all properties, that are now monitored (observed) and hence the value is evaluated and rendered. If the value changes the component renders itself automatically.

### Accessing Properties

The access with `data` is internally and externally available. That means, you can retrieve a component and set values like this:

~~~ts
(this.querySelector('[data-demo-button]') as any).data.text = 'Some demo data';
~~~

As like with `setData` internally this will trigger the renderer to re-render the content with the new attribute, but in this case from another component.

### Data Type

Web Components have the restriction that an attribute can transport string values only. This would lead to "[Object object]" for other types.

> **@nyaf**** overcomes this restriction with a smart attribute handling.

That means the object is being recognized and stringified to JSON. Additionally, a custom attribute with the name "\_\_name__" is written. Assume your values is written like shown below:

~~~tsx
<app-comp test={[{"obj": 1}, {"obj": 2}]}></app-comp>
~~~

The rendered component would look like this:

~~~tsx
<app-comp test="[{"obj": 1}, {"obj": 2}]" __test__></app-comp>
~~~

Apparently the double double quotes work just fine. However, the content is now a string. If you do operations on this it will not resolve as the array it was before. Here the second attribute will trigger a different behavior. The hook for the data Proxy used internally is now applying a `JSON.parse` and returns the former object. Also, once set again, the incoming value is checked for being an object and stringified, then. The technique currently works for `string` (default Web Component behavior), `number`, `boolean`, `array`, and `object`.

> For extremely huge complex objects this technique might produce a performance penalty due to repeatedly used `JSON.parse`/`JSON.stringify` calls. Be also aware that this cannot work if the object has recursive structures, because the JSON class cannot deal with this. There is no additional error handling to keep the code small, it's just a `try/catch` block that reports the native error.

### Properties and View Models

For a nice view decorators applied to class properties control the appearance.

~~~ts
export class Model {
  id: number = 0;
  name: string = '';
}


@CustomElement('app-main')
@Properties<{ data: Model }>()
export class MainComponent extends BaseComponent {
  // ... omitted for brevity
}
~~~

Within the component, this is now present. In the above definition `super.data` contains an actual model.

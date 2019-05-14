export interface ComponentData {
    [key: string]: any;
}
/**
 * Base class for components. Use in derived classes with a path to a template file, and additional setup steps callback.
 * Override 'render' method (mandatory) for event wiring and data/dom manipulation or creation (dynamic part).
 *
 * If the component shall show nothing or has temporarily nothing to render just return `null`.
 *
 * Components must be decorated with at least the @see {CustomElement} decorator. That defines the name is required to render properly.
 * Additional class decorators are available:
 *
 * * @see InjectService:  Injects a service class und a singleton instance becomes avaiable through the property `services`.
 *
 * After the render method has been called the first time the property `initialized` becomes `true`.
 * All properties can be bound, so any change will re-render the content. See @see {Properties} decorator.
 * If you use *jsx* in the render method you must import JSX function. This is same behavior as in React. It isn't React, though.
 *
 *
 */
export declare abstract class BaseComponent extends HTMLElement {
    /**
     *
     * @param template The path to the file containing the HTML
     * @param withShadow `false` to suppress using shadow dom, required for jquery-ui
     */
    constructor();
    protected receiveMessage(event: any): void;
    /**
     * Set by decorator @see {UseParentStyles}. If set, it copies styles to a shadowed component.
     * If not shadowed, it's being ignored. See @see {UseShadowDOM} decorator, too.
     */
    static readonly useParentStyles: boolean;
    /**
     * A copy of the global styles statically set for all components. First access fills it in, than it's cached.
     */
    private static globalStyle;
    /**
     * Set by decorator @see {UseShadowDOM}. A shadowed component is technically isolated.
     */
    static readonly withShadow: boolean;
    /**
     * Set by decorator @see {CustomElement}. It's the element's name in CSS selector style.
     */
    static readonly selector: string;
    abstract render(): string;
    protected dispose(): void;
    protected abstract getData(): ComponentData;
    protected initialized: boolean;
    protected setup(): void;
    setData(key: string, newValue: any): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    connectedCallback(): void;
    protected readAttribute(name: string, defaultValue?: any): any;
    disconnectedCallback(): void;
}
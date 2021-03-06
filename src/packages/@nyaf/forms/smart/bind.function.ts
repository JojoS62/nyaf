import { of, Type } from '@nyaf/lib';
import { IBindingHandler } from '../modelbinder/handlers/ibindinghandler.interface';

/**
 * A binder for any attribute, does not require a filleds `n-bind`. Instead, add an empty 'n-bind' to trigger the other attributes quickly.,
 * <a href={bind<Model>(m => m.url)} n-bind >...
 * @param nameFunction A lambda selector for the viewmodel property
 * @param target A decorator that provides the property
 * @typeParam T A view model type
 */
export function bind<T extends Object, H extends HTMLElement = HTMLElement>(
  nameFunction: ((obj: T) => any) | (new(...params: any[]) => T),
  handler?: Type<IBindingHandler>
): string {
  const sourceProperty = of(nameFunction, {}).replace(/^@@(.*)@@$/, '$1');
  return `n-bind:${sourceProperty}:${handler ? handler.name : 'DefaultBindingHandler'}`;
}

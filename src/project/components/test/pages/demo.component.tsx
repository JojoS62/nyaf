import { BaseComponent, ComponentData } from '../../base.component';
import JSX from '../../jsx';
import { CustomElement } from 'decorators';


// Step 1: Create the Components active parts
@CustomElement('app-demo')
export class DemoComponent extends BaseComponent {

  constructor() {
    super();
	}

	protected getData(): ComponentData {
		return null;
	}

	static get observedAttributes() {
		return [];
	}

	render() {
    return (
      <h2>Demo</h2>
    );
	}
}

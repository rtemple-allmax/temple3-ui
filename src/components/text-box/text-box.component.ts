import { Nullable } from "../../core/utils/nullable.js";
import { Component } from "../../core/bases/component.base.js";
import { Props, State, defaultProps, defaultState, generateStyle, generateTemplate } from './text-box.meta.js'
import { ObservableBinding } from "../../core/types/observable-binding.type.js";

class TextBoxComponent extends Component<Props, State> {
  private el: Nullable<HTMLInputElement>;

  private binding = new ObservableBinding<string>();

  constructor() {
    super(defaultProps, defaultState);
  }
  
  protected afterInit(props: Props, state: Nullable<State>): void {
    this.setStyle(generateStyle(props, state));
    this.setTemplate(generateTemplate(props, state));
  }

  protected afterRender(props: Nullable<Props>, state: Nullable<State>): void {
    const input = this.root?.querySelector('input');
    if (input) {
      input.addEventListener('change', e => {
        const val = (e.target as HTMLInputElement).value;
        if (val && val !== this.binding.value) { this.binding.set(val); }
      });
      this.binding.value$.subscribe(x => {
        console.log('binding changed', x);
        if (x && input.value !== x) { input.value = x; }
      });
    }
  }

  protected afterStateChange(props: Nullable<Props>, state: State): void {
    console.log('after state change', state);
    this.setStyle(generateStyle(props, state));
    this.setTemplate(generateTemplate(props, state));
  }
}

customElements.define('nxt-text-box', TextBoxComponent);

export {
  TextBoxComponent
}
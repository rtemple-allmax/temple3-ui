import { Nullable } from "../../core/utils/nullable.js";
import { Component } from "../../core/bases/component.base.js";
import { Props, State, defaultProps, defaultState, generateStyle, generateTemplate } from './text-box.meta.js'
import { ObservableBinding } from "../../core/types/observable-binding.type.js";
import { randomNumberInRange } from "../../core/utils/random-number-in-range.js";

class TextBoxComponent extends Component<Props, State> {
  private el: Nullable<HTMLInputElement>;

  private binding = new ObservableBinding<string>();


  constructor() {
    super(defaultProps, defaultState);
  }
  
  protected afterInit(props: Props, state: Nullable<State>): void {
    this.setStyle(generateStyle(props, state));
    this.setTemplate(generateTemplate(props, state));

    this.binding.value$.subscribe(x => {
      if (this.el) {
        if (x && this.binding.previousValue !== x) {
          if (x !== this.el.value) {
            this.el.value = x;
          }
          const ev = new CustomEvent('valueChanged', { detail: x });
          this.dispatchEvent(ev);
        }
      }
    });
  }

  protected afterRender(props: Nullable<Props>, state: Nullable<State>): void {
    const input = this.root?.querySelector('input');
    if (input) {
      this.el = input;
      this.el.addEventListener('change', e => {
        const val = (e.target as HTMLInputElement).value;
        if (val && val !== this.binding.value) { this.binding.set(val); }
      });
      
    }

    if (this.el) {
      this.el.value = this.binding.value || '';
    }

    const btn = this.root?.querySelector('.test-btn');
    if (btn) {
      btn.addEventListener('click', () => this.binding.set('this was set in the binding'));
    }

    const btn2 = this.root?.querySelector('.test-btn2');
    if (btn2) {
      btn2.addEventListener('click', () => this.setState('bg', `rgb(${randomNumberInRange(0, 255)}, ${randomNumberInRange(0, 255)}, ${randomNumberInRange(0, 255)})`));
    }
  }

  protected afterStateChange(props: Nullable<Props>, state: State): void {
    this.setStyle(generateStyle(props, state));
    this.setTemplate(generateTemplate(props, state));
  }
}

customElements.define('nxt-text-box', TextBoxComponent);

export {
  TextBoxComponent
}
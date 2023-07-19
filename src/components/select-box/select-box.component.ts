import { Nullable } from "../../core/utils/nullable.js";
import { Component } from "../../core/bases/component.base.js";
import { ObservableBinding } from "../../core/types/observable-binding.type.js";
import { combineLatest } from "rxjs";
import { Props, State, defaultProps, defaultState, generateStyle, generateTemplate } from "./select-box.meta.js";

class SelectBoxComponent extends Component<Props, State> {
  private el: Nullable<HTMLSelectElement>;

  private binding = new ObservableBinding<string>();

  constructor() {
    super(defaultProps, defaultState);
  }
  
  protected beforeInit(): void {
    combineLatest([
      this.props.value$,
      this.state.value$,
      this.binding.value$
    ]).subscribe(([
      props,
      state,
      binding
    ]) => {
      if (props && state) {
        this.setStyle(generateStyle());
        this.setTemplate(generateTemplate(props, state));
        this.render();
      }
      if (binding) {
        if (this.el) {
          if (binding && this.binding.previousValue !== binding) {
            if (binding !== this.el.value) {
              this.el.value = binding;
            }
            const ev = new CustomEvent('valueChanged', { detail: binding });
            this.dispatchEvent(ev);
          }
        }
      }
    });
  }

  protected afterRender(): void {
    const select = this.root?.querySelector('select');
    if (select) {
      this.el = select;
      this.el.addEventListener('change', e => {
        const val = (e.target as HTMLSelectElement).value;
        if (val && val !== this.binding.value) { this.binding.set(val); }
      });
      
    }

    if (this.el) {
      this.el.value = this.binding.value || '';
    }
  }

  public hydrate(items: any[]): void {
    this.setState('items', items);
  }
}

customElements.define('nxt-select-box', SelectBoxComponent);

export {
  SelectBoxComponent
}
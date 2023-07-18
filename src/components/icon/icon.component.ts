import { Nullable } from "../../core/utils/nullable.js";
import { Component } from "../../core/bases/component.base.js";
import { defaultState, defaultProps, generateStyle, generateTemplate, Props, State} from './icon.meta.js';
import { combineLatest } from "rxjs";

class IconComponent extends Component<Props, State> {
  constructor() {
    super(defaultProps, defaultState);

    this.props.value$.subscribe((props: Nullable<Props>) => {
      if (props) {
        this.setTemplate(generateTemplate(props));
        this.setStyle(generateStyle(props));
        this.render();
      }
    });
    
    const id = setInterval(() => {
      const fontAwesomeScript = document.querySelector('script[src*="fontawesome"]');
      const fontAwesomeFont = document.querySelector('#fa-v5-font-face');
      const fontAwesomeMain = document.querySelector('#fa-main');
      if (this.root && fontAwesomeScript && fontAwesomeFont && fontAwesomeMain) {
        this.root.appendChild(fontAwesomeScript.cloneNode());
        this.root.appendChild(fontAwesomeFont.cloneNode(true));
        this.root.appendChild(fontAwesomeMain.cloneNode(true));
        clearInterval(id);
      }
    }, 200);
  }
}

customElements.define('nxt-icon', IconComponent);

export { IconComponent };
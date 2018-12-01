import { Elm } from './src/Main';
import { HotElement } from './hot-element';
import { HotPorts } from './hot-ports';

document.addEventListener('DOMContentLoaded', function() {
  let app = Elm.Main.init({ flags: null });
  HotPorts.register(app.ports, console.log);
});

customElements.define('hot-table', HotElement);

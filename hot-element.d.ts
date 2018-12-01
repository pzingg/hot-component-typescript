import Handsontable = require('handsontable');

export interface IHotElement extends HTMLElement {
  container: HTMLDivElement;
  hotInstance: Handsontable|null;
}

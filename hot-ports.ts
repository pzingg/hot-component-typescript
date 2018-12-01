import { IHotElement } from './hot-element.d';

export namespace HotPorts {

  export function register(ports: any, log: any): void {
    if (!(ports.hotFromElm && ports.hotToElm)) {
      console.log('Elm app does not define hotFromElm or hotToElm port.');
      return;
    }

    log = log || function() {};

    function assertNever(x: any): void {
      throw new Error('Unexpected object: ' + x);
    }

    function getInstance(domId: string): Handsontable|null {
      let el:IHotElement|null = document.getElementById(domId) as IHotElement;
      return el ? el.hotInstance : null;
    }

    function hotFromElm(data: any): void {
      var inst = getInstance(data.domId);
      if (inst == null) {
        log("No hotInstance for ", data.domId);
        return;
      }
      if (data.kind == 'GetSize') {
        ports.hotToElm.send({
          kind: 'Size',
          domId: data.domId,
          nRows: inst.countRows(),
          nCols: inst.countCols()
        });
      } else if (data.kind === 'GetData') {
        ports.hotToElm.send({
          kind: 'Data',
          domId: data.domId,
          tag: data.tag,
          colHeaders: inst.getColHeader(),
          data: inst.getData()
        });
      } else if (data.kind === 'SetData') {
      } else if (data.kind === 'UpdateFormat') {
      } else if (data.kind === 'AddColumn') {
      } else if (data.kind === 'RemoveColumn') {
      } else if (data.kind === 'AddRow') {
      } else if (data.kind === 'RemoveRow') {
      } else if (data.kind === 'CopyColumn') {
      } else {
        assertNever(data);
      }
    }

    ports.hotFromElm.subscribe(hotFromElm);
  }
}

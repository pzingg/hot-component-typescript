import Handsontable = require('handsontable');
import { IHotElement } from './hot-element.d';

export class HotElement extends HTMLElement implements IHotElement {
  public container: HTMLDivElement;
  public hotInstance: Handsontable|null;

  constructor() {
    super()

    var template: HTMLTemplateElement|null = document.querySelector('template#hot-table-template');
    if (template == null) {
      template = document.createElement("template");
      template.setAttribute('id', 'hot-table-template');
      template.innerHTML = `<style>
    /*!
     * (The MIT License)
     *
     * Copyright (c) 2012-2014 Marcin Warpechowski
     * Copyright (c) 2015 Handsoncode sp. z o.o. <hello@handsoncode.net>
     *
     * Permission is hereby granted, free of charge, to any person obtaining
     * a copy of this software and associated documentation files (the
     * 'Software'), to deal in the Software without restriction, including
     * without limitation the rights to use, copy, modify, merge, publish,
     * distribute, sublicense, and/or sell copies of the Software, and to
     * permit persons to whom the Software is furnished to do so, subject to
     * the following conditions:
     *
     * The above copyright notice and this permission notice shall be
     * included in all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
     * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
     * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
     * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
     * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     *
     * Version: 6.2.0
     * Release date: 14/11/2018 (built at 07/11/2018 13:01:49)
     */
    /**
     * Fix for bootstrap styles
     */
    .handsontable .table th, .handsontable .table td {
      border-top: none;
    }

    .handsontable tr {
      background: #fff;
    }

    .handsontable td {
      background-color: inherit;
    }

    .handsontable .table caption + thead tr:first-child th,
    .handsontable .table caption + thead tr:first-child td,
    .handsontable .table colgroup + thead tr:first-child th,
    .handsontable .table colgroup + thead tr:first-child td,
    .handsontable .table thead:first-child tr:first-child th,
    .handsontable .table thead:first-child tr:first-child td {
      border-top: 1px solid #CCCCCC;
    }

    /* table-bordered */
    .handsontable .table-bordered {
      border: 0;
      border-collapse: separate;
    }

    .handsontable .table-bordered th,
    .handsontable .table-bordered td {
      border-left: none;
    }

    .handsontable .table-bordered th:first-child,
    .handsontable .table-bordered td:first-child {
      border-left: 1px solid #CCCCCC;
    }

    .handsontable .table > tbody > tr > td,
    .handsontable .table > tbody > tr > th,
    .handsontable .table > tfoot > tr > td,
    .handsontable .table > tfoot > tr > th,
    .handsontable .table > thead > tr > td,
    .handsontable .table > thead > tr > th {
      line-height: 21px;
      padding: 0 4px;
    }

    .col-lg-1.handsontable, .col-lg-10.handsontable, .col-lg-11.handsontable, .col-lg-12.handsontable,
    .col-lg-2.handsontable, .col-lg-3.handsontable, .col-lg-4.handsontable, .col-lg-5.handsontable, .col-lg-6.handsontable, .col-lg-7.handsontable, .col-lg-8.handsontable, .col-lg-9.handsontable,
    .col-md-1.handsontable, .col-md-10.handsontable, .col-md-11.handsontable, .col-md-12.handsontable,
    .col-md-2.handsontable, .col-md-3.handsontable, .col-md-4.handsontable, .col-md-5.handsontable, .col-md-6.handsontable, .col-md-7.handsontable, .col-md-8.handsontable, .col-md-9.handsontable
    .col-sm-1.handsontable, .col-sm-10.handsontable, .col-sm-11.handsontable, .col-sm-12.handsontable,
    .col-sm-2.handsontable, .col-sm-3.handsontable, .col-sm-4.handsontable, .col-sm-5.handsontable, .col-sm-6.handsontable, .col-sm-7.handsontable, .col-sm-8.handsontable, .col-sm-9.handsontable
    .col-xs-1.handsontable, .col-xs-10.handsontable, .col-xs-11.handsontable, .col-xs-12.handsontable,
    .col-xs-2.handsontable, .col-xs-3.handsontable, .col-xs-4.handsontable, .col-xs-5.handsontable, .col-xs-6.handsontable, .col-xs-7.handsontable, .col-xs-8.handsontable, .col-xs-9.handsontable {
      padding-left: 0;
      padding-right: 0;
    }

    .handsontable .table-striped > tbody > tr:nth-of-type(even) {
      background-color: #FFF;
    }
    .handsontable {
      position: relative;
    }

    .handsontable .hide{
      display: none;
    }

    .handsontable .relative {
      position: relative;
    }

    .handsontable.htAutoSize {
      visibility: hidden;
      left: -99000px;
      position: absolute;
      top: -99000px;
    }

    .handsontable .wtHider {
      width: 0;
    }

    .handsontable .wtSpreader {
      position: relative;
      width: 0; /*must be 0, otherwise blank space appears in scroll demo after scrolling max to the right */
      height: auto;
    }

    .handsontable table,
    .handsontable tbody,
    .handsontable thead,
    .handsontable td,
    .handsontable th,
    .handsontable input,
    .handsontable textarea,
    .handsontable div {
      box-sizing: content-box;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
    }

    .handsontable input,
    .handsontable textarea {
      min-height: initial;
    }

    .handsontable table.htCore {
      border-collapse: separate;
      /* it must be separate, otherwise there are offset miscalculations in WebKit: http://stackoverflow.com/questions/2655987/border-collapse-differences-in-ff-and-webkit */
      /* this actually only changes appearance of user selection - does not make text unselectable */
      /* -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      -ms-user-select: none;
      user-select: none; */ /* no browser supports unprefixed version */
      border-spacing: 0;
      margin: 0;
      border-width: 0;
      table-layout: fixed;
      width: 0;
      outline-width: 0;
      cursor: default;
      /* reset bootstrap table style. for more info see: https://github.com/handsontable/handsontable/issues/224 */
      max-width: none;
      max-height: none;
    }

    .handsontable col {
      width: 50px;
    }

    .handsontable col.rowHeader {
      width: 50px;
    }

    .handsontable th,
    .handsontable td {
      border-top-width: 0;
      border-left-width: 0;
      border-right: 1px solid #CCC;
      border-bottom: 1px solid #CCC;
      height: 22px;
      empty-cells: show;
      line-height: 21px;
      padding: 0 4px 0 4px;
      /* top, bottom padding different than 0 is handled poorly by FF with HTML5 doctype */
      background-color: #FFF;
      vertical-align: top;
      overflow: hidden;
      outline-width: 0;
      white-space: pre-line;
      /* preserve new line character in cell */
      background-clip: padding-box;
    }

    .handsontable td.htInvalid {
      background-color: #ff4c42 !important; /*gives priority over td.area selection background*/
    }

    .handsontable td.htNoWrap {
      white-space: nowrap;
    }

    .handsontable th:last-child {
      /*Foundation framework fix*/
      border-right: 1px solid #CCC;
      border-bottom: 1px solid #CCC;
    }

    .handsontable tr:first-child th.htNoFrame,
    .handsontable th:first-child.htNoFrame,
    .handsontable th.htNoFrame {
      border-left-width: 0;
      background-color: white;
      border-color: #FFF;
    }

    .handsontable th:first-child,
    .handsontable th:nth-child(2),
    .handsontable td:first-of-type,
    .handsontable .htNoFrame + th,
    .handsontable .htNoFrame + td {
      border-left: 1px solid #CCC;
    }

    .handsontable.htRowHeaders thead tr th:nth-child(2) {
      border-left: 1px solid #CCC;
    }

    .handsontable tr:first-child th,
    .handsontable tr:first-child td {
      border-top: 1px solid #CCC;
    }

    .ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable tbody tr th,
    .ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable:not(.ht_clone_top) thead tr th:first-child {
      border-right-width: 0;
    }

    .ht_master:not(.innerBorderTop) thead tr:last-child th,
    .ht_master:not(.innerBorderTop) ~ .handsontable thead tr:last-child th,
    .ht_master:not(.innerBorderTop) thead tr.lastChild th,
    .ht_master:not(.innerBorderTop) ~ .handsontable thead tr.lastChild th {
      border-bottom-width: 0;
    }

    .handsontable th {
      background-color: #f0f0f0;
      color: #222;
      text-align: center;
      font-weight: normal;
      white-space: nowrap;
    }

    .handsontable thead th {
      padding: 0;
    }

    .handsontable th.active {
      background-color: #CCC;
    }
    .handsontable thead th .relative {
      padding: 2px 4px;
    }

    #hot-display-license-info {
      font-size: 10px;
      color: #323232 ;
      padding: 5px 0 3px 0;
      font-family: Helvetica, Arial, sans-serif;
      text-align: left;
    }

    /* plugins */

    /* row + column resizer*/
    .handsontable .manualColumnResizer {
      position: fixed;
      top: 0;
      cursor: col-resize;
      z-index: 110;
      width: 5px;
      height: 25px;
    }

    .handsontable .manualRowResizer {
      position: fixed;
      left: 0;
      cursor: row-resize;
      z-index: 110;
      height: 5px;
      width: 50px;
    }

    .handsontable .manualColumnResizer:hover,
    .handsontable .manualColumnResizer.active,
    .handsontable .manualRowResizer:hover,
    .handsontable .manualRowResizer.active {
      background-color: #34a9db;
    }

    .handsontable .manualColumnResizerGuide {
      position: fixed;
      right: 0;
      top: 0;
      background-color: #34a9db;
      display: none;
      width: 0;
      border-right: 1px dashed #777;
      margin-left: 5px;
    }

    .handsontable .manualRowResizerGuide {
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #34a9db;
      display: none;
      height: 0;
      border-bottom: 1px dashed #777;
      margin-top: 5px;
    }

    .handsontable .manualColumnResizerGuide.active,
    .handsontable .manualRowResizerGuide.active {
      display: block;
      z-index: 199;
    }

    .handsontable .columnSorting {
      position: relative;
    }

    .handsontable .columnSorting.sortAction:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    .handsontable span.colHeader {
      display: inline-block;
      line-height: 1.1;
    }

    /* Arrow position */
    .handsontable span.colHeader.columnSorting::before {
      /* Centering start */
      top: 50%;
      margin-top: -6px; /* One extra pixel for purpose of proper positioning of sorting arrow, when "font-size" set to default */
      /* Centering end */

      padding-left: 8px; /* For purpose of continuous mouse over experience, when moving between the "span" and the "::before" elements */
      position: absolute;
      right: -9px;

      content: '';
      height: 10px;
      width: 5px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position-x: right;
    }

    .handsontable span.colHeader.columnSorting.ascending::before {
      /* arrow up; 20 x 40 px, scaled to 5 x 10 px; base64 size: 0.3kB */
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAMAAADJ7yrpAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMABBEmRGprlJW72e77tTkTKwAAAFNJREFUeAHtzjkSgCAUBNHPgsoy97+ulGXRqJE5L+xkxoYt2UdsLb5bqFINz+aLuuLn5rIu2RkO3fZpWENimNgiw6iBYRTPMLJjGFxQZ1hxxb/xBI1qC8k39CdKAAAAAElFTkSuQmCC");
    }

    .handsontable span.colHeader.columnSorting.descending::before {
      /* arrow down; 20 x 40 px, scaled to 5 x 10 px; base64 size: 0.3kB */
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAMAAADJ7yrpAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMABBEmRGprlJW72e77tTkTKwAAAFJJREFUeAHtzjkSgCAQRNFmQYUZ7n9dKUvru0TmvPAn3br0QfgdZ5xx6x+rQn23GqTYnq1FDcnuzZIO2WmedVqIRVxgGKEyjNgYRjKGkZ1hFIZ3I70LyM0VtU8AAAAASUVORK5CYII=");
    }

    .htGhostTable .htCore span.colHeader.columnSorting:not(.indicatorDisabled)::after {
      content: '*';
      display: inline-block;
      position: relative;
      /* The multi-line header and header with longer text need more padding to not hide arrow,
      we make header wider in "GhostTable" to make some space for arrow which is positioned absolutely in the main table */
      padding-right: 20px;
    }

    /* Selection */
    .handsontable .wtBorder {
      position: absolute;
      font-size: 0;
    }
    .handsontable .wtBorder.hidden{
      display:none !important;
    }

    /* A layer order of the selection types */
    .handsontable .wtBorder.current {
      z-index: 10;
    }
    .handsontable .wtBorder.area {
      z-index: 8;
    }
    .handsontable .wtBorder.fill {
      z-index: 6;
    }

    .handsontable td.area,
    .handsontable td.area-1,
    .handsontable td.area-2,
    .handsontable td.area-3,
    .handsontable td.area-4,
    .handsontable td.area-5,
    .handsontable td.area-6,
    .handsontable td.area-7 {
      position: relative;
    }

    .handsontable td.area:before,
    .handsontable td.area-1:before,
    .handsontable td.area-2:before,
    .handsontable td.area-3:before,
    .handsontable td.area-4:before,
    .handsontable td.area-5:before,
    .handsontable td.area-6:before,
    .handsontable td.area-7:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      bottom: -100%\\9; /* Fix for IE9 to spread the ":before" pseudo element to 100% height of the parent element */
      background: #005eff;
    }

    /* Fix for IE10 and IE11 to spread the ":before" pseudo element to 100% height of the parent element */
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      .handsontable td.area:before,
      .handsontable td.area-1:before,
      .handsontable td.area-2:before,
      .handsontable td.area-3:before,
      .handsontable td.area-4:before,
      .handsontable td.area-5:before,
      .handsontable td.area-6:before,
      .handsontable td.area-7:before {
        bottom: -100%;
      }
    }

    .handsontable td.area:before {
      opacity: 0.1;
    }
    .handsontable td.area-1:before {
      opacity: 0.2;
    }
    .handsontable td.area-2:before {
      opacity: 0.27;
    }
    .handsontable td.area-3:before {
      opacity: 0.35;
    }
    .handsontable td.area-4:before {
      opacity: 0.41;
    }
    .handsontable td.area-5:before {
      opacity: 0.47;
    }
    .handsontable td.area-6:before {
      opacity: 0.54;
    }
    .handsontable td.area-7:before {
      opacity: 0.58;
    }

    .handsontable tbody th.ht__highlight,
    .handsontable thead th.ht__highlight {
      background-color: #dcdcdc;
    }

    .handsontable tbody th.ht__active_highlight,
    .handsontable thead th.ht__active_highlight {
      background-color: #8eb0e7;
      color: #000;
    }

    /* fill handle */

    .handsontable .wtBorder.corner {
      font-size: 0;
      cursor: crosshair;
    }

    .handsontable .htBorder.htFillBorder {
      background: red;
      width: 1px;
      height: 1px;
    }

    .handsontableInput {
      border: none;
      outline-width: 0;
      margin: 0;
      padding: 1px 5px 0 5px;
      font-family: inherit;
      line-height: 21px;
      font-size: inherit;
      box-shadow: 0 0 0 2px #5292F7 inset;
      resize: none;
      /*below are needed to overwrite stuff added by jQuery UI Bootstrap theme*/
      display: block;
      color: #000;
      border-radius: 0;
      background-color: #FFF;
      /*overwrite styles potentionally made by a framework*/
    }

    .handsontableInputHolder {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 104;
    }

    .htSelectEditor {
      -webkit-appearance: menulist-button !important;
      position: absolute;
      width: auto;
    }

    /*
    TextRenderer readOnly cell
    */

    .handsontable .htDimmed {
      color: #777;
    }

    .handsontable .htSubmenu {
      position: relative;
    }

    .handsontable .htSubmenu :after{
      content: '\\25B6';
      color: #777;
      position: absolute;
      right: 5px;
      font-size: 9px;
    }


    /*
    TextRenderer horizontal alignment
    */
    .handsontable .htLeft{
      text-align: left;
    }
    .handsontable .htCenter{
      text-align: center;
    }
    .handsontable .htRight{
      text-align: right;
    }
    .handsontable .htJustify{
      text-align: justify;
    }
    /*
    TextRenderer vertical alignment
    */
    .handsontable .htTop{
      vertical-align: top;
    }
    .handsontable .htMiddle{
      vertical-align: middle;
    }
    .handsontable .htBottom{
      vertical-align: bottom;
    }

    /*
    TextRenderer placeholder value
    */

    .handsontable .htPlaceholder {
      color: #999;
    }

    /*
    AutocompleteRenderer down arrow
    */

    .handsontable .htAutocompleteArrow {
      float: right;
      font-size: 10px;
      color: #EEE;
      cursor: default;
      width: 16px;
      text-align: center;
    }

    .handsontable td .htAutocompleteArrow:hover {
      color: #777;
    }

    .handsontable td.area .htAutocompleteArrow {
      color: #d3d3d3;
    }

    /*
    CheckboxRenderer
    */
    .handsontable .htCheckboxRendererInput {
      display: inline-block;
      vertical-align: middle;
    }
    .handsontable .htCheckboxRendererInput.noValue {
      opacity: 0.5;
    }
    .handsontable .htCheckboxRendererLabel {
      cursor: pointer;
      display: inline-block;
      width: 100%;
    }

    /**
     * Handsontable in Handsontable
     */

    .handsontable .handsontable.ht_clone_top .wtHider {
      padding: 0 0 5px 0;
    }

    /**
    * Autocomplete Editor
    */
    .handsontable .autocompleteEditor.handsontable {
      padding-right: 17px;
    }
    .handsontable .autocompleteEditor.handsontable.htMacScroll {
      padding-right: 15px;
    }


    /**
     * Handsontable listbox theme
     */

    .handsontable.listbox {
      margin: 0;
    }

    .handsontable.listbox .ht_master table {
      border: 1px solid #ccc;
      border-collapse: separate;
      background: white;
    }

    .handsontable.listbox th,
    .handsontable.listbox tr:first-child th,
    .handsontable.listbox tr:last-child th,
    .handsontable.listbox tr:first-child td,
    .handsontable.listbox td {
      border-color: transparent;
    }

    .handsontable.listbox th,
    .handsontable.listbox td {
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .handsontable.listbox td.htDimmed {
      cursor: default;
      color: inherit;
      font-style: inherit;
    }

    .handsontable.listbox .wtBorder {
      visibility: hidden;
    }

    .handsontable.listbox tr td.current,
    .handsontable.listbox tr:hover td {
      background: #eee;
    }

    .ht_clone_top {
      z-index: 101;
    }

    .ht_clone_left {
      z-index: 102;
    }

    .ht_clone_top_left_corner,
    .ht_clone_bottom_left_corner {
      z-index: 103;
    }

    .ht_clone_debug {
      z-index: 103;
    }

    .handsontable td.htSearchResult {
      background: #fcedd9;
      color: #583707;
    }

    /*
    Cell borders
    */
    .htBordered{
      /*box-sizing: border-box !important;*/
      border-width: 1px;
    }
    .htBordered.htTopBorderSolid {
      border-top-style: solid;
      border-top-color: #000;
    }
    .htBordered.htRightBorderSolid {
      border-right-style: solid;
      border-right-color: #000;
    }
    .htBordered.htBottomBorderSolid {
      border-bottom-style: solid;
      border-bottom-color: #000;
    }
    .htBordered.htLeftBorderSolid {
      border-left-style: solid;
      border-left-color: #000;
    }

    .handsontable tbody tr th:nth-last-child(2) {
      border-right: 1px solid #CCC;
    }

    .handsontable thead tr:nth-last-child(2) th.htGroupIndicatorContainer {
      border-bottom: 1px solid #CCC;
      padding-bottom: 5px;
    }


    .ht_clone_top_left_corner thead tr th:nth-last-child(2) {
      border-right: 1px solid #CCC;
    }

    .htCollapseButton {
      width: 10px;
      height: 10px;
      line-height: 10px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #f3f3f3;
      -webkit-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      margin-bottom: 3px;
      position: relative;
    }

    .htCollapseButton:after {
      content: "";
      height: 300%;
      width: 1px;
      display: block;
      background: #ccc;
      margin-left: 4px;
      position: absolute;
      /*top: -300%;*/
      bottom: 10px;
    }


    thead .htCollapseButton {
      right: 5px;
      position: absolute;
      top: 5px;
      background: #fff;
    }

    thead .htCollapseButton:after {
      height: 1px;
      width: 700%;
      right: 10px;
      top: 4px;
    }

    .handsontable tr th .htExpandButton {
      position: absolute;
      width: 10px;
      height: 10px;
      line-height: 10px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #f3f3f3;
      -webkit-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      top: 0;
      display: none;
    }

    .handsontable thead tr th .htExpandButton {
      /*left: 5px;*/
      top: 5px;
    }

    .handsontable tr th .htExpandButton.clickable {
      display: block;
    }

    .collapsibleIndicator {
      position: absolute;
      top: 50%;
      transform: translate(0% ,-50%);
      right: 5px;
      border: 1px solid #A6A6A6;
      line-height: 10px;
      color: #222;
      border-radius: 10px;
      font-size: 10px;
      width: 10px;
      height: 10px;
      cursor: pointer;
      -webkit-box-shadow: 0 0 0 6px rgba(238,238,238,1);
      -moz-box-shadow: 0 0 0 6px rgba(238,238,238,1);
      box-shadow: 0 0 0 6px rgba(238,238,238,1);
      background: #eee;
    }

    .handsontable col.hidden {
      width: 0 !important;
    }

    .handsontable table tr th.lightRightBorder {
      border-right: 1px solid #E6E6E6;
    }

    .handsontable tr.hidden,
    .handsontable tr.hidden td,
    .handsontable tr.hidden th {
      display: none;
    }

    .ht_master,
    .ht_clone_left,
    .ht_clone_top,
    .ht_clone_bottom {
      overflow: hidden;
    }

    .ht_master .wtHolder {
      overflow: auto;
    }

    .handsontable .ht_master thead,
    .handsontable .ht_master tr th,
    .handsontable .ht_clone_left thead {
      visibility: hidden;
    }

    .ht_clone_top .wtHolder,
    .ht_clone_left .wtHolder,
    .ht_clone_bottom .wtHolder {
      overflow: hidden;
    }
    /*

     Handsontable Mobile Text Editor stylesheet

     */

    .handsontable.mobile,
    .handsontable.mobile .wtHolder {
      -webkit-touch-callout:none;
      -webkit-user-select:none;
      -khtml-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      -webkit-overflow-scrolling: touch;
    }

    .htMobileEditorContainer {
      display: none;
      position: absolute;
      top: 0;
      width: 70%;
      height: 54pt;
      background: #f8f8f8;
      border-radius: 20px;
      border: 1px solid #ebebeb;
      z-index: 999;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -webkit-text-size-adjust: none;
    }

    .topLeftSelectionHandle:not(.ht_master .topLeftSelectionHandle),
    .topLeftSelectionHandle-HitArea:not(.ht_master .topLeftSelectionHandle-HitArea) {
      z-index: 9999;
    }

    /* Initial left/top coordinates - overwritten when actual position is set */
    .topLeftSelectionHandle,
    .topLeftSelectionHandle-HitArea,
    .bottomRightSelectionHandle,
    .bottomRightSelectionHandle-HitArea {
      left: -10000px;
      top: -10000px;
    }

    .htMobileEditorContainer.active {
      display: block;
    }

    .htMobileEditorContainer .inputs {
      position: absolute;
      right: 210pt;
      bottom: 10pt;
      top: 10pt;
      left: 14px;
      height: 34pt;
    }

    .htMobileEditorContainer .inputs textarea {
      font-size: 13pt;
      border: 1px solid #a1a1a1;
      -webkit-appearance: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      position: absolute;
      left: 14px;
      right: 14px;
      top: 0;
      bottom: 0;
      padding: 7pt;
    }

    .htMobileEditorContainer .cellPointer {
      position: absolute;
      top: -13pt;
      height: 0;
      width: 0;
      left: 30px;

      border-left: 13pt solid transparent;
      border-right: 13pt solid transparent;
      border-bottom: 13pt solid #ebebeb;
    }

    .htMobileEditorContainer .cellPointer.hidden {
      display: none;
    }

    .htMobileEditorContainer .cellPointer:before {
      content: '';
      display: block;
      position: absolute;
      top: 2px;
      height: 0;
      width: 0;
      left: -13pt;

      border-left: 13pt solid transparent;
      border-right: 13pt solid transparent;
      border-bottom: 13pt solid #f8f8f8;
    }

    .htMobileEditorContainer .moveHandle {
      position: absolute;
      top: 10pt;
      left: 5px;
      width: 30px;
      bottom: 0px;
      cursor: move;
      z-index: 9999;
    }

    .htMobileEditorContainer .moveHandle:after {
      content: "..\\A..\\A..\\A..";
      white-space: pre;
      line-height: 10px;
      font-size: 20pt;
      display: inline-block;
      margin-top: -8px;
      color: #ebebeb;
    }

    .htMobileEditorContainer .positionControls {
      width: 205pt;
      position: absolute;
      right: 5pt;
      top: 0;
      bottom: 0;
    }

    .htMobileEditorContainer .positionControls > div {
      width: 50pt;
      height: 100%;
      float: left;
    }

    .htMobileEditorContainer .positionControls > div:after {
      content: " ";
      display: block;
      width: 15pt;
      height: 15pt;
      text-align: center;
      line-height: 50pt;
    }

    .htMobileEditorContainer .leftButton:after,
    .htMobileEditorContainer .rightButton:after,
    .htMobileEditorContainer .upButton:after,
    .htMobileEditorContainer .downButton:after {
      transform-origin: 5pt 5pt;
      -webkit-transform-origin: 5pt 5pt;
      margin: 21pt 0 0 21pt;
    }

    .htMobileEditorContainer .leftButton:after {
      border-top: 2px solid #288ffe;
      border-left: 2px solid #288ffe;
      -webkit-transform: rotate(-45deg);
      /*margin-top: 17pt;*/
      /*margin-left: 20pt;*/
    }
    .htMobileEditorContainer .leftButton:active:after {
      border-color: #cfcfcf;
    }

    .htMobileEditorContainer .rightButton:after {
      border-top: 2px solid #288ffe;
      border-left: 2px solid #288ffe;
      -webkit-transform: rotate(135deg);
      /*margin-top: 17pt;*/
      /*margin-left: 10pt;*/
    }
    .htMobileEditorContainer .rightButton:active:after {
      border-color: #cfcfcf;
    }

    .htMobileEditorContainer .upButton:after {
      /*border-top: 2px solid #cfcfcf;*/
      border-top: 2px solid #288ffe;
      border-left: 2px solid #288ffe;
      -webkit-transform: rotate(45deg);
      /*margin-top: 22pt;*/
      /*margin-left: 15pt;*/
    }
    .htMobileEditorContainer .upButton:active:after {
      border-color: #cfcfcf;
    }

    .htMobileEditorContainer .downButton:after {
      border-top: 2px solid #288ffe;
      border-left: 2px solid #288ffe;
      -webkit-transform: rotate(225deg);
      /*margin-top: 15pt;*/
      /*margin-left: 15pt;*/
    }
    .htMobileEditorContainer .downButton:active:after {
      border-color: #cfcfcf;
    }

    .handsontable.hide-tween {
      -webkit-animation: opacity-hide 0.3s;
      animation: opacity-hide 0.3s;
      animation-fill-mode: forwards;
      -webkit-animation-fill-mode: forwards;
    }

    .handsontable.show-tween {
      -webkit-animation: opacity-show 0.3s;
      animation: opacity-show 0.3s;
      animation-fill-mode: forwards;
      -webkit-animation-fill-mode: forwards;
    }
    .htCommentCell {
        position: relative;
    }

    .htCommentCell:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        border-left: 6px solid transparent;
        border-top: 6px solid black;
    }

    .htComments {
        display: none;
        z-index: 1059;
        position: absolute;
    }

    .htCommentTextArea {
        box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px, rgba(0, 0, 0, 0.239216) 0 1px 2px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: none;
        border-left: 3px solid #ccc;
        background-color: #fff;
        width: 215px;
        height: 90px;
        font-size: 12px;
        padding: 5px;
        outline: 0px !important;
        -webkit-appearance: none;
    }

    .htCommentTextArea:focus {
        box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px, rgba(0, 0, 0, 0.239216) 0 1px 2px, inset 0 0 0 1px #5292f7;
        border-left: 3px solid #5292f7;
    }
    /*!
     * Handsontable ContextMenu
     */

    .htContextMenu:not(.htGhostTable) {
      display: none;
      position: absolute;
      z-index: 1060; /* needs to be higher than 1050 - z-index for Twitter Bootstrap modal (#1569) */
    }

    .htContextMenu .ht_clone_top,
    .htContextMenu .ht_clone_left,
    .htContextMenu .ht_clone_corner,
    .htContextMenu .ht_clone_debug {
      display: none;
    }

    .htContextMenu table.htCore {
      border: 1px solid #ccc;
      border-bottom-width: 2px;
      border-right-width: 2px;
    }

    .htContextMenu .wtBorder {
      visibility: hidden;
    }

    .htContextMenu table tbody tr td {
      background: white;
      border-width: 0;
      padding: 4px 6px 0 6px;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .htContextMenu table tbody tr td:first-child {
      border: 0;
    }

    .htContextMenu table tbody tr td.htDimmed {
      font-style: normal;
      color: #323232;
    }

    .htContextMenu table tbody tr td.current,
    .htContextMenu table tbody tr td.zeroclipboard-is-hover {
      background: #f3f3f3;
    }

    .htContextMenu table tbody tr td.htSeparator {
      border-top: 1px solid #e6e6e6;
      height: 0;
      padding: 0;
      cursor: default;
    }

    .htContextMenu table tbody tr td.htDisabled {
      color: #999;
      cursor: default;
    }

    .htContextMenu table tbody tr td.htDisabled:hover {
      background: #fff;
      color: #999;
      cursor: default;
    }

    .htContextMenu table tbody tr.htHidden {
      display: none;
    }

    .htContextMenu table tbody tr td .htItemWrapper {
      margin-left: 10px;
      margin-right: 6px;
    }

    .htContextMenu table tbody tr td div span.selected {
      margin-top: -2px;
      position: absolute;
      left: 4px;
    }

    .htContextMenu .ht_master .wtHolder {
      overflow: hidden;
    }
    textarea#HandsontableCopyPaste {
      position: fixed !important;
      top: 0 !important;
      right: 100% !important;
      overflow: hidden;
      opacity: 0;
      outline: 0 none !important;
    }
    .htRowHeaders .ht_master.innerBorderLeft ~ .ht_clone_top_left_corner th:nth-child(2),
    .htRowHeaders .ht_master.innerBorderLeft ~ .ht_clone_left td:first-of-type {
      border-left: 0 none;
    }
    .handsontable .wtHider {
      position: relative;
    }
    .handsontable.ht__manualColumnMove.after-selection--columns thead th.ht__highlight {
      cursor: move;
      cursor: -moz-grab;
      cursor: -webkit-grab;
      cursor: grab;
    }
    .handsontable.ht__manualColumnMove.on-moving--columns,
    .handsontable.ht__manualColumnMove.on-moving--columns thead th.ht__highlight {
      cursor: move;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
      cursor: grabbing;
    }
    .handsontable.ht__manualColumnMove.on-moving--columns .manualColumnResizer {
      display: none;
    }
    .handsontable .ht__manualColumnMove--guideline,
    .handsontable .ht__manualColumnMove--backlight {
      position: absolute;
      height: 100%;
      display: none;
    }
    .handsontable .ht__manualColumnMove--guideline {
      background: #757575;
      width: 2px;
      top: 0;
      margin-left: -1px;
      z-index: 105;
    }
    .handsontable .ht__manualColumnMove--backlight {
      background: #343434;
      background: rgba(52, 52, 52, 0.25);
      display: none;
      z-index: 105;
      pointer-events: none;
    }
    .handsontable.on-moving--columns.show-ui .ht__manualColumnMove--guideline,
    .handsontable.on-moving--columns .ht__manualColumnMove--backlight {
      display: block;
    }
    .handsontable .wtHider {
      position: relative;
    }
    .handsontable.ht__manualRowMove.after-selection--rows tbody th.ht__highlight {
      cursor: move;
      cursor: -moz-grab;
      cursor: -webkit-grab;
      cursor: grab;
    }
    .handsontable.ht__manualRowMove.on-moving--rows,
    .handsontable.ht__manualRowMove.on-moving--rows tbody th.ht__highlight {
      cursor: move;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
      cursor: grabbing;
    }
    .handsontable.ht__manualRowMove.on-moving--rows .manualRowResizer {
      display: none;
    }
    .handsontable .ht__manualRowMove--guideline,
    .handsontable .ht__manualRowMove--backlight {
      position: absolute;
      width: 100%;
      display: none;
    }
    .handsontable .ht__manualRowMove--guideline {
      background: #757575;
      height: 2px;
      left: 0;
      margin-top: -1px;
      z-index: 105;
    }
    .handsontable .ht__manualRowMove--backlight {
      background: #343434;
      background: rgba(52, 52, 52, 0.25);
      display: none;
      z-index: 105;
      pointer-events: none;
    }
    .handsontable.on-moving--rows.show-ui .ht__manualRowMove--guideline,
    .handsontable.on-moving--rows .ht__manualRowMove--backlight {
      display: block;
    }
    .handsontable tbody td[rowspan][class*="area"][class*="highlight"]:not([class*="fullySelectedMergedCell"]):before {
        opacity: 0;
    }

    .handsontable tbody td[rowspan][class*="area"][class*="highlight"][class*="fullySelectedMergedCell-multiple"]:before {
        opacity: 0.1;
    }

    .handsontable tbody td[rowspan][class*="area"][class*="highlight"][class*="fullySelectedMergedCell-0"]:before {
        opacity: 0.1;
    }

    .handsontable tbody td[rowspan][class*="area"][class*="highlight"][class*="fullySelectedMergedCell-1"]:before {
        opacity: 0.2;
    }

    .handsontable tbody td[rowspan][class*="area"][class*="highlight"][class*="fullySelectedMergedCell-2"]:before {
        opacity: 0.27;
    }

    .handsontable tbody td[rowspan][class*="area"][class*="highlight"][class*="fullySelectedMergedCell-3"]:before {
        opacity: 0.35;
    }

    .handsontable tbody td[rowspan][class*="area"][class*="highlight"][class*="fullySelectedMergedCell-4"]:before {
        opacity: 0.41;
    }

    .handsontable tbody td[rowspan][class*="area"][class*="highlight"][class*="fullySelectedMergedCell-5"]:before {
        opacity: 0.47;
    }

    .handsontable tbody td[rowspan][class*="area"][class*="highlight"][class*="fullySelectedMergedCell-6"]:before {
        opacity: 0.54;
    }

    .handsontable tbody td[rowspan][class*="area"][class*="highlight"][class*="fullySelectedMergedCell-7"]:before {
        opacity: 0.58;
    }

    /*# sourceMappingURL=handsontable.css.map*/
    </style>`;
    }
    const templateContent = template.content;

    // Create a shadow root
    this.hotInstance = null;
    this.container = document.createElement("div");
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(templateContent.cloneNode(true));
    shadowRoot.appendChild(this.container);
  }

  /*
  static get observedAttributes() {
    return ['datarows'];
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    if (attrName == 'datarows') {

    }
  }
  */

  connectedCallback() {
    var data: any = null;
    const datarows = this.getAttribute('datarows');
    if (datarows != null) {
      data = JSON.parse(datarows);
    }
    this.hotInstance = new Handsontable(this.container, {
      data: data,
      rowHeaders: true,
      colHeaders: true
    })
  }

  disconnectedCallback() {
    if (this.hotInstance) {
      this.hotInstance.destroy()
      this.hotInstance = null;
    }
  }
}

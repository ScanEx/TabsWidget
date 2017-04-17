import './TabsWidget.css';
import { EventTarget } from 'lib/EventTarget/src/EventTarget.js';

class TabsWidget extends EventTarget {
    constructor(container, {tabs, current = 0}) {
        super();
        this._container = container;
        this._container.classList.add('tabs-widget');        
        this._current = current;
        this._container.insertAdjacentHTML('afterbegin', this._render(tabs));
        this._tabs = [];        
        let ts = this._container.querySelectorAll('.tabs-widget-tab');
        for (let i = 0; i < ts.length; ++i){
            this._tabs.push(ts[i]);
            ts[i].addEventListener('click', this._handleTabClick.bind(this, i));
        }
    }
    _handleTabClick (i) {
        this.current = i;
    }
    _renderTab(text) {
        return `<div class="tabs-widget-tab">${text}</div>`;
    }
    _render(tabs) {
        let pages = this._container.children;
        let html = [];
        this._pages = [];
        for (let i = 0; i < pages.length; ++i){            
            pages[i].classList.add('tabs-widget-page');
            pages[i].style.display = (i == this._current) ? 'block' : 'none';
            if(i === 0) {
                pages[i].classList.add('tabs-widget-page-first');
            }            
            html.push(this._renderTab(tabs[i]));
            this._pages.push(pages[i]);
        }
        return `<div class="tabs-widget-header">${html.join('')}</div>`;
    }
    get current (){
        return this._current;
    }
    set current (value) {
        this._current = value;
        for (let i = 0; i < this._pages.length; ++i){
            this._pages[i].style.display = (i == this._current) ? 'block' : 'none';
        }
        this.dispatchEvent(new CustomEvent('changetab', { detail: this.current }));
    }
}

export { TabsWidget };
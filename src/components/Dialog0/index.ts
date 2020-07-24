import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import DialogCmp from './DialogCmp'


export {ButtonAction} from './style'

export enum ETheme {
	PRIMARY = 'var(--focus)',
	SECONDARY = 'var(--gray)'
}

export interface IButtonAction {
  color: ETheme
  glossy?:boolean
}


export enum EType {
  FORM = 'form',
  CONFIRM = 'confirm',
  ALERT = ''
}

export interface IDialog {
  type?: EType
  title: string
  content: (()=>ReactNode) 
  draggable?: boolean
  iconClose?: boolean

  onOk?: () => void
  onCancel?: () => void

  footerBootons?: ReactNode[] | React.FC<IButtonAction>[]

}

class Dialog {
  public props: IDialog

  private id: string

  constructor(props: IDialog) {
    this.props = props
    this.props.draggable = props.draggable !== undefined ? props.draggable : false
    this.props.type = props.type || EType.CONFIRM

    this.props.iconClose = props.iconClose !== undefined ? props.iconClose : true

    this.props.onOk = props.onOk || (() => { })

    this.props.onCancel = props.onCancel || (() => { })

    this.id = Math.random().toString()

  }

  private onHideHandler(e: Event) {
    const eve = e as CustomEvent<string>
    if (eve.detail === 'ok') {
      if (this.props.onOk) {
        this.hide()
        this.props.onOk()
      }
    } else {
      if (this.props.onCancel) {
        this.hide()
        this.props.onCancel()
      }
    }
  }

  public show() {

    // debe ser los mismos parametros que se reciven en DialogCmp.tsx
    const component = React.createElement(DialogCmp, { ...this.props })

    // const component = ReactDOM.createPortal(DialogCmp, document.body)

    const container = document.createElement('div')

    container.addEventListener("onHide", (e) => this.onHideHandler(e))


    container.style.cssText = `position: absolute;
    top: 40%;
    left: 50%;
    width: 95%;
    transform: translate(-50%, -50%);z-index: 10;`

    container.id = this.id

    const root = document.getElementById('root')
    if (root) {

      const backCover = document.createElement('div')
      backCover.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      background-color: black;
      opacity: 0.6;
      width: 100vw;
      height: 100vh;
      z-index: 0;`
      backCover.classList.add('back-cover')
      document.body.appendChild(backCover)

      root.appendChild(container)
      if (this.props.draggable) {
        let isDragging = false

        root.addEventListener('mousedown', (e: MouseEvent) => {
          this.onMouseDown(e, container, isDragging)
        })
      }
      ReactDOM.render(component, container)
    }
  }


  public hide() {
    const container = document.getElementById(this.id)
    if (container) {
      container.classList.remove('show')
      container.classList.add('hide')

      document.querySelectorAll('.back-cover').forEach(el => {
        el.remove()
      })
      ReactDOM.unmountComponentAtNode(container)
      container.remove()
      container.removeEventListener("onHide", (e) => this.onHideHandler(e))

    }
  }

  private onMouseDown(event: MouseEvent, dragElement: HTMLDivElement, isDragging: boolean) {

    // let dragElement = document.body.closest('.draggable');
    if (!dragElement) return;

    event.preventDefault();

    dragElement.ondragstart = function () {
      return false;
    };

    let shiftX: number, shiftY: number;

    startDrag(dragElement, event.clientX, event.clientY);

    function onMouseUp(event: MouseEvent) {
      finishDrag();
    };

    function onMouseMove(event: MouseEvent) {
      moveAt(event.clientX, event.clientY);
    }

    // on drag start:
    //   remember the initial shift
    //   move the element position:fixed and a direct child of body
    function startDrag(element: HTMLDivElement, clientX: number, clientY: number) {
      if (isDragging) {
        return;
      }

      isDragging = true;

      document.addEventListener('mousemove', onMouseMove);
      element.addEventListener('mouseup', onMouseUp);

      shiftX = clientX - element.getBoundingClientRect().left;
      shiftY = clientY - element.getBoundingClientRect().top;
      if (element) {

        element.style.position = 'fixed'
        element.style.transform = 'none'

      }


      moveAt(clientX, clientY);
    };

    function finishDrag() {
      if (!isDragging) {
        return;
      }
      isDragging = false;

      dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
      dragElement.style.position = 'absolute';

      document.removeEventListener('mousemove', onMouseMove);
      dragElement.removeEventListener('mouseup', onMouseUp);
    }

    function moveAt(clientX: number, clientY: number) {
      // new window-relative coordinates
      let newX = clientX - shiftX;
      let newY = clientY - shiftY;

      let newBottom = newY + dragElement.offsetHeight;

      if (newBottom > document.documentElement.clientHeight) {
        let docBottom = document.documentElement.getBoundingClientRect().bottom;

        let scrollY = Math.min(docBottom - newBottom, 10);

        if (scrollY < 0) scrollY = 0;

        window.scrollBy(0, scrollY);

        newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
      }

      if (newY < 0) {
        // scroll up
        let scrollY = Math.min(-newY, 10);
        if (scrollY < 0) scrollY = 0;

        window.scrollBy(0, -scrollY);
        newY = Math.max(newY, 0);
      }
      if (newX < 0) newX = 0;
      if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
        newX = document.documentElement.clientWidth - dragElement.offsetWidth;
      }

      dragElement.style.left = newX + 'px';
      dragElement.style.top = newY + 'px';
    }

  }

}

export default Dialog
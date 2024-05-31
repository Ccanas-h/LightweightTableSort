import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appAddSortIconHover]',
  standalone: true
})
export class AddSortIconHoverDirective {

  @Input() sortField: any;
  @Input() sortDirection: any;
  @Input() campoSelected: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    const iconElement = this.el.nativeElement.querySelector('i');
    if (!iconElement?.classList?.value?.includes('notChange')) {
      this.setClass(iconElement, 'fas fa-arrow-up fa-xs');
      this.setStyle(iconElement, 'color', '#B2B2B2');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    const iconElement = this.el.nativeElement.querySelector('i');
    if (!iconElement?.classList?.value?.includes('notChange')) {
      this.setClass(iconElement, '');
      this.removeStyle(iconElement, 'color');
    }
  }

  private setClass(element: HTMLElement, className: string) {
    this.renderer.setAttribute(element, 'class', className);
  }

  ngOnChanges() {
    const iconElement = this.el.nativeElement.querySelector('i');
    let classAdded = this.addClassToHeader(this.campoSelected);
    if (classAdded != '') {
      this.setClass(iconElement, classAdded);
      this.removeStyle(iconElement, 'color');
    } else {
      this.setClass(iconElement, '');
    }
  }

  addClassToHeader(campoSelected: string) : any {
    if (campoSelected == this.sortField) {
      if (this.sortDirection == 'asc') return "fas fa-arrow-up fa-xs notChange";
      else if (this.sortDirection == 'desc') return "fas fa-arrow-down fa-xs notChange";
    } else {
      return ''
    }
  }

  private setStyle(element: HTMLElement, styleName: string, styleValue: string) {
    this.renderer.setStyle(element, styleName, styleValue);
  }

  private removeStyle(element: HTMLElement, styleName: string) {
    this.renderer.removeStyle(element, styleName);
  }


}

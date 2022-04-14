import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hover]'
})
export class HoverDirective {

  constructor(public elementRef:ElementRef) { }
  @Input('hover') hoverClass: string = '';  

  @HostListener('mouseenter') onMouseEnter() {
    console.log('enter')
    this.elementRef.nativeElement.classList.add(this.hoverClass);
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    console.log('leave')
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
  }

}

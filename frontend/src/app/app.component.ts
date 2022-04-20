import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
@HostListener('mousemove', ['$event']) onMouseMove(event: any) {
  this.mousePosition = { x: event.clientX, y: event.clientY}
}
  
mousePosition: {x:number, y:number} ={ x: 0, y:0 }

constructor() { }

  mouseIntersect(id: string): boolean {
    const element = document.getElementById(id)
    const series = element?.parentElement
    const seriesElements = Array.prototype.slice.call(series?.children)
    const elementBounds: DOMRect = seriesElements.find(child => child.id === id).getBoundingClientRect()
    const y = this.checkBounds(this.mousePosition.y, elementBounds.top, elementBounds.bottom)
    const x = this.checkBounds(this.mousePosition.x, elementBounds.left, elementBounds.right)
    return y && x
  }

  checkBounds(value:number, min: number, max:number): boolean {
    return value > min && value < max
  }

}

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
currentIndex: number = 0

constructor() { 
  const timerLoop = () => { 
    this.currentIndex++ 
    this.currentIndex = this.currentIndex === 7 ? 0 : this.currentIndex
  }
  setInterval(timerLoop, 2000);
}

  getElementBounds(id: string): DOMRect {
    const element = document.getElementById(id)
    const series = element?.parentElement
    const seriesElements = Array.prototype.slice.call(series?.children)
    return seriesElements.find(child => child.id === id).getBoundingClientRect()
  }

  mouseIntersect(id: string): boolean {
    const elementBounds: DOMRect = this.getElementBounds(id)
    const x = this.checkBounds(this.mousePosition.x, elementBounds.left, elementBounds.right)
    const y = this.checkBounds(this.mousePosition.y, elementBounds.top, elementBounds.bottom)
    return x && y
  }

  checkBounds(value:number, min: number, max:number): boolean {
    return value > min && value < max
  }

  elementClass(id: string): string {
    const element = document.getElementById(id)
    const active = element?.classList.contains('active');
    if(!active) {
      this.currentIndex = 0
      return ''
    }

    switch (this.currentIndex) {
      case 0: return 'red'
      case 1: return 'organge'
      case 2: return 'yellow'
      case 3: return 'green'
      case 4: return 'blue'
      case 5: return 'indigo'
      case 6: return 'violet'
      default: return ''
    }
  }
}

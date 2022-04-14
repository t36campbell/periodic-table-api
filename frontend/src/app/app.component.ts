import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('elementMask') elementMask: any

constructor(private renderer:Renderer2) { }

  ngAfterViewInit(): void {
    const elementMask = this.elementMask as ElementRef
    const series = Array.prototype.slice.call(elementMask.nativeElement.nextSibling.lastChild.children)
      series.forEach((child: any, index: number) => {
        console.log(index,child)
        // this.renderer.addClass(child.firstChild, 'element')
        const position = child.firstChild.getBoundingClientRect();
        console.log(child.firstChild.id,position)
      });
  }

  log(event:any): void {
    console.log(event)
  }

}

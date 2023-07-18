import { Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFontSize]',
})
export class FontSizeDirective{

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
  }

  @Input()
  set appFontSize(pixeles: string) {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-size',
       pixeles + "px"
    );
  }

}

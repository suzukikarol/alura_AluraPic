import { Directive, Renderer, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { ElementRef } from "@angular/core";
import { UserService } from "../../../core/user/user.service";

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    currentDisplay: string;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        //diretiva carregada, peguei o valor do display atual
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
        //aguardo uma imessão do meu observable, quando ele emitir
        //ai eu seto um loggind
        this.userService.getUser().subscribe(user => {
            if (user) {
                //se tiver o loggin true mostro o display do menu
                this.renderer.setElementStyle(this.element.nativeElement, 'diplay', this.currentDisplay)
            } else {
                //caso o contrário não exibo valor nenhum em menu
                this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
                this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
            }
        })
    }
}
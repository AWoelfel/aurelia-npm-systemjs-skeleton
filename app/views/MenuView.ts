import {View} from "../components/View";
import {useView, autoinject} from 'aurelia-framework';
import {ViewElement} from "../components/ViewElement";

@useView('./Views/MenuView.html')
export abstract class MenuView extends View {

    protected leftMenu : HTMLElement;
    protected rightMenu : HTMLElement;

    leftMenuView : View;
    rightMenuView : View;

    public abstract getContentViewName() : string;

    public getClassName():string {
        return "MenuView";
    }
    public getTitle():string {
        return "Menu";
    }

    private clearStates(target:HTMLElement) : void {
        target.classList.remove("close");
        target.classList.remove("open");
        target.classList.remove("animateClose");
        target.classList.remove("animateOpen");
    }

    private isOpen(target:HTMLElement) : boolean {
        return target.classList.contains("open");
    }

    protected  openMenu(target:HTMLElement) : void{
        if (target) {
            this.clearStates(target);
            target.classList.add("open");
            target.classList.add("animateOpen");
        }
    }

    protected  closeMenu(target:HTMLElement) : void{
        if (target) {
            this.clearStates(target);
            target.classList.add("close");
            target.classList.add("animateClose");
        }
    }

    protected toggleMenu(target:HTMLElement) : void{
        if (target) {
            if (this.isOpen(target)) {
                this.closeMenu(target);
            } else {
                this.openMenu(target);
            }
        }
    }

    public closeLeft() {
        this.closeMenu(this.leftMenu);
    }

    public openLeft() {
        this.openMenu(this.leftMenu);
    }

    public closeRight() {
        this.closeMenu(this.rightMenu);
    }

    public openRight() {
        this.openMenu(this.rightMenu);
    }
}

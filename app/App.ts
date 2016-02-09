/// <reference path="../typings/tsd.d.ts" />

export class App {

    public myVariable: string = "bla blub";

    public buttonClicked(): void {
        this.myVariable = "blub bla";
    }
}

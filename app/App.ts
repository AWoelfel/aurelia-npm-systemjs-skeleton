/// <reference path="../typings/tsd.d.ts" />

import {MainView} from "./views/MainView";
import {View} from "./components/View";

import {inject,bindable } from 'aurelia-framework';

@inject(MainView)
export class App {

    public static currentApp : App;

    @bindable content:View;

    constructor(mainStartupView: View) {
        this.content = mainStartupView;

        if (App.currentApp) {
            throw new Error("only one instance of App is allowed at a time");
        }

        App.currentApp = this;
    }

}

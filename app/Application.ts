/// <reference path="../typings/tsd.d.ts" />

import {Aurelia, LogManager} from "aurelia-framework";

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    LogManager.setLevel(3);

    aurelia.start().then(() => aurelia.setRoot("app/App"));
}

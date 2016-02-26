import {ViewElement} from './ViewElement'

export abstract class View extends ViewElement {
    public abstract getClassName() : string;
    public abstract getTitle() : string;
}

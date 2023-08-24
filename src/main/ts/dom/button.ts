import DOMElement from "./dom-element.js";

export class Button extends DOMElement<HTMLButtonElement>
{

    public constructor(button: HTMLButtonElement)
    {
        super(button);
    }

    public addClickEventListener(triggeredFunction: (this: HTMLButtonElement, mouseEvent: MouseEvent) => unknown): void
    {
        if (this.domElement !== null)
        {
            this.domElement.addEventListener("click", triggeredFunction);
        }
    }
}

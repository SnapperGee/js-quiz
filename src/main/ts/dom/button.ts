import { DOMElement } from "./dom-element.js";

export class Button extends DOMElement<HTMLButtonElement>
{

    public constructor(htmlButtonElement: HTMLButtonElement)
    {
        super(htmlButtonElement);
    }

    public addClickEventListener(triggeredFunction: (this: HTMLButtonElement, mouseEvent: MouseEvent) => unknown): void
    {
        if (this.domElement !== null)
        {
            this.domElement.addEventListener("click", triggeredFunction);
        }
    }
}

export function button(htmlButtonElement: HTMLButtonElement | null): Button
{
    return new Button(htmlButtonElement!);
}

export default button;

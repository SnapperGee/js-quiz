export abstract class DOMElement<ElementType extends HTMLElement>
{
    readonly #domElement: ElementType;
    readonly #originalDisplayStatus: string;

    protected constructor(elementType: NonNullable<ElementType>)
    {
        this.#domElement = elementType;
        this.#originalDisplayStatus = this.#domElement.style.display;
    }

    public get domElement(): ElementType | null { return this.#domElement; }
    public get id(): string { return this.#domElement.id; }

    public hide(): void { this.#domElement.style.display = "none"; }
    public show(): void { this.#domElement.style.display = this.#originalDisplayStatus; }
    public remove(): void
    {
        if (document.body.contains(this.#domElement))
        {
            this.#domElement.remove();
        }
    }

    public appendChildren(...elements: readonly HTMLElement[]): void
    {
        if (elements.length === 1)
        {
            this.#domElement.appendChild(elements[0]);
        }
        else if (elements.length > 1)
        {
            const fragment = document.createDocumentFragment();
            elements.forEach(element => fragment.appendChild(element));
            this.#domElement.appendChild(fragment);
        }
    }
}

export default DOMElement;

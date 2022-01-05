export class Product {
    constructor(
        public _id: string,
        public name: string,
        public price: number,
        public stock: boolean,
        public cant: number,
        public category: string
    ){}
}
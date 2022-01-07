import { Product } from "./product";

export class SaleTrolley {
    constructor(
        public product: Product,
        public cant: number,
    ){}
}
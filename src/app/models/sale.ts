import { SaleTrolley } from "./saleTrolley";

export class Sale {
    constructor(
        public _id: string,
        public total: number,
        public listProducts: SaleTrolley[],
        public date: string,
        public fiado: boolean
    ){}
}
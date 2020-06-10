import { ProductList } from '../product-list/product-list.model' 

class Details{
    detailType: string;
    detailDesc: string;
}

export class Product{
    public id: string;
    public name: string;
    public imagePath: string;
    public description: string;
    public price: number;
    public isBestSeller:boolean;

    public details: Details[];
}
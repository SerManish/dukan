import { ProductList } from '../product-list/product-list.model' 

class Details{
    detailType: string;
    detailDesc: string;
}

export class Product{
    public basicDetails: ProductList;
    public details: Details[];
}
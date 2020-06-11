class Details{
    detailType: string;
    detailDesc: string;
}

export interface Product{
    id: string;
    category: string;
    name: string;
    imagePath: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    details: Details[];
    isBestSeller:boolean;
}
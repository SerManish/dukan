class Details{
    detailType: string;
    detailDesc: string;
}

export class Product{
    public id: string;
    public category: string;
    public name: string;
    public imagePath: string;
    public shortDescription: string;
    public longDescription: string;
    public price: number;
    public isBestSeller:boolean;
    public details: Details[];
}
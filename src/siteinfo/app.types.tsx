export interface Product {
    id: number;
    name: string;
    slug: string;
    medium: string;
    size: string;
    price: string;
    prints: {sizes: string, price: string}[];
    image: string;
    description: string;
}


export type Series = {
    title: string,
    image: string,
    banner: string,
    background: string,
    id: number,
    images: string[],
    supportingImages: string[],
    accent: string,
    find: (s:any)=>{}

}
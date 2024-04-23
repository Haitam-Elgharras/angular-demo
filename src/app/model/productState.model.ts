import { Product } from "./product.model";

export interface ProductState {
    products: Product[];
    keyword: string;
    totalPages: number;
    pageSize: number;
    currentPage: number;
    totalProducts: number;
    status: string;
    error: any;
}
export interface TProduct {
  id: number;
  name: string;
  category: string;
  categoryId: number;
  price: number;
  des: string;
  qty: number;
  url1: string;
  url2: string;
}
export const defaultProductValue: TProduct = {
  id: 0,
  name: '',
  category: '',
  categoryId: 0,
  price: 0,
  des: '',
  qty: 0,
  url1: '',
  url2: '',
};

import { Product } from 'types/product';

export const PRODUCTS_MOCK = [
  {
    id: 1,
    name: 'Kiên trì hay từ bỏ',
    url: 'https://salt.tikicdn.com/cache/280x280/ts/product/6e/41/a2/721878ef916620dbcc7ff569adcd577d.jpg',
    price: 200000,
    rating: 5,
  },
  {
    id: 2,
    name: 'Rèn luyện tư duy phản biện',
    url: 'https://salt.tikicdn.com/cache/w444/ts/product/22/cb/a9/524a27dcd45e8a13ae6eecb3dfacba7c.jpg',
    price: 200000,
    rating: 3,
  },
] as unknown as Product[];

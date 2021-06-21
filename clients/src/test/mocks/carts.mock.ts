import { ProductCart } from 'types/product-cart';

export const CARTS_MOCK = [
  {
    id: 1624165261,
    name: 'Tâm lý học hạnh phúc',
    url: 'https://salt.tikicdn.com/cache/280x280/ts/product/59/e3/e7/642ce38017ac1d35f2e87234b6fd56f2.jpg',
    price: 200000,
    quantity: 1,
  },
  {
    id: 1624165262,
    name: 'Dạy con học ít hiểu nhiều',
    url: 'https://salt.tikicdn.com/cache/280x280/ts/product/5f/36/dd/c64c91016b320ae4591efcf93d0ebf30.jpg',
    price: 200000,
    quantity: 1,
  },
] as ProductCart[];

export const GET_PRODUCTS_IN_CART_MOCK = {
  data: {
    getProductsCart: [
      {
        id: '1111',
        name: 'Làm chủ cảm xúc',
        url: 'https://salt.tikicdn.com/cache/280x280/ts/product/5c/07/92/7ac1298303440baa2ed74fa20c9f7385.jpg',
        price: 200000,
        quantity: 1,
      },
      {
        id: '1112',
        name: 'Tâm lý học hạnh phúc',
        url: 'https://salt.tikicdn.com/cache/280x280/ts/product/59/e3/e7/642ce38017ac1d35f2e87234b6fd56f2.jpg',
        price: 200000,
        quantity: 1,
      },
      {
        id: '1113',
        name: 'Dạy con học ít hiểu nhiều',
        url: 'https://salt.tikicdn.com/cache/280x280/ts/product/5f/36/dd/c64c91016b320ae4591efcf93d0ebf30.jpg',
        price: 200000,
        quantity: 1,
      },
      {
        id: '1114',
        name: 'Đừng chạy theo số đông',
        url: 'https://salt.tikicdn.com/cache/280x280/ts/product/95/c5/71/f260011660001af960c42d7d2f1c5dc1.jpg',
        price: 200000,
        quantity: 1,
      },
    ],
  },
};

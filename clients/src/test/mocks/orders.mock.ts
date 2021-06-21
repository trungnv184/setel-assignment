export const ORDERS_RESPONSE_MOCK = {
  data: {
    getOrderList: [
      {
        id: '60cf5c724678b30a48521b09',
        orderItems: [
          {
            id: '1',
            name: 'IT Book',
            url: 'url',
            price: 500,
            quantity: 1,
            createdDate: null,
          },
        ],
        metadata: {
          firstName: 'Trung',
          lastName: 'Nguyen',
          address: 'HCM',
          phoneNumber: '0906925896',
        },
        state: 'Delivered',
        notes: 'Nothing',
        createdDate: '2021-06-20T15:19:14.550Z',
        updatedDate: '2021-06-20T15:20:18.400Z',
      },
      {
        id: '60cef65d4678b30a48521b08',
        orderItems: [
          {
            id: '1624165260',
            name: 'Làm chủ cảm xúc',
            url: 'https://salt.tikicdn.com/cache/280x280/ts/product/5c/07/92/7ac1298303440baa2ed74fa20c9f7385.jpg',
            price: 200000,
            quantity: 1,
            createdDate: null,
          },
          {
            id: '1624165261',
            name: 'Tâm lý học hạnh phúc',
            url: 'https://salt.tikicdn.com/cache/280x280/ts/product/59/e3/e7/642ce38017ac1d35f2e87234b6fd56f2.jpg',
            price: 200000,
            quantity: 1,
            createdDate: null,
          },
          {
            id: '1624165262',
            name: 'Dạy con học ít hiểu nhiều',
            url: 'https://salt.tikicdn.com/cache/280x280/ts/product/5f/36/dd/c64c91016b320ae4591efcf93d0ebf30.jpg',
            price: 200000,
            quantity: 1,
            createdDate: null,
          },
          {
            id: '1624165264',
            name: 'Đừng chạy theo số đông',
            url: 'https://salt.tikicdn.com/cache/280x280/ts/product/95/c5/71/f260011660001af960c42d7d2f1c5dc1.jpg',
            price: 200000,
            quantity: 1,
            createdDate: null,
          },
        ],
        metadata: {
          firstName: 'THI NGOC NHI',
          lastName: 'VO',
          address: '16 NGUYEN DUC THUAN',
          phoneNumber: '0906925896',
        },
        state: 'Delivered',
        notes: 'Add Book care, please!',
        createdDate: '2021-06-20T08:03:41.223Z',
        updatedDate: '2021-06-20T08:04:42.609Z',
      },
    ],
  },
};

export const GET_ORDER_BY_ID_MOCK = {
  data: {
    getOrder: {
      id: '60cf5c724678b30a48521b09',
      orderItems: [
        {
          id: '1',
          name: 'Book',
          price: 500,
          url: 'url',
          quantity: 1,
        },
      ],
      metadata: {
        firstName: 'Trung',
        lastName: 'Nguyen',
        address: 'HCM',
        phoneNumber: '0906925896',
      },
      notes: 'Nothing',
      state: 'Delivered',
      createdDate: '2021-06-20T15:19:14.550Z',
      updatedDate: '2021-06-20T15:20:18.400Z',
    },
  },
};

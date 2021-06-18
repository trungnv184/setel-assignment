import axios from 'axios';

export class GenericModel {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.api = axios.create({
      baseURL: 'http://localhost:3400', // json-server endpoint
    });
  }

  list() {
    return this.api.get(`/${this.endpoint}`).then((res) => res.data);
  }

  find(id) {
    return this.api.get(`/${this.endpoint}/${id}`).then((res) => res.data);
  }

  create(data) {
    return this.api.post(`/${this.endpoint}`, data).then((res) => res.data);
  }

  update(id, data) {
    return this.api.patch(`/${this.endpoint}/${id}`, data).then((res) => res.data);
  }

  delete(id) {
    return this.api.delete(`/${this.endpoint}/${id}`).then(() => ({ id }));
  }
}

export class OrderModel {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8000/v1/api',
    });
  }
  getList() {
    return this.api.get('/orders').then((res) => res.data);
  }
  createOrder(payload) {
    return this.api.post('/orders', payload).then((res) => res.data);
  }
  cancelOrder(id) {
    return this.api.delete(`/orders/${id}`).then((res) => res.data);
  }
  getOrderStatus(id) {
    return this.api.get(`/${id}/status`).then((res) => res.data);
  }
}

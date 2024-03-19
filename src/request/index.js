import api from "src/request/api";

class Service {
    getOneWallet(wallet_id) {
        return api.get(`/api/wallet/${wallet_id}`);
    }

    updateOneWallet(wallet_id, data) {
        return api.post(`/api/wallet/${wallet_id}`, { data: data });
    }

    createBusiness(data) {
        return api.put(`/api/business/`, { data });
    }

    createWallet(data) {
        return api.put(`/api/wallet/`, { data });
    }

    getBusiness() {
        return api.get(`/api/business/`);
    }

    getOneBusiness(business_id) {
        return api.get(`/api/business/${business_id}`);
    }

    deleteOneBusiness(business_id) {
        return api.delete(`/api/business/${business_id}`);
    }

    getWallets4business(business_id) {
        return api.get(`/api/business/wallets/${business_id}`);
    }

    getMembers(business_id) {
        return api.get(`/api/business/members/${business_id}`);
    }

    createMember(data, business_id) {
        return api.put(`/api/business/members/${business_id}`, { data });
    }

    deleteMember(data, business_id) {
        return api.delete(`/api/business/members/${business_id}`, { data });
    }

    getCustomer(business_id) {
        return api.get(`/api/business/customers/${business_id}`);
    }

    createCustomer(data, business_id) {
        return api.put(`/api/business/customers/${business_id}`, { data });
    }

    deleteCustomer(data, business_id) {
        return api.delete(`/api/business/customers/${business_id}`, { data });
    }

    createInvoice(data) {
        return api.post(`/api/invoice`, { data });
    }

    createTrans(data) {
        return api.post(`/api/transfer`, { data });
    }

    getTrans(wallet_id) {
        return api.get(`/api/transfer/${wallet_id}`);
    }

    getInvoices(wallet_id) {
        return api.get(`/api/invoice/${wallet_id}`);
    }

    createProduct(business_id, data) {
        return api.post(`/api/product/${business_id}`, { data });
    }

    get4OneBusiness(business_id) {
        return api.get(`/api/product/get4OneBusiness/${business_id}`);
    }

    deleteProduct(product_id) {
        return api.delete(`/api/product/delete/${product_id}`);
    }

    getProduct(product_id) {
        return api.get(`/api/product/getOne/${product_id}`);
    }

    publishProduct(product_id, data) {
        return api.post(`/api/product/publish/${product_id}`, { data });
    }

    createPrice4Product(product_id, data) {
        return api.post(`/api/product/price/${product_id}`, { data });
    }

    deletePrice4Product(product_id, data) {
        return api.delete(`/api/product/price/${product_id}`, { data });
    }
}

export default new Service();
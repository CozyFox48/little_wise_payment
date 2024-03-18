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
}

export default new Service();


// createYggioAccount(name: string, password: string, url: string) {
//     return axios.post(API_URL + '/yggioAccount', { name: name, password: password, url: url }, { headers: authHeader() });
// }

// deleteYggioAccount(selectedDevices: ReadonlyArray<string>) {
//     return axios.delete(API_URL + '/yggioAccount', { data: { selectedGroups: selectedDevices }, headers: authHeader() });
// }

// updateYggioData(id:string, name:string, password:string, url:string,accountSelected:boolean ) {
//     return axios.put(API_URL + '/yggioAccount',  { id:id, name:name, password:password, url:url,accountSelected:accountSelected }, {headers: authHeader() });
// }

// getEmailAccount() {
//     return axios.get(API_URL + '/emailAccount', { headers: authHeader() });
// }

// createEmailAccount(name: string, password: string, service: string) {
//     return axios.post(API_URL + '/emailAccount', { name: name, password: password, service: service }, { headers: authHeader() });
// }

// deleteEmailAccount(selectedDevices: ReadonlyArray<string>) {
//     return axios.delete(API_URL + '/emailAccount', { data: { selectedGroups: selectedDevices }, headers: authHeader() });
// }

// updateEmailData(id:string, name:string, password:string, service:string,accountSelected:boolean ) {
//     return axios.put(API_URL + '/emailAccount',  { id:id, name:name, password:password, service:service,accountSelected:accountSelected }, {headers: authHeader() });
// }
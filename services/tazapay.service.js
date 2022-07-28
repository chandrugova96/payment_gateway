'use strict'
const { tazapayHealper } = require('../helper');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

class TazaPayService { };

TazaPayService.getUser = async (email) => {
    try {
        let user = await tazapayHealper.makeRequest("GET", `/v1/user/${email}`);
        return user.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.createBuyer = async (req) => {
    try {
        let body = req.body;
        body['ind_bus_type'] = "Individual";
        let user = await tazapayHealper.makeRequest("POST", "/v1/user", body);
        return user.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.createSeller = async (req) => {
    try {
        let body = req.body;
        body['ind_bus_type'] = "Business";
        let user = await tazapayHealper.makeRequest("POST", "/v1/user", body);
        return user.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.updateUser = async (req) => {
    try {
        let body = req.body;
        let user = await tazapayHealper.makeRequest("PUT", "/v1/user", body);
        return user.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.addBank = async (req) => {
    try {
        let body = req.body;
        let data = await tazapayHealper.makeRequest("POST", "/v1/bank", body);
        return data.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.getBank = async (id) => {
    try {
        let data = await tazapayHealper.makeRequest("GET", `/v1/bank/${id}`);
        return data.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.createPayment = async (req) => {
    try {
        let body = req.body;
        body['initiated_by'] = body.seller_id;
        body['txn_description'] = body.txn_description ? body.txn_description : "txn_description";
        let result = await tazapayHealper.makeRequest("POST", "/v1/escrow", body);
        if (result && result.body && result.body.data && result.body.data.txn_no) {
            const createPaymentPayload = {
                "txn_no": result.body.data.txn_no,
                "callback_url": body.callback_url
            };
            let createPaymentResult = await tazapayHealper.makeRequest("POST", "/v1/session/payment", createPaymentPayload);
            if(createPaymentResult && createPaymentResult.body && createPaymentResult.body.data){
                let response = {
                    message : createPaymentResult.body.message,
                    redirect_url : createPaymentResult.body.data.redirect_url,
                    txn_no : result.body.data.txn_no
                };
                return response;
            }else{
                return createPaymentResult;
            }
        }else{
            return result;
        }
    } catch (err) {
        return err;
    }
};

TazaPayService.getPaymentStatus = async (txn_no) => {
    try {
        let data = await tazapayHealper.makeRequest("GET", `/v1/escrow/${txn_no}`);
        return data.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.getPaymentStatusBulk = async (req) => {
    try {
        let { txn_nos }= req.body;
        let response = [];
        await asyncForEach(txn_nos, async (oneDoc, index) => {
            let result = await tazapayHealper.makeRequest("GET", `/v1/escrow/${oneDoc}`);
            if(result && result.body && result.body.data){
                response.push(result.body.data);
            }
        });
        return response;
    } catch (err) {
        return err;
    }
};

TazaPayService.createRefundPayment = async (req) => {
    try {
        let body = req.body;
        let data = await tazapayHealper.makeRequest("POST", "/v1/payment/refund/request", body);
        return data.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.getRefundPaymentStatus = async (txn_no) => {
    try {
        let data = await tazapayHealper.makeRequest("GET", `/payment/refund/status?reference_id=${txn_no}`);
        return data.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.getKYBDocument = async (application_id) => {
    try {
        let data = await tazapayHealper.makeRequest("GET", `/v2/kyb/${application_id}`);
        return data.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.kybDocument = async (req) => {
    try {
        let body = req.body;
        body['application_type'] = 'Business';
        let data = await tazapayHealper.makeRequest("POST", "/v2/kyb", body);
        return data.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.updateKYBDocument = async (req) => {
    try {
        let body = req.body;
        body['application_type'] = 'Business';
        let { application_id } = req.body;
        let user = await tazapayHealper.makeRequest("PUT", `/v2/kyb/${application_id}`, body);
        return user.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.getInvoiceCurrency = async (query) => {
    try {
        let data = await tazapayHealper.makeRequest("GET", `/v1/metadata/invoicecurrency?buyer_country=${query.buyer_country}&seller_country=${query.seller_country}`);
        return data.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.getDocType = async (country) => {
    try {
        let data = await tazapayHealper.makeRequest("GET", `/v1/metadata/kyb/doc?country=${country}`);
        return data.body;
    } catch (err) {
        return err;
    }
};

TazaPayService.getCollectionMethod = async (query) => {
    try {
        let data = await tazapayHealper.makeRequest("GET", `/v1/metadata/collect?amount=${query.amount}&buyer_country=${query.buyer_country}&invoice_currency=${query.invoice_currency}&seller_country=${query.invoice_currency}`);
        return data.body;
    } catch (err) {
        return err;
    }
};

module.exports = TazaPayService;
'use strict'

const { tazapayService } = require('../services');
const { response } = require('../middleware');
const { statusCodes, responseMessage, loggerMessage } = require('../constants');
const { logger } = require('../helper');

class TazaPayController { };

TazaPayController.getUser = async (req, res, next) => {
    try {
        let user = await tazapayService.getUser(req.query.email);
        if (user && user.data && user.data.id) {
            logger.error(responseMessage.userGetSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, user.data, responseMessage.userGetSuccess);
        } else {
            logger.info(responseMessage.userNotFound);
            return response.errors(req, res, statusCodes.HTTP_NOT_FOUND, responseMessage.userNotFound);
        }
    } catch (err) {
        logger.error(responseMessage.userGetFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.userGetFailure);
    }
};

TazaPayController.createBuyer = async (req, res, next) => {
    try {
        let user = await tazapayService.getUser(req.body.email);
        if (user && user.data && user.data.id) {
            logger.error(loggerMessage.alreadyExists);
            return response.errors(req, res, statusCodes.HTTP_ALREADY_REPORTED, responseMessage.alreadyExists);
        } else {
            let data = await tazapayService.createBuyer(req);
            logger.info(loggerMessage.buyerCreatedSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, responseMessage.buyerCreatedSuccess);
        }
    } catch (err) {
        logger.error(loggerMessage.buyerCreatedFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.buyerCreatedFailure);
    }
};

TazaPayController.createSeller = async (req, res, next) => {
    try {
        let user = await tazapayService.getUser(req.body.email);
        if (user && user.data && user.data.id) {
            logger.error(loggerMessage.alreadyExists);
            return response.errors(req, res, statusCodes.HTTP_ALREADY_REPORTED, responseMessage.alreadyExists);
        } else {
            let data = await tazapayService.createSeller(req);
            logger.info(loggerMessage.sellerCreatedSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, responseMessage.sellerCreatedSuccess);
        }
    } catch (err) {
        logger.error(loggerMessage.sellerCreatedFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.sellerCreatedFailure);
    }
};

TazaPayController.updateUser = async (req, res, next) => {
    try {
        let data = await tazapayService.updateUser(req);
        logger.error(responseMessage.userUpdateSuccess);
        return response.success(req, res, statusCodes.HTTP_OK, data.data, responseMessage.userUpdateSuccess);
    } catch (err) {
        logger.error(responseMessage.userUpdateFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.userUpdateFailure);
    }
};

TazaPayController.addBank = async (req, res, next) => {
    try {
        let data = await tazapayService.addBank(req);
        if(data && data.data){
            logger.error(responseMessage.addBankSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, data.message ? data.message : responseMessage.addBankSuccess);
        }else{
            logger.error(responseMessage.addBankFailed);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.addBankFailed);
        }
    } catch (err) {
        logger.error(responseMessage.addBankFailed);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.addBankFailed);
    }
};

TazaPayController.getBank = async (req, res, next) => {
    try {
        let data = await tazapayService.getBank(req.query.id);
        if(data && data.data){
            logger.error(responseMessage.getBankSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, data.message ? data.message : responseMessage.getBankSuccess);
        }else{
            logger.error(responseMessage.getBankFailed);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, responseMessage.addBankFailed);
        }
    } catch (err) {
        logger.error(responseMessage.getBankFailed);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.addBankFailed);
    }
};

TazaPayController.createPayment = async (req, res, next) => {
    try {
        let data = await tazapayService.createPayment(req);
        if(data && data.txn_no){
            logger.error(responseMessage.getBankSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data, data.message ? data.message : responseMessage.getBankSuccess);
        }else{
            logger.error(responseMessage.getBankFailed);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, data.body.message);
        }
    } catch (err) {
        logger.error(responseMessage.getBankFailed);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.addBankFailed);
    }
};

TazaPayController.getPaymentStatus = async (req, res, next) => {
    try {
        let data = await tazapayService.getPaymentStatus(req.query.txn_no);
        if(data && data.data){
            logger.error(responseMessage.getPaymentStatusSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, data.message ? data.message : responseMessage.getPaymentStatusSuccess);
        }else{
            logger.error(responseMessage.getBankFailed);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, data.body.message);
        }
    } catch (err) {
        logger.error(responseMessage.getBankFailed);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.addBankFailed);
    }
};

TazaPayController.getPaymentStatusBulk = async (req, res, next) => {
    try {
        let data = await tazapayService.getPaymentStatusBulk(req);
        logger.error(responseMessage.getPaymentStatusSuccess);
        return response.success(req, res, statusCodes.HTTP_OK, data, responseMessage.getPaymentStatusSuccess);
    } catch (err) {
        logger.error(responseMessage.getBankFailed);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.addBankFailed);
    }
};

TazaPayController.createRefundPayment = async (req, res, next) => {
    try {
        let data = await tazapayService.createRefundPayment(req);
        if(data && data.body && data.body.status === 'created'){
            logger.error(responseMessage.getPaymentStatusSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.body.data, data.body.message ? data.body.message : responseMessage.getPaymentStatusSuccess);
        }else{
            logger.error(responseMessage.getBankFailed);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, data.body.message);
        }
    } catch (err) {
        logger.error(responseMessage.getBankFailed);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.addBankFailed);
    }
};

TazaPayController.getRefundPaymentStatus = async (req, res, next) => {
    try {
        let data = await tazapayService.getRefundPaymentStatus(req.query.reference_id);
        if(data && data.data){
            logger.error(responseMessage.getPaymentStatusSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, data.message ? data.message : responseMessage.getPaymentStatusSuccess);
        }else{
            logger.error(responseMessage.getBankFailed);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, data.body.message);
        }
    } catch (err) {
        logger.error(responseMessage.getBankFailed);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.addBankFailed);
    }
};

TazaPayController.getKYBDocument = async (req, res, next) => {
    try {
        let data = await tazapayService.getKYBDocument(req.query.application_id);
        if (data && data.data) {
            logger.error(responseMessage.getKYBSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, responseMessage.getKYBSuccess);
        } else {
            logger.error(data.body.message);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, data.body.message);
        }
    } catch (err) {
        logger.error(responseMessage.getKYBFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.getKYBFailure);
    }
};

TazaPayController.kybDocument = async (req, res, next) => {
    try {
        let data = await tazapayService.kybDocument(req);
        if(data && data.data && data.data.application_id ){
            logger.error(responseMessage.kycSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, data.message ? data.message : responseMessage.kycSuccess);
        }else{
            logger.error(responseMessage.kycFailure);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, data.body.message);
        }
    } catch (err) {
        logger.error(responseMessage.kycFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.kycFailure);
    }
};

TazaPayController.updateKYBDocument = async (req, res, next) => {
    try {
        let data = await tazapayService.updateKYBDocument(req);
        if(data && data.data && data.data.application_id ){
            logger.error(responseMessage.kycSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, data.message ? data.message : responseMessage.kycSuccess);
        }else{
            logger.error(responseMessage.kycFailure);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, data.body.message);
        }
    } catch (err) {
        logger.error(responseMessage.kycFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.kycFailure);
    }
};

TazaPayController.getInvoiceCurrency = async (req, res, next) => {
    try {
        let data = await tazapayService.getInvoiceCurrency(req.query);
        if (data && data.data) {
            logger.error(responseMessage.userGetSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, responseMessage.userGetSuccess);
        } else {
            logger.error(data.body.message);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, data.body.message);
        }
    } catch (err) {
        logger.error(responseMessage.userGetFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.userGetFailure);
    }
};

TazaPayController.getDocType = async (req, res, next) => {
    try {
        let data = await tazapayService.getDocType(req.query.country);
        if (data && data.data) {
            logger.error(responseMessage.userGetSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, responseMessage.userGetSuccess);
        } else {
            logger.error(data.body.message);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, data.body.message);
        }
    } catch (err) {
        logger.error(responseMessage.userGetFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.userGetFailure);
    }
};

TazaPayController.getCollectionMethod = async (req, res, next) => {
    try {
        let data = await tazapayService.getCollectionMethod(req.query);
        if (data && data.data) {
            logger.error(responseMessage.userGetSuccess);
            return response.success(req, res, statusCodes.HTTP_OK, data.data, responseMessage.userGetSuccess);
        } else {
            logger.error(data.body.message);
            return response.errors(req, res, statusCodes.HTTP_BAD_REQUEST, data.body.message);
        }
    } catch (err) {
        logger.error(responseMessage.userGetFailure);
        return response.errors(req, res, statusCodes.HTTP_INTERNAL_SERVER_ERROR, responseMessage.userGetFailure);
    }
};

module.exports = TazaPayController;
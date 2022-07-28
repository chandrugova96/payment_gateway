const express = require("express");
const tazapayRoutes = express.Router();

const { tazapayController } = require("../../controllers");
const { verifyToken } = require("../../middleware");
const { tazapay } = require("../../validators");

// User
tazapayRoutes.get('/getUser', tazapay.getUser, tazapayController.getUser);
tazapayRoutes.post('/createBuyer', tazapay.createBuyer, tazapayController.createBuyer);
tazapayRoutes.post('/createSeller', tazapay.createSeller, tazapayController.createSeller);
tazapayRoutes.put('/updateUser', tazapay.updateUser, tazapayController.updateUser);
tazapayRoutes.put('/addBank', tazapay.addBank, tazapayController.addBank);
tazapayRoutes.get('/getBank', tazapayController.getBank);

// Payment
tazapayRoutes.post('/createPaymentLink', tazapay.createPayment, tazapayController.createPayment);
tazapayRoutes.get('/getPaymentStatus', tazapay.getPaymentStatus, tazapayController.getPaymentStatus);
tazapayRoutes.post('/getPaymentStatusBulk', tazapay.getPaymentStatusBulk, tazapayController.getPaymentStatusBulk);
tazapayRoutes.post('/createRefundPayment', tazapay.createRefundPayment, tazapayController.createRefundPayment);
tazapayRoutes.get('/getRefundPaymentStatus', tazapay.getRefundPaymentStatus, tazapayController.getRefundPaymentStatus);

// KYB Document
tazapayRoutes.get('/kybDocument', tazapay.getKYBDocument, tazapayController.getKYBDocument);
tazapayRoutes.post('/kybDocument', tazapay.kybDocument, tazapayController.kybDocument);
tazapayRoutes.put('/kybDocument', tazapay.kybDocument, tazapayController.updateKYBDocument);

// Config
tazapayRoutes.get('/getInvoiceCurrency', tazapay.getInvoiceCurrency, tazapayController.getInvoiceCurrency);
tazapayRoutes.get('/getDocType', tazapay.getDocType, tazapayController.getDocType);
tazapayRoutes.get('/getCollectionMethod', tazapay.getCollectionMethod, tazapayController.getCollectionMethod);

module.exports = tazapayRoutes;
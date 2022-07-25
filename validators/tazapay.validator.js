const Joi = require('joi');

const baseValidation = require("../middleware/baseValidation");

class TazapayValidation {

	getUser(req, res, next){
		const schema = Joi.object({
			email: Joi.string().email({ minDomainSegments: 2 }).required()
		});
		return baseValidation.validateQuery(req, res, next, schema);
	};

	createBuyer(req, res, next){
		const schema = Joi.object({
			email: Joi.string().email({ minDomainSegments: 2 }).required(),
			country: Joi.string().min(2).required(),
			first_name : Joi.string().min(2).max(25).required(),
			last_name : Joi.string().min(1).max(25).required(),
			contact_code : Joi.string().optional(),
			contact_number : Joi.string().optional(),
			partners_customer_id : Joi.string().optional()
		});
		return baseValidation.validateBody(req, res, next, schema);
	};

	createSeller(req, res, next){
		const schema = Joi.object({
			email: Joi.string().email({ minDomainSegments: 2 }).required(),
			country: Joi.string().min(2).required(),
			business_name : Joi.string().min(2).max(50).required(),
			contact_code : Joi.string().optional(),
			contact_number : Joi.string().optional(),
			partners_customer_id : Joi.string().optional()
		});
		return baseValidation.validateBody(req, res, next, schema);
	};

	updateUser(req, res, next){
		const schema = Joi.object({
			account_id: Joi.string().required(),
			first_name: Joi.string().optional(),
			last_name: Joi.string().optional(),
			business_name: Joi.string().optional(),
			country: Joi.string().optional(),
			contact_code: Joi.string().optional(),
			contact_number: Joi.string().optional()
		});
		return baseValidation.validateBody(req, res, next, schema);
	};

	addBank(req, res, next){
		const schema = Joi.object({
			account_id: Joi.string().required(),
			currency: Joi.string().required(),
			bank_name: Joi.string().required(),
			legal_name: Joi.string().required(),
			account_number: Joi.string().required(),
			country_code: Joi.string().required(),
			contact_number: Joi.string().required(),
			bank_codes: Joi.object().required()
		});
		return baseValidation.validateBody(req, res, next, schema);
	};

	createPayment(req, res, next){
		const schema = Joi.object({
			buyer_id: Joi.string().required(),
			seller_id: Joi.string().required(),
			txn_description: Joi.string().required(),
			invoice_amount: Joi.number().required(),
			invoice_currency: Joi.string().required(),
			fee_tier : Joi.string().optional(),
			fee_paid_by : Joi.string().optional(),
			fee_percentage : Joi.number().optional(),
			flat_fee : Joi.object().optional(),
			callback_url : Joi.string().required()
		});
		return baseValidation.validateBody(req, res, next, schema);
	};

	getPaymentStatus(req, res, next){
		const schema = Joi.object({
			txn_no: Joi.string().required()
		});
		return baseValidation.validateQuery(req, res, next, schema);
	};

	getPaymentStatusBulk(req, res, next){
		const schema = Joi.object({
			txn_nos: Joi.array().required()
		});
		return baseValidation.validateBody(req, res, next, schema);
	};

	createRefundPayment(req, res, next){
		const schema = Joi.object({
			txn_no: Joi.string().required(),
			amount : Joi.number().optional(),
			remarks : Joi.string().optional(),
			callback_url : Joi.string().required()
		});
		return baseValidation.validateBody(req, res, next, schema);
	};

	getRefundPaymentStatus(req, res, next){
		const schema = Joi.object({
			reference_id: Joi.string().required()
		});
		return baseValidation.validateQuery(req, res, next, schema);
	};

	getInvoiceCurrency(req, res, next){
		const schema = Joi.object({
			buyer_country: Joi.string().required(),
			seller_country: Joi.string().required()
		});
		return baseValidation.validateQuery(req, res, next, schema);
	};

	getDocType(req, res, next){
		const schema = Joi.object({
			country: Joi.string().required()
		});
		return baseValidation.validateQuery(req, res, next, schema);
	};

	getCollectionMethod(req, res, next){
		const schema = Joi.object({
			amount: Joi.string().required(),
			buyer_country: Joi.string().required(),
			invoice_currency: Joi.string().required(),
			seller_country: Joi.string().required(),
		});
		return baseValidation.validateQuery(req, res, next, schema);
	};

}

module.exports = new TazapayValidation();


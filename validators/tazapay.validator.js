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

	kybDocument(req, res, next){
		const schema = Joi.object({
			account_id: Joi.string().required(),
			entity_name : Joi.string().required(),
			submit : Joi.boolean().required(),
			callback_url : Joi.string().required(),
			business : Joi.object({
				name : Joi.string().required(),
				type : Joi.string().optional().allow(''),
				incorporation_no : Joi.string().optional().allow(''),
				address_line_1 : Joi.string().optional().allow(''),
				address_line_2 : Joi.string().optional().allow(''),
				city : Joi.string().optional().allow(''),
				state : Joi.string().optional().allow(''),
				country : Joi.string().required().allow(''),
				zip_code : Joi.string().optional().allow(''),
				trading_name : Joi.string().optional().allow(''),
				years_in_business : Joi.string().optional().allow(''),
				annual_turnover : Joi.string().optional().allow(''),
				website : Joi.string().optional().allow(''),
				date_of_incorporation : Joi.string().optional().allow(''),
				custom_attrs : Joi.object().optional().allow(''),
				documents: Joi.array().items(
					Joi.object({
						description : Joi.string().optional().allow(''),
						file_name : Joi.string().required(),
						name : Joi.string().required(),
						proof_type : Joi.string().required(),
						type : Joi.string().required(),
						url : Joi.string().required(),
					})
				)
			}),
			representative: Joi.object({
				first_name: Joi.string().required(),
				last_name: Joi.string().required(),
				roles: Joi.array().required(),
				dob: Joi.string().optional().allow(''),
				address_line_1: Joi.string().optional().allow(''),
				address_line_2: Joi.string().optional(),
				city: Joi.string().optional().allow(''),
				state: Joi.string().optional().allow(''),
				country: Joi.string().optional().allow(''),
				zip_code: Joi.string().optional().allow(''),
				contact_code: Joi.string().optional().allow(''),
				mobile_number: Joi.string().optional().allow(''),
				ownership_percent: Joi.number().required(),
				documents: Joi.array().items(
					Joi.object({
						proof_type : Joi.string().required(),
						type : Joi.string().required(),
						name : Joi.string().required(),
						url : Joi.string().required(),
						file_name : Joi.string().required(),
						description : Joi.string().optional().allow('')
					})
				)
			}),
			owner : Joi.array().items(
				Joi.object({
					first_name : Joi.string().required(),
					last_name : Joi.string().required(),
					roles : Joi.array().required(),
					dob : Joi.string().optional().allow(''),
					address_line_1 : Joi.string().optional().allow(''),
					address_line_2 : Joi.string().optional().allow(''),
					city : Joi.string().optional().allow(''),
					state : Joi.string().optional().allow(''),
					country : Joi.string().optional().allow(''),
					zip_code : Joi.string().optional().allow(''),
					contact_code : Joi.string().optional().allow(''),
					mobile_number : Joi.string().optional().allow(''),
					ownership_percent : Joi.number().required(),
					documents: Joi.array().items(
						Joi.object({
							proof_type : Joi.string().required(),
							type : Joi.string().required(),
							name : Joi.string().required(),
							url : Joi.string().required(),
							file_name : Joi.string().required(),
							description : Joi.string().optional().allow('')
						})
					)
				})
			)
		});
		return baseValidation.validateBody(req, res, next, schema);
	};

	getKYBDocument(req, res, next){
		const schema = Joi.object({
			application_id: Joi.string().required()
		});
		return baseValidation.validateQuery(req, res, next, schema);
	};


}

module.exports = new TazapayValidation();


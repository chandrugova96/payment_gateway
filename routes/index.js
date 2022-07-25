const initializeRoutes = (app) => {
    app.use('/api/v1/tazapay', require('./v1/tazapay.routes'));
};

module.exports = initializeRoutes;
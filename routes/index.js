const initializeRoutes = (app) => {
    app.use('/v1/tazapay', require('./v1/tazapay.routes'));
};

module.exports = initializeRoutes;
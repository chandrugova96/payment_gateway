const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.label({ label: "Payment Gateway" }),
    winston.format.prettyPrint()
);

const transport = new DailyRotateFile({
    filename: process.env.LOG_FILE,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxFiles: '14d',
    prepend: true,
    level: 'info'
});

const logger = winston.createLogger({
    format: logFormat,
    transports: [
        transport,
        new winston.transports.Console({ level: 'info' })
    ]
});

module.exports = logger;
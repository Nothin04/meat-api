"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePatchBodyParser = void 0;
var restify_errors_1 = require("restify-errors");
var mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = function (req, res, next) {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        try {
            req.body = JSON.parse(req.body);
        }
        catch (e) {
            return next(new restify_errors_1.BadRequestError('Invalid content' + e.message));
        }
    }
    return next();
};

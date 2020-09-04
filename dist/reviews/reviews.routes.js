"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRouter = void 0;
var model_router_1 = require("../common/model-router");
var reviews_model_1 = require("../reviews/reviews.model");
var ReviewsRouter = /** @class */ (function (_super) {
    __extends(ReviewsRouter, _super);
    function ReviewsRouter() {
        var _this = _super.call(this, reviews_model_1.Review) || this;
        _this.findById = function (req, res, next) {
            _this.model.findById(req.params.id)
                .populate('user', 'name')
                .populate('restaurant', 'name')
                .then(_this.render(res, next))
                .catch(next);
        };
        return _this;
    }
    ReviewsRouter.prototype.envelope = function (document) {
        var resource = _super.prototype.envelope.call(this, document);
        var restId = document.restaurant._id ? document.restaurant._id : document.restaurant;
        resource._links.restaurant = "/restaurants/" + restId;
        return resource;
    };
    ReviewsRouter.prototype.applyRoutes = function (application) {
        application.get("" + this.basePath, this.findAll);
        application.get(this.basePath + "/:id", [this.validateId, this.findById]);
        application.post("" + this.basePath, this.save);
    };
    return ReviewsRouter;
}(model_router_1.ModelRouter));
exports.reviewsRouter = new ReviewsRouter();

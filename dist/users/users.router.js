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
exports.usersRouter = void 0;
var model_router_1 = require("../common/model-router");
var users_model_1 = require("./users.model");
var UsersRouter = /** @class */ (function (_super) {
    __extends(UsersRouter, _super);
    function UsersRouter() {
        var _this = _super.call(this, users_model_1.User) || this;
        //filtro
        _this.findByEmail = function (req, res, next) {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(function (user) {
                    if (user) {
                        return [user];
                    }
                    else {
                        return [];
                    }
                })
                    .then(_this.renderAll(res, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
        //filtro
        _this.findByName = function (req, res, next) {
            if (req.query.name) {
                users_model_1.User.find({ name: new RegExp('^' + req.query.name + '$', 'i') })
                    .then(_this.renderAll(res, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
        _this.on('beforeRender', function (document) {
            document.password = undefined;
        });
        return _this;
    }
    UsersRouter.prototype.applyRoutes = function (application) {
        application.get({ path: "" + this.basePath, version: '2.0.0' }, [this.findByEmail, this.findByName, this.findAll]);
        // application.get({path: `${this.basePath}`, version: '1.0.0'}, this.findAll)
        application.get(this.basePath + "/:id", [this.validateId, this.findById]);
        application.post("" + this.basePath, this.save);
        application.put(this.basePath + "/:id", [this.validateId, this.replace]);
        application.patch(this.basePath + "/:id", [this.validateId, this.update]);
        application.del(this.basePath + "/:id", [this.validateId, this.delete]);
    };
    return UsersRouter;
}(model_router_1.ModelRouter));
exports.usersRouter = new UsersRouter();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseService = void 0;
var CreateCourseService = /** @class */ (function () {
    function CreateCourseService() {
    }
    CreateCourseService.prototype.execute = function (name, duration, educator) {
        console.log(name, duration, educator);
    };
    return CreateCourseService;
}());
exports.CreateCourseService = CreateCourseService;

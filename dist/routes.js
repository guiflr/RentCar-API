"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
var CreateCourseService_1 = require("./CreateCourseService");
function createCourse(request, response) {
    var createCourseService = new CreateCourseService_1.CreateCourseService();
    createCourseService.execute("node", 10, "Gui");
    return response.json("ok");
}
exports.createCourse = createCourse;

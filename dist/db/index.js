"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.Admin = exports.User = exports.noteSchema = exports.adminSchema = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
}, { timestamps: true });
exports.adminSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
}, { timestamps: true });
exports.noteSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    status: { type: String, default: 'active' },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', exports.userSchema);
exports.Admin = mongoose_1.default.model('Admin', exports.adminSchema);
exports.Note = mongoose_1.default.model('Note', exports.noteSchema);

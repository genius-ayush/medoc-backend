"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const userSecret = process.env.USER_SECRET || 'userSecret';
const adminSecret = process.env.ADMIN_SECRET || 'adminSecret';
const router = (0, express_1.Router)();
//User Router 
router.post('/userRegister', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield db_1.User.findOne({ email });
    if (user) {
        res.status(403).json({ message: 'user aready exist' });
    }
    else {
        const newUser = new db_1.User({ name, email, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, userSecret, { expiresIn: '1h' });
        res.json({ message: "user created successfully", token, userId: newUser._id });
    }
}));
router.post('/userLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.User.findOne({ email, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, userSecret, { expiresIn: '1h' });
        res.json({ message: 'Logged in Succefully', token, userId: user._id });
    }
    else {
        res.status(403).json({ message: "invalid email or password" });
    }
}));
// Admin Router
router.post("/adminRegister", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield db_1.Admin.findOne({ email });
    if (user) {
        res.status(403).json({ message: "user already axist" });
    }
    else {
        const newAdmin = new db_1.Admin({ name, email, password });
        yield newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ id: newAdmin._id }, adminSecret, { expiresIn: '1h' });
        res.json({ message: 'admin created successfully', token, adminId: newAdmin._id });
    }
}));
router.post('/adminLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.User.findOne({ email, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, adminSecret, { expiresIn: '1h' });
        res.json({ message: 'admin Logged in Succefully', token, userId: user._id });
    }
    else {
        res.status(403).json({ message: "invalid email or password" });
    }
}));
exports.default = router;

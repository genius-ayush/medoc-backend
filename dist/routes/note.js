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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
// user routes 
// create a note
router.post('/createNote', middleware_1.userAuthenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, status } = req.body;
        const userId = req.headers["userId"];
        const newPost = new db_1.Note({ name, description, status, userId });
        yield newPost.save();
        res.status(201).json({ "newPost": newPost, message: "note created successfully" });
    }
    catch (err) {
        console.log("ayush");
        res.status(500).json({ err });
    }
}));
// get all notes of authenticated user 
router.get('/getNotes', middleware_1.userAuthenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers["userId"] || '';
        const notes = yield db_1.Note.find({ userId: userId });
        res.status(200).json(notes);
    }
    catch (err) {
        res.status(500).json({ error: 'failed to get user notes' });
    }
}));
// edit specific note by id 
router.patch('/notes/:id', middleware_1.userAuthenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const userId = req.headers['userId'];
        const { title, description } = req.body;
        console.log(noteId);
        console.log(userId);
        const updatedNote = yield db_1.Note.findOneAndUpdate({ _id: noteId, userId }, { title, description }, { new: true });
        if (!updatedNote) {
            res.status(404).json({ error: "Note note found or not authorized" });
            return;
        }
        res.status(200).json(updatedNote);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to update note" });
    }
}));
// delete specific note by id ; 
router.delete('/notes/:id', middleware_1.userAuthenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const userId = req.headers["userId"];
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const deletedNote = yield db_1.Note.findOneAndDelete({
            _id: noteId,
            userId,
        });
        if (!deletedNote) {
            res.status(404).json({ error: "Note not found or not authorized to delete" });
            return;
        }
        res.status(200).json({ message: "Note deleted successfully", note: deletedNote });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to delete note" });
    }
}));
// Admin routes 
// get all user profiles 
router.get('/users', middleware_1.adminAuthenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.User.find();
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to get users" });
    }
}));
//fetch detail of specific user
router.get("/users/:id", middleware_1.adminAuthenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const findUser = yield db_1.User.findOne({
            _id: userId,
        });
        if (!findUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ message: "user found", note: findUser });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to find user" });
    }
}));
// delete user profile
router.delete("/users/:id", middleware_1.adminAuthenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const deletedUser = yield db_1.User.findOneAndDelete({
            _id: userId,
        });
        if (!deletedUser) {
            res.status(404).json({ error: "Note not found or not authorized to delete" });
            return;
        }
        res.status(200).json({ message: "Note deleted successfully", note: deletedUser });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to delete user" });
    }
}));
// get all notes
router.get("/notes", middleware_1.adminAuthenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield db_1.Note.find();
        res.status(200).json(notes);
    }
    catch (err) {
        res.status(500).json({ error: 'failed to get user notes' });
    }
}));
exports.default = router;

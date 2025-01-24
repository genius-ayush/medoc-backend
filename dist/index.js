"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_url = process.env.MONGO_API_KEY || 'fallback_database_url';
const auth_1 = __importDefault(require("./routes/auth"));
const note_1 = __importDefault(require("./routes/note"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/note", note_1.default);
app.listen(port, () => {
    console.log(`app listening at http://localhost: ${port}`);
});
mongoose_1.default.connect(database_url, {
    dbName: 'medoc'
}).then(() => {
    console.log("connected to mongoDb");
}).catch(err => {
    console.error('Error connecting to mongoDb', err);
});

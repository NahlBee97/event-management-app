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
exports.VerifyUserTask = VerifyUserTask;
const node_cron_1 = __importDefault(require("node-cron"));
function VerifyUserTask() {
    return __awaiter(this, void 0, void 0, function* () {
        // * pertama menandakan menit (0-59)
        // * kedua menandakan jam (0-23)
        // * ketiga menandakan hari dalam bulan (1-31)
        // * keempat menandakan bulan (1-12)
        // * kelima menandakan hari dalam minggu (0-7)
        node_cron_1.default.schedule("*/15 * * * *", () => {
        });
    });
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const user_router_1 = __importDefault(require("./routers/user.router"));
const event_router_1 = __importDefault(require("./routers/event.router"));
const voucher_router_1 = __importDefault(require("./routers/voucher.router"));
const review_router_1 = __importDefault(require("./routers/review.router"));
const point_router_1 = __importDefault(require("./routers/point.router"));
const referral_router_1 = __importDefault(require("./routers/referral.router"));
const coupon_router_1 = __importDefault(require("./routers/coupon.router"));
const transaction_router_1 = __importDefault(require("./routers/transaction.router"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const port = config_1.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Use CORS middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use("api/auth", auth_router_1.default);
app.use("api/users", user_router_1.default);
app.use("api/events", event_router_1.default);
app.use("api/vouchers", voucher_router_1.default);
app.use("api/coupons", coupon_router_1.default);
app.use("api/reviews", review_router_1.default);
app.use("api/referrals", referral_router_1.default);
app.use("api/points", point_router_1.default);
app.use("api/transactions", transaction_router_1.default);
// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    res.status(400).json({
        success: false,
        message: err.message,
    });
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

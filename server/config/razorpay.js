const Razorpay = require("razorpay");
const RAZORPAY_KEY = "rzp_test_7Qwe9fFABOGb29";
const RAZORPAY_SECRET = "2f94nIGfpnUt8SSUITgOwrI6";

const dotenv = require("dotenv");
dotenv.config();


exports.instance = new Razorpay({
	key_id: RAZORPAY_KEY || process.env.RAZORPAY_KEY,
	key_secret: RAZORPAY_SECRET || process.env.RAZORPAY_SECRET,
});

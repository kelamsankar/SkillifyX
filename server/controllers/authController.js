import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import transporter from "../config/mailer.js";

// TEMP STORES
const otpStore = {};
const tempUsers = {};

// SIGNUP (SEND OTP)
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ msg: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = otp;
    tempUsers[email] = { name, email, password };
    try{
      await transporter.sendMail({
        from: `"SkillifyX" <${process.env.EMAIL}>`,
        to: email,
        subject: "🔐 Verify Your Email - SkillifyX",
        html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#0f0f0f; padding:40px 20px;">
            
            <div style="
            max-width:520px;
            margin:auto;
            background:rgba(255,255,255,0.05);
            border-radius:16px;
            overflow:hidden;
            backdrop-filter:blur(10px);
            border:1px solid rgba(255,255,255,0.1);
            box-shadow:0 10px 40px rgba(0,0,0,0.6);
            ">

            <!-- Header -->
            <div style="
                background:linear-gradient(135deg,#7c3aed,#ec4899);
                padding:25px;
                text-align:center;
            ">
                <h2 style="color:white; margin:0;">SkillifyX</h2>
                <p style="color:#f3e8ff; margin-top:6px; font-size:14px;">
                Secure Email Verification
                </p>
            </div>

            <!-- Body -->
            <div style="padding:30px; text-align:center; color:#ddd;">

                <h3 style="color:white; margin-bottom:10px;">
                Verify Your Email Address
                </h3>

                <p style="font-size:15px; color:#aaa;">
                Use the verification code below to continue:
                </p>

                <!-- OTP BOX -->
                <div style="
                margin:25px auto;
                display:inline-block;
                padding:16px 28px;
                font-size:32px;
                font-weight:bold;
                letter-spacing:8px;
                color:#ffffff;
                background:linear-gradient(135deg,#7c3aed,#ec4899);
                border-radius:12px;
                box-shadow:0 0 20px rgba(124,58,237,0.6);
                ">
                ${otp}
                </div>

                <p style="font-size:14px; color:#bbb;">
                This code will expire in <b style="color:white;">5 minutes</b>.
                </p>

                <p style="font-size:12px; color:#777; margin-top:25px;">
                If you didn’t request this, you can safely ignore this email.
                </p>

            </div>

            <!-- Footer -->
            <div style="
                text-align:center;
                padding:15px;
                font-size:12px;
                color:#666;
                border-top:1px solid rgba(255,255,255,0.08);
            ">
                © ${new Date().getFullYear()} SkillifyX • All rights reserved
            </div>

            </div>
        </div>
        `
        });
    }catch(err){
            console.log("Error sending email:", err);
            return res.status(500).json({ msg: "Failed to send OTP" });
        }

        res.json({ msg: "OTP sent" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// RESEND OTP
export const resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!tempUsers[email]) {
    return res.json({ msg: "Signup again" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  await transporter.sendMail({
    from: `"SkillifyX" <${process.env.EMAIL}>`,
    to: email,
    subject: "🔐 Verify Your Email - SkillifyX",
    html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#0f0f0f; padding:40px 20px;">
        
        <div style="
        max-width:520px;
        margin:auto;
        background:rgba(255,255,255,0.05);
        border-radius:16px;
        overflow:hidden;
        backdrop-filter:blur(10px);
        border:1px solid rgba(255,255,255,0.1);
        box-shadow:0 10px 40px rgba(0,0,0,0.6);
        ">

        <!-- Header -->
        <div style="
            background:linear-gradient(135deg,#7c3aed,#ec4899);
            padding:25px;
            text-align:center;
        ">
            <h2 style="color:white; margin:0;">SkillifyX</h2>
            <p style="color:#f3e8ff; margin-top:6px; font-size:14px;">
            Secure Email Verification
            </p>
        </div>

        <!-- Body -->
        <div style="padding:30px; text-align:center; color:#ddd;">

            <h3 style="color:white; margin-bottom:10px;">
            Verify Your Email Address
            </h3>

            <p style="font-size:15px; color:#aaa;">
            Use the verification code below to continue:
            </p>

            <!-- OTP BOX -->
            <div style="
            margin:25px auto;
            display:inline-block;
            padding:16px 28px;
            font-size:32px;
            font-weight:bold;
            letter-spacing:8px;
            color:#ffffff;
            background:linear-gradient(135deg,#7c3aed,#ec4899);
            border-radius:12px;
            box-shadow:0 0 20px rgba(124,58,237,0.6);
            ">
            ${otp}
            </div>

            <p style="font-size:14px; color:#bbb;">
            This code will expire in <b style="color:white;">5 minutes</b>.
            </p>

            <p style="font-size:12px; color:#777; margin-top:25px;">
            If you didn’t request this, you can safely ignore this email.
            </p>

        </div>

        <!-- Footer -->
        <div style="
            text-align:center;
            padding:15px;
            font-size:12px;
            color:#666;
            border-top:1px solid rgba(255,255,255,0.08);
        ">
            © ${new Date().getFullYear()} SkillifyX • All rights reserved
        </div>

        </div>
    </div>
    `
    });
  res.json({ msg: "OTP resent" });
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (otpStore[email] != otp) {
      return res.json({ msg: "Invalid OTP" });
    }

    const userData = tempUsers[email];

    const user = new User(userData);
    await user.save();

    delete otpStore[email];
    delete tempUsers[email];

    res.json({ msg: "Verified" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ msg: "Invalid credentials" });
    }

    res.json({ msg: "Login success", token: "dummy-token" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await user.save();

    const link = `http://localhost:5173/reset/${token}`;

    await transporter.sendMail({
        from: `"SkillifyX" <${process.env.EMAIL}>`,
        to: email,
        subject: "🔐 Reset Your Password - SkillifyX",
        html: `
        <div style="font-family:'Segoe UI', Arial, sans-serif; background:#0f0f0f; padding:40px 20px;">
            
            <div style="
            max-width:520px;
            margin:auto;
            background:rgba(255,255,255,0.05);
            border-radius:16px;
            overflow:hidden;
            backdrop-filter:blur(10px);
            border:1px solid rgba(255,255,255,0.1);
            box-shadow:0 10px 40px rgba(0,0,0,0.6);
            ">

            <!-- HEADER -->
            <div style="
                background:linear-gradient(135deg,#7c3aed,#ec4899);
                padding:25px;
                text-align:center;
            ">
                <h2 style="color:white; margin:0;">SkillifyX</h2>
                <p style="color:#f3e8ff; margin-top:6px; font-size:14px;">
                Password Reset Request
                </p>
            </div>

            <!-- BODY -->
            <div style="padding:30px; text-align:center; color:#ddd;">

                <h3 style="color:white; margin-bottom:10px;">
                Reset Your Password
                </h3>

                <p style="font-size:15px; color:#aaa;">
                We received a request to reset your password.  
                Click the button below to continue.
                </p>

                <!-- BUTTON -->
                <a href="${link}" style="
                display:inline-block;
                margin:25px 0;
                padding:12px 26px;
                font-size:16px;
                font-weight:600;
                color:white;
                text-decoration:none;
                border-radius:10px;
                background:linear-gradient(135deg,#7c3aed,#ec4899);
                box-shadow:0 0 20px rgba(124,58,237,0.6);
                ">
                Reset Password
                </a>

                <p style="font-size:14px; color:#bbb;">
                This link will expire in <b style="color:white;">15 minutes</b>.
                </p>

                <p style="font-size:13px; color:#888; margin-top:20px;">
                If you did not request a password reset, you can safely ignore this email.
                </p>

            </div>

            <!-- FOOTER -->
            <div style="
                text-align:center;
                padding:15px;
                font-size:12px;
                color:#666;
                border-top:1px solid rgba(255,255,255,0.08);
            ">
                © ${new Date().getFullYear()} SkillifyX • Secure Authentication System
            </div>

            </div>
        </div>
        `
    });

    res.json({ msg: "Reset link sent to email" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};


// 🔹 RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.json({ msg: "Invalid or expired token" });
    }

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ msg: "Password updated successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};
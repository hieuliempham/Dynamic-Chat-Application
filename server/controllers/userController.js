const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const sendMail = require("../helpers/sendmail");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ id: _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json("Email này đã tồn tại!");

    if ((!name, !email, !password))
      return res.status(400).json("Yêu cầu nhập đầy đủ thông tin!");

    if (!validator.isEmail(email))
      return res.status(400).json("Email sai định dạng!");

    if (!validator.isStrongPassword(password))
      return res.status(400).json({
        message:
          "Mật khẩu phải có ít nhất 8 ký tự và bao gồm cả chữ cái (in hoa và in thường), số, và ký tự đặc biệt.",
      });

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) return res.status(400).json("Email hoặc mật khẩu sai!");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(400).json("Email hoặc mật khẩu sai!");

    const token = createToken(user._id);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXP * 3600 * 1000),
        httpOnly: true,
      })
      .json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const forgotpassword = async function (req, res) {
  const { email } = req.body;
  try {
    if (!validator.isEmail(email))
      return res.status(400).json("Email sai định dạng!");

    let user = await userModel.findOne({ email });
    console.log({ user });
    if (!user) {
      return res.status(400).json("Email hoặc mật khẩu sai!");
    }
    let token = user.genRestPasswordToken();
    await user.save();

    let url = `http://example.com/resetpassword/${token}`; // Thay đổi đường dẫn reset password tại đây

    await sendMail(user.email, url); // Gửi email với đường dẫn reset mật khẩu
    res.status(200).json("Gửi email thành công");
  } catch (error) {
    res.status(500).json(error);
  }
};

const changepassword = async function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(500).json(error);
    }
    req.user = decoded;
  });

  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  if ((!oldPassword, !newPassword))
    return res.status(400).json("Yêu cầu nhập đầy đủ thông tin!");

  if (!validator.isStrongPassword(newPassword))
    return res.status(400).json({
      message:
        "Mật khẩu phải có ít nhất 8 ký tự và bao gồm cả chữ cái (in hoa và in thường), số, và ký tự đặc biệt.",
    });

  try {
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json("Không tìm thấy người dùng!");
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
      return res.status(400).json("Mật khẩu cũ không đúng!");
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json("Đổi mật khẩu thành công");
  } catch (error) {
    res.status(500).json(error);
  }
};

const resetpassword = async function (req, res, next) {
  if (!validator.isStrongPassword(req.body.password))
    return res.status(400).json({
      message:
        "Mật khẩu phải có ít nhất 8 ký tự và bao gồm cả chữ cái (in hoa và in thường), số, và ký tự đặc biệt.",
    });

  let user = await userModel.findOne({ ResetPasswordToken: req.params.token });
  if (!user) {
    return res.status(400).json("URL không hợp lệ!");
  }

  if (user.ResetPasswordTokenExp < Date.now()) {
    return res.status(400).json("URL quá hạn!");
  }

  user.password = req.body.password;
  user.ResetPasswordTokenExp = undefined;
  user.ResetPasswordToken = undefined;
  await user.save();
  res.status(200).json("Đổi mật khẩu thành công");
};

module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  forgotpassword,
  changepassword,
  resetpassword,
};

const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const sessionModel = require("../models/session.model");

async function register(req, res) {
  try {
    // 1. get the user info from the body
    const { username, email, password } = req.body;

    // 2. This user info exist or not
    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    // if user exist response and return
    if (isUserExist) {
      return res.status(403).json({
        message: "User already exist.",
      });
    }

    // 4. hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //5.Create User and save to the mongoDB
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    // Create refresh token
    const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    /**
     * Create Session 
     */
    const hashRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const session = await sessionModel.create({
      user: user._id,
      refreshToken: hashRefreshToken,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    // create access token
    const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    });

    // Success response
    res.status(201).json({
      message: "User Registration Successful.",
      data: user,
      accessToken,
    });
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
}

async function LogIn(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (!isUserExist) {
      return res.status(403).json({
        message: "Invalid User",
      });
    }

    const decode = await bcrypt.compare(password, isUserExist.password);

    if (!decode) {
      return res.status(403).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: isUserExist._id }, config.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
      message: "Login Successful.",
      data: isUserExist,
      token: token,
    });
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
}

async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token not found.",
    });
  }

  // Create Access Token
  const decode = jwt.verify(refreshToken, config.JWT_SECRET);
  const accessToken = jwt.sign({ id: decode.id }, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  // reCreate refresh token
  const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  })

  if (!session)
  {
    return res.status(403).json({
      message: 'Session expired'
    })
  }

  const newRefreshToken = jwt.sign({ id: decode.id }, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const newRefreshTokenHash  = crypto.createHash('sha256').update(newRefreshToken).digest('hex')
  session.refreshToken = newRefreshTokenHash
  await session.save()

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: 7 * 24 * 60 * 60 * 100, // 7 day
  });

  res.status(200).json({
    message: "Access Token Refreshed.",
    accessToken,
  });
}

async function logOut(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token not found.",
    });
  }

  // hash refresh token 
  const hashRefreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

  const session = await sessionModel.findOne({
    hashRefreshToken,
    revoked: false,
  })

  if (!session)
  {
    return res.status(400).json({
      message: 'Invalid session.'
    })
  }

  session.revoked = true;
  await session.save()

  res.clearCookie('refreshToken')

  res.status(200).json({
    message: 'Logout Successful.'
  })
}

module.exports = { register, LogIn, refreshToken };

const db = require("../models");
const { authenticate } = require("../authentication/authentication");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const { encrypt } = require("../authentication/crypto");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in user registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  let { userId } = await authenticate(req, res, "credentials");

  if (userId !== undefined) {
    let user = {};
    await User.findByPk(userId).then((data) => {
      user = data;
    });

    let expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + 1);

    const session = {
      email: user.email,
      userId: userId,
      expirationDate: expireTime,
    };
    await Session.create(session).then(async (data) => {
      let sessionId = data.id;
      let token = await encrypt(sessionId);
      let userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        token: token,
      };
      res.send(userInfo);
    });
  }
};

exports.logout = async (req, res) => {
  let auth = req.get("authorization");
  console.log(auth);
  if (
    auth != null &&
    auth.startsWith("Bearer ") &&
    (typeof require !== "string" || require === "token")
  ) {
    let token = auth.slice(7);
    let sessionId = await decrypt(token);
    if (sessionId == null) return;
    return await Session.destroy({ where: { id: sessionId } }).catch(
      (error) => {
        console.log(error);
      }
    );
  }
};

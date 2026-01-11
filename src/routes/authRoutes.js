const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

router.post('/login', async (req, res) => {
  // Your login logic here
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
  
  res.json({ success: true, token });
});
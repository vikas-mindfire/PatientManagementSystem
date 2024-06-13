const router = require('../../route')
const { protect } = require('../../middleware/authMiddleware')
const {
  registerUser,
  loginUser,
  getLoggedInUser,
} = require("./controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getLoggedInUser);

module.exports = router;
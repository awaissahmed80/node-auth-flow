const router = require("express").Router();
const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')

router.use('/auth', authRoutes);

/* Protected Rotues */
router.use('/users', userRoutes)
module.exports = router;
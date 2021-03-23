const router = require('express').Router()
const {registerValidation,loginValidation,auth} = require('../app/middlewares/auth')
const {register} = require('../app/controllers/Auth/RegisterController')
const {login} = require('../app/controllers/Auth/LoginController')
const { test } = require('../app/controllers/Auth/TestController')
const { refreshToken } = require('../app/controllers/Auth/RefreshTokenController')
const { fileUpload } = require('../app/controllers/FileHandling/FileUploadController')


router.post('/register',registerValidation,register)
router.post('/login',loginValidation,login)
router.post('/refresh-session',refreshToken)
router.get('/protected',auth,test)

router.post('/upload',fileUpload)

module.exports = router
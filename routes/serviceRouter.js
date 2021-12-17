const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/serviceController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const helmet = require('helmet')
router.use(helmet())
router.use(helmet.expectCt({maxAge: 96400, enforce: true, reportUri:"https://google.com",}));
router.use(helmet.dnsPrefetchControl({allow: true,}));
router.use(helmet.frameguard({action: "deny",}));
router.use(helmet.hidePoweredBy());
router.use(helmet.hsts({maxAge: 123456, includeSubDomains: false,}));
router.use(helmet.ieNoOpen());
router.use(helmet.noSniff());
router.use(helmet.referrerPolicy({policy: ["origin", "unsafe-url"],}));
router.use(helmet.xssFilter());

router.post('/', serviceController.create);
router.get('/', serviceController.getAll);
router.get('/category/:categoryId', serviceController.getByCategory);

module.exports = router
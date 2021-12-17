const  Router = require('express')
const  router = new Router()
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const categoryController = require('../controllers/categoryController')
const  {body} = require('express-validator')
const checkRole = require('../middleware/checkRoleMiddleware')

router.use(helmet())
router.use(helmet.hidePoweredBy());
router.use(helmet({ crossOriginOpenerPolicy: true }));
router.use(helmet.contentSecurityPolicy({useDefaults: true, directives: { "script-src": ["'self'", "securecoding.com"],"style-src": null,}}));
router.use(helmet.expectCt({maxAge: 96400, enforce: true, reportUri:"https://google.com",}));
router.use(helmet.dnsPrefetchControl({allow: true,}));
router.use(helmet.frameguard({action: "deny",}));
router.use(helmet.hsts({maxAge: 123456, includeSubDomains: false,}));
router.use(helmet.ieNoOpen());
router.use(helmet.noSniff());
router.use(helmet.referrerPolicy({policy: ["origin", "unsafe-url"],}));
router.use(helmet.xssFilter());

router.post('/', body('name').isLength({min:1}),
        categoryController.create);
router.get('/', categoryController.getAll);

module.exports = router
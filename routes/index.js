const Router = require('express')
const router = new Router()
const helmet = require('helmet')
const categoryRouter = require('./categoryRouter');
const serviceRouter = require('./serviceRouter');

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
router.use('/category',categoryRouter);
router.use('/service',serviceRouter);  
module.exports = router
const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.serveStaticFiles);

router.post('/api/uploadFiles', controller.uploadFiles);


module.exports = router;

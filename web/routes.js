const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.serveStaticFiles);
router.get('/axios.js', controller.serveAxios);

router.post('/api/uploadFiles', controller.uploadFiles);

router.post('/api/signUp', controller.signUp);

router.post('/api/login', controller.login);


module.exports = router;

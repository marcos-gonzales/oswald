const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')
const db = require('../models/db')


router.get('/', blogController.getIndex);

// Our Database with the blog info
router.get('/blog', blogController.getData);

router.post('/post', blogController.postBlog);
router.post('/delete/:id', blogController.deletePost);

module.exports = router;
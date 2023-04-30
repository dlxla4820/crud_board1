const { Router } = require('express');
const mongoose = require('mongoose');
const { Post } = require('../models');
const router = Router();



mongoose.connect('mongodb://localhost:27017/test');



router.get('/', async(req, res, next) => {
    if (req.query.write) {
        res.render('posts/edit');
        return;
    }
    const posts = await Post.find({});
    res.render('posts/list', { posts });
    
})

router.get('/:shortId', async (req, res, next) => {
    const { shortId } = req.params;
    const post = await Post.findOne({ shortId });
    if (!post) {
        next(new Error('Post NotFound'));
        return;
    }
    if (req.query.edit) {
        res.render('posts/edit', { post });
        return;
    }
    res.render('posts/view', { post });
}); 


//게시글 생성
router.post('/', async(req, res, next) => {
    const {title, content} = req.body;
    try {
        await Post.create({
            title,
            content,
        });
        res.redirect('/');
    } catch(err) {
        next(err);
    }
});

//게시글 수정
router.post('/:shortId', async(req, res, next) => {
    const {shortId} = req.params;
    const {title, content} = req.body;
    
    const post = await Post.findOneAndUpdate({shortId}, {title, content,});
    if (!post){
        next(new Error('Post NotFound'));
        return;
    }
    res.redirect(`/posts/${shortId}`);
});

//게시글 삭제
router.delete('/:shortId', async(req, res, next) => {
    
    const {shortId} = req.params;
    try {
        await Post.deleteOne({ shortId });
        res.send('OK');

    } catch (err){
        next(err);
    }
});

module.exports = router;
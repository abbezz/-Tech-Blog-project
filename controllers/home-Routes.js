const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comments } = require('../models');


// homepage
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comments,
          include: [{model: User}],
        },
      ],
      order: [
        ["id", "DESC"],
        [Comments, "id", 'ASC']
      ]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts,
      logged_in: req.session.logged_in, 
      name: req.session.name,
      userId: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }

});


//login
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  //dashboard 
  router.get('/dashboard', async (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
  
    try {
      // Get all posts and JOIN with user data
      const postData = await Post.findAll({
        where: {user_id: req.session.user_id},
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Comments,
            include: [{model: User}],
          },
        ],
        order: [
          ["id", "DESC"],
          [Comments, "id", 'ASC']
        ]
      });
      
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
        posts,
        logged_in: req.session.logged_in, 
        name: req.session.name,
        userId: req.session.user_id
      });
    } catch (err) {
      res.status(500).json(err);
    }
  
  });

module.exports = router;
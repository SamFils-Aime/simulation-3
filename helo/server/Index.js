
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()



const {
    SERVER_PORT, 
    SESSION_SECRET, 
    CONNECTION_STRING,
    } = process.env;



 
    const { register, login, logout, getSession } = require('./auth');
    const {getPosts,getFilteredPosts,getUserFilteredPosts,getDetailedPost,addPost}= require('./post');
    
    massive(CONNECTION_STRING)
      .then(db => app.set('db', db))
      .catch(err => console.error(err));
    
    app
      .use(express.json())
      .use(
        session({
          secret: SESSION_SECRET,
          saveUninitialized: true,
          resave: false,
        })
      )
      app.get('/auth/logout', logout)
      app.get('/auth/session', getSession)
      app.post('/auth/login', login)
      app.post('/auth/register', register)
      app.get('/api/posts', getPosts)

      app.get('/api/posts',getPosts);
      app.get('/api/posts/filter',getFilteredPosts);
      app.get('/api/posts/:id',getDetailedPost);
      app.get('/api/posts/userFilteredPosts',getUserFilteredPosts);
      app.post('/api/post',addPost);


      app.listen(SERVER_PORT, () => console.log(`let's get it started ${SERVER_PORT}`));
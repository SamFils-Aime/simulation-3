module.exports={
  getPosts: async (req,res)=>{
      const db = req.app.get('db');
      const posts = await db.posts.getPosts();
      res.status(200).json(posts)
  },
  getDetailedPost: async(req,res)=>{
      const db = req.app.get('db');
      const post_id = +req.params.id;
      const detailedPost = await db.posts.getPost(post_id);
      res.status(200).json(detailedPost);
      // console.log(detailedPost)
  },
  getFilteredPosts: async(req,res)=>{
      const db =req.app.get('db');
      // const id = +req.session.user.id;
      const {title}= req.query;
      // const filteredPosts = await db.getFilteredPosts(id,title);
      const filteredPosts = await db.posts.getFilteredPosts(title);
      res.status(200).json(filteredPosts);
      // console.log(filteredPosts)
  },
  getUserFilteredPosts: async (req,res)=>{
      const db = req.app.get('db');
      const id = +req.session.user.id;
      const {title}= req.query;
      const userFilteredPosts = await db.posts.getUserFilteredPosts(id,title);
      res.status(200).json(userFilteredPosts);
  },
  addPost: async (req,res)=>{
      const{title,img,content,author_id}= req.body;
      const db = req.app.get('db');
      newPost = db.posts.addPost(title,img,content,author_id);
      res.status(200).json(newPost);
      console.log(newPost);
      
  }
}
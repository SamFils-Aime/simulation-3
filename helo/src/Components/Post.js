import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getPosts } from '../ducks/reducers/postsreducer';

class Post extends React.Component{
    state={post:[]}
    componentDidMount(){
        const id = this.props.user
        console.log(id)
        axios.get(`api/posts/userFilteredPosts`).then(res => {
            this.setState({ post: res.data});
          });
        
    }
    render(){
        const post = this.state.post.map(el=>{
            return(
                <div key={el.id}>
                    
                    <h2>{el.title}</h2>
                    <img src={el.img} alt="post" width="200px"/>
                    <p>{el.content}</p>
                    <img src={el.profile_pic} width="50px" alt="profile"/>
                    <p>by {el.username}</p>
                </div>
            )
        })
        
        return(
            <div>Post

                
               {post}



            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({ 
    user_id: reduxState.user.user_id, 
    posts: reduxState.posts,
    loading: reduxState.loading
  })
  export default connect(mapStateToProps, { getPosts })(Post)
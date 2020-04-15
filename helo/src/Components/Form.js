import React, { Component } from 'react'
import './../styles/form.scss'
import axios from "axios"
import { connect } from 'react-redux';
import { getPosts } from '../ducks/reducers/postsreducer';

class Form extends Component {
  constructor(){
  super()
  this.state={
    post:[],
    title:'',
    img:'',
    content:'',
    author_id: 0
  }
  }


  handleChange=(e)=>{
    this.setState({[e.target.name] : e.target.value})
  }


 componentDidMount(){
    this.props.getPosts()
    this.setState({author_id: this.props.user_id})
    axios.get(`/api/userposts`).then(res => {
        this.setState({ post: res.data});
      });
    }

    sendPost=()=>{
      const obj = {
        title: this.state.title,
        img: this.state.img,
        content: this.state.content,
        author_id:this.state.author_id
      }
      axios.post('/api/post', obj)
      .then( result=>console.log(result))
    }

   post=()=>{ this.state.post.map(el=>{
      return(
          <div>
              
              <h2>{el.title}</h2>
              <img src={el.img} alt="post" width="200px"/>
              <p>{el.content}</p>
              <p>by {el.username}</p>
          </div>
      )
   }
   )
  }


  render() {
      console.log(this.state)
    return (
      <div className="content-container">
      <div className="content-container--inner">
        {this.post}
        <div>
          <div>
          title
          </div>
        <input 
        onChange={e => this.handleChange(e)}
        name="title"></input>
        <div>
        img URL
        </div>
        <input
        onChange={e => this.handleChange(e)}
         name="img"></input>
        <div>
        content
        </div>
        <input
        onChange={e => this.handleChange(e)}
         name="content"></input>
        <button onClick={this.sendPost}>Post</button>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (reduxState) => ({
  user_id: reduxState.user.user_id,
  username: reduxState.user.username,
});

export default connect(mapStateToProps, { getPosts })(Form)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSession } from '../ducks/reducers/userReducer';
import SearchForm from './Dashboard/searchForm'
import axios from "axios"
import {Link} from 'react-router-dom';
import Post from "./Post"

class Dashboard extends Component {
  
    constructor() {
      super();
      this.state = {
        checked:true,
        posts: [],
        searchInput: "",
        filteredPosts:[],
        user:[]
      };
    }
    componentDidMount() {
      this.props.getSession();
      this.getAllPosts();
    }
   
  
    getAllPosts = () => {
      axios.get("/api/posts").then(res => {
        this.setState({ posts: res.data});
      });
    };
  
    getFilteredPosts = (searchInput) => {
      let searchText = `%${searchInput}%`
      axios.get(`/api/posts/filter?title=${searchText}`).then(res => {
        this.setState({filteredPosts: res.data });
        console.log(res.data)
      })
      // .catch(err=>console.log(err))
    };
  
    
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    render() {
      console.log(this.state)
      const mappedPosts = this.state.posts.map((el, i) => {
        return (
        <Link to={`/posts/${el.id}`} key={el.title+i}>
            <div  className="post">
            <h4>{el.title}</h4>
            <p>{el.username}</p>
            <img src={el.profile_pic} alt="profile" width="50px" />
          </div>
      </Link>
        );
      });
      const filteredPosts = this.state.filteredPosts.map((el, i) => {
        return (
        <Link to={`/posts/${el.id}`} key={el.title+i}>
            <div  className="post">
            <h4>{el.title}</h4>
            <p>{el.username}</p>
            <img src={el.profile_pic} alt="profile" width="50px" />
          </div>
      </Link>
        );
      });
  
      return (
        <div>
          <div>
            <input
              placeholder="search by Title"
              onChange={this.handleChange}
              name="searchInput"
            />
            <button onClick={()=>this.getFilteredPosts(this.state.searchInput)}>Search</button>
            <button onClick={() => {this.getAllPosts()}}> Reset </button>
            <span>My posts</span>
            <input
              type="checkbox"
              checked={this.state.checked}
              onChange={() => this.setState({ checked: !this.state.checked })}
            />
          </div>
          <div>
            {!this.state.searchInput? mappedPosts:filteredPosts && filteredPosts.length === 0 ? mappedPosts:filteredPosts}
            </div>
        </div>
      );
    }
  }
const mapStateToProps = (reduxState) => ({ 
  user_id: reduxState.user.user_id, 
  posts: reduxState.posts,
  loading: reduxState.loading
})
export default connect(mapStateToProps, { getSession })(Dashboard)
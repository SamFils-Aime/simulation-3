import React, { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import { connect } from 'react-redux';

import { getPosts } from '../../ducks/reducers/postsreducer';

class SearchForm extends Component {
    state = {
      title: '',
      checkbox: true,
    }
  
    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value })
    }
  
    clear = (e) => {
      e.preventDefault();
      this.setState({ title: '' });
    }
  
    Search = (e) => {
      e.preventDefault();
      const { title } = this.state;
      this.props.getPosts({ title });
    }
  
    render() {
      return (
        <form className="search">
          <div className="search--input">
            <input onChange={this.handleChange} value={this.state.title} name="title" type="text" placeholder="Search By Title" />
            <button onClick={this.Search}><FiSearch /></button>
            <button onClick={this.clear}>Reset</button>
          </div>
        </form>
      )
    }
  }
  
  export default connect(null, { getPosts })(SearchForm)
import React, { Component } from 'react';

// Create NavBar Component
class SearchBar extends Component {

  render() {
    return (
    // Create nav bar
      
        <div className="search-sort">
            <div className="search-left">
                <input id='searchbar' type="text" placeholder="Search.."/>
                <button id='search-button' onClick={(e) => this.props.searchHandler(e)}>Search</button>
            </div>
            <div className="search-right">
                <p id='search-tag'>Sort By: </p>
                <select className="glazing-list" onChange={(e) => this.props.handleSortChange(e)} id="sort">
                    <option value="name" >Name</option>
                    <option value="price" >Price</option>
                </select>
            </div>
        </div>
      
    );
  }
}

export default SearchBar
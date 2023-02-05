import React from 'react';
import {Link} from 'react-router-dom';

const SearchResult = () => {
  return (
    <Link to='user' className='serach-result-text-decoration-none'>
      <div className='search-result-container'>
        <div className='search-result-image-user'>
          <div className='search-result-image-container'>
              <img className='search-img-user' src='https://cdn.pixabay.com/photo/2023/01/24/10/02/woman-7740613__340.jpg' alt='imageForUser'/>
          </div>
        </div> 
        <div className='search-result-fullname-user'>
          <p className='search-fullname-user'>Bell bunlung</p>
        </div>    
      </div>
    </Link>
  );
}

export default SearchResult;
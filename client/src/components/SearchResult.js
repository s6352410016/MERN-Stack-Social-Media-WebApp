import React from 'react';
import {Link} from 'react-router-dom';

const SearchResult = ({image , fullname}) => {
  return (
    <Link to='id' className='serach-result-text-decoration-none'>
      <div className='search-result-container'>
        <div className='search-result-image-user'>
          <div className='search-result-image-container'>
              <img className='search-img-user' src={image} alt='imageUser'/>
          </div>
        </div> 
        <div className='search-result-fullname-user'>
          <p className='search-fullname-user'>{fullname}</p>
        </div>    
      </div>
    </Link>
  );
}

export default SearchResult;
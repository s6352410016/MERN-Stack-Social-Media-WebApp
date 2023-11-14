import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = ({setOpenProfileStatus, userId, image, firstname, lastname }) => {
  return (
    <Link onClick={() => setOpenProfileStatus(true)} to={`/profile/${userId}`} className='serach-result-text-decoration-none'>
      <div className='search-result-container'>
        <div className='search-result-image-user'>
          <div className='search-result-image-container'>
            <img className='search-img-user' src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!image ? 'profileImgDefault.jpg' : image}`} alt='imageUser' />
          </div>
        </div>
        <div className='search-result-fullname-user'>
          <b className='search-fullname-user'>{firstname} {lastname}</b>
        </div>
      </div>
    </Link>
  );
}

export default SearchResult;
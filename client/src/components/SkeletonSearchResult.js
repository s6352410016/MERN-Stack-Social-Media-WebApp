import React from 'react';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonSearchResult = () => {
  return (
    <Link className='serach-result-text-decoration-none'>
      <div className='search-result-container' id='no-bg-skeleton-load-in-search-result'>
        <div className='search-result-image-user'>
          <div className='search-result-image-container'>
            <Skeleton circle={true} height={50} width={50} className='style-skeleton-img-search-result'/>
          </div>
        </div> 
        <div className='search-result-fullname-user'>
          <p className='search-fullname-user'><Skeleton height={15} width={200} className='style-skeleton-fullname-search-result'/></p>
        </div>    
      </div>
    </Link>
  );
}

export default SkeletonSearchResult;
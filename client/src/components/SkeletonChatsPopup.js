import React from 'react';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonChatsPopup = () => {
  return (
    <Link className='link-container-chats-of-users cursor-default'>
      <div className='container-chats-of-users' id='no-bg-skeleton-load-in-chats-of-users'>
        <div className='content-header-chats-of-users'>
          <div className='container-img-chats-of-users'>
            <Skeleton circle={true} height={50} width={50}/>
          </div>
        </div>
        <div className='content-center-chats-of-users'>
          <div className='container-fullname-chats-of-users'>
            <p><Skeleton height={15} width={150}/></p>
          </div>
          <div className='container-sender-msg-chats-of-users'>
            <p><Skeleton height={15} width={200}/></p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SkeletonChatsPopup;
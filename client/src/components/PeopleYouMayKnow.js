import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';

const PeopleYouMayKnow = ({image , fullname}) => {
  return (
    <div className='container-people-you-may-know'>
        <Link to='/id' className='text-decoration-none-in-container-people-you-may-know' id='fix-container-img'>
            <div className='container-image-people-you-may-know'>
                <div className='img-container-people-you-may-know'>
                    <img src={image} alt='imageForUser'/>
                </div>          
            </div>
        </Link>
        <Link to='/id' className='text-decoration-none-in-container-people-you-may-know' id='fix-container-fullname'>
            <div className='container-fullname-people-you-may-know'>
                <b>{fullname}</b>
            </div>
        </Link>
        <div className='container-button-follow-people-you-may-know'>
            <button>
                <FontAwesomeIcon icon={faUserPlus} className='follower-user-icon'/>
            </button>
        </div>
    </div>
  );
}

export default PeopleYouMayKnow;
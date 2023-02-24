import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { RotatingLines } from 'react-loader-spinner';

const PeopleYouMayKnow = ({ image, fullname }) => {
    const [changeIcon, setChangeIcon] = useState(false);
    const [loadingEffectFollow, setLoadingEffectFollow] = useState(false);

    const followUser = () => {
        setLoadingEffectFollow(true);
        setTimeout(() => {
            setLoadingEffectFollow(false);
            setChangeIcon(true);
        }, 1000);
    }

    return (
        <div className='container-people-you-may-know'>
            <Link to='/id' className='text-decoration-none-in-container-people-you-may-know' id='fix-container-img'>
                <div className='container-image-people-you-may-know'>
                    <div className='img-container-people-you-may-know'>
                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${image}`} alt='imageForUser' />
                    </div>
                </div>
            </Link>
            <Link to='/id' className='text-decoration-none-in-container-people-you-may-know' id='fix-container-fullname'>
                <div className='container-fullname-people-you-may-know'>
                    <b>{fullname}</b>
                </div>
            </Link>
            <div className='container-button-follow-people-you-may-know'>
                <button onClick={followUser}>
                    {loadingEffectFollow
                        ?
                        <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="50%" visible={true} />
                        :
                        <FontAwesomeIcon icon={changeIcon ? faUserCheck : faUserPlus} className='follower-user-icon' />
                    }
                </button>
            </div>
        </div>
    );
}

export default PeopleYouMayKnow;
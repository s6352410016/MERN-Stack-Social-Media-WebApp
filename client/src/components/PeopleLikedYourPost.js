import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const PeopleLikedYourPost = ({ UserIdToLikeInPost, dataForUser }) => {
    const [changeIconFollower, setChangeIconFollower] = useState(false);
    const [loadingEffectFollow, setLoadingEffectFollow] = useState(false);
    const [dataOfUserToLikeInPostByUserId, setDataOfUserToLikeInPostByUserId] = useState({});

    const delayChangeIconFollower = () => {
        setLoadingEffectFollow(true);
        setTimeout(() => {
            setLoadingEffectFollow(false);
            setChangeIconFollower(true);
        }, 1000);
    }

    useEffect(() => {
        if (UserIdToLikeInPost) {
            setDataOfUserToLikeInPostByUserId(dataForUser.find((e) => e.userId === UserIdToLikeInPost));
        }
    }, []);

    return (
        <div className='container-profile-card-in-people-likes-post-list'>
            <Link to='id' className='container-img-in-center-in-people-likes-post-list'>
                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${dataOfUserToLikeInPostByUserId.image}`} alt='imgProfile' />
            </Link>
            <Link to='id' className='container-fullname-in-center-in-people-likes-post-list'>
                <b>{dataOfUserToLikeInPostByUserId.fullname}</b>
            </Link>
            <div className='container-follow-icon-in-center-in-people-likes-post-list'>
                <button onClick={delayChangeIconFollower}>
                    {loadingEffectFollow
                        ?
                        <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="80%" visible={true} />
                        :
                        <FontAwesomeIcon className='icon-fa-user-in-container-follow-icon-in-center-in-people-likes-post-list' icon={changeIconFollower ? faUserCheck : faUserPlus} />
                    }
                </button>
            </div>
        </div>
    );
}

export default PeopleLikedYourPost;
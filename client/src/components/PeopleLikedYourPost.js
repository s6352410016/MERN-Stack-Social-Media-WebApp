import React , {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus , faUserCheck} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const PeopleLikedYourPost = ({UserIdToLikeInPost , dataForUser}) => {
    const [changeIconFollower , setChangeIconFollower] = useState(false);
    const [dataOfUserToLikeInPostByUserId , setDataOfUserToLikeInPostByUserId] = useState({});

    const delayChangeIconFollower = () => {
        setTimeout(() => {
            setChangeIconFollower(true);
        }, 150);
    }

    useEffect(() => {
        if(UserIdToLikeInPost){
            setDataOfUserToLikeInPostByUserId(dataForUser.find((e) => e.userId === UserIdToLikeInPost));
        }
    });

    return (
        <div className='container-profile-card-in-people-likes-post-list'>
            <Link to='id' className='container-img-in-center-in-people-likes-post-list'>
                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${dataOfUserToLikeInPostByUserId.image}`} alt='imgProfile' />
            </Link>
            <Link to='id' className='container-fullname-in-center-in-people-likes-post-list'>
                <b>{dataOfUserToLikeInPostByUserId.fullname}</b>
            </Link>
            <div className='container-follow-icon-in-center-in-people-likes-post-list'>
                <button onClick={delayChangeIconFollower}><FontAwesomeIcon icon={changeIconFollower ? faUserCheck : faUserPlus}/>&nbsp;&nbsp;{changeIconFollower ? 'Following' : 'Follow'}</button>
            </div>
        </div>
    );
}

export default PeopleLikedYourPost;
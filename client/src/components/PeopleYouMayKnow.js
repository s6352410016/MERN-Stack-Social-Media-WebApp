import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { RotatingLines } from 'react-loader-spinner';
import { SocketIOContext } from './SocketContext';

const PeopleYouMayKnow = ({ followAndUnFollow, setFollowAndUnFollow, activeUserId, activeUserData, userId, image, firstname, lastname, follower }) => {
    const { socket } = useContext(SocketIOContext);

    const [loadingEffectFollow, setLoadingEffectFollow] = useState(false);

    const followUser = () => {
        setLoadingEffectFollow(true);
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/followAndUnFollow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                activeUserId: activeUserData._id,
                userIdToFollow: userId
            })
        }).then((res) => {
            if (res.status === 200) {
                setLoadingEffectFollow(false);
                setFollowAndUnFollow(!followAndUnFollow);
                socket.current?.emit('created');
            }
        });
    }

    return (
        <div className='container-people-you-may-know'>
            <Link to={`/profile/${userId}`} className='text-decoration-none-in-container-people-you-may-know' id='fix-container-img'>
                <div className='container-image-people-you-may-know'>
                    <div className='img-container-people-you-may-know'>
                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!image ? 'profileImgDefault.jpg' : image}`} alt='imageForUser' />
                    </div>
                </div>
            </Link>
            <Link to={`/profile/${userId}`} className='text-decoration-none-in-container-people-you-may-know' id='fix-container-fullname'>
                <div className='container-fullname-people-you-may-know'>
                    <b>{firstname} {lastname}</b>
                </div>
            </Link>
            <div className='container-button-follow-people-you-may-know'>
                <button onClick={followUser}>
                    {loadingEffectFollow
                        ?
                        <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="50%" visible={true} />
                        :
                        activeUserData !== undefined &&
                        <FontAwesomeIcon icon={activeUserData.following.includes(userId) ? faUserCheck : faUserPlus} className='follower-user-icon' />
                    }
                </button>
            </div>
        </div>
    );
}

export default PeopleYouMayKnow;
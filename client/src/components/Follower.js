import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const Follower = ({ openFollowerPopup, setOpenFollowerPopup, showProfilePageStatus, setShowProfilePageStatus, userIdToFollower, userInfo, userData, followAndUnFollow, setFollowAndUnFollow }) => {
    const [dataOfUserToFollowerByUserId, setDataOfUserToFollowerByUserId] = useState({});
    const [dataUserInActive, setDataUserInActive] = useState({});
    const [loadingEffectFollow, setLoadingEffectFollow] = useState(false);

    const delayChangeIconFollower = () => {
        setLoadingEffectFollow(true);
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/followAndUnFollow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                activeUserId: dataUserInActive._id,
                userIdToFollow: userIdToFollower
            })
        }).then((res) => {
            if (res.status === 200) {
                setLoadingEffectFollow(false);
                setFollowAndUnFollow(!followAndUnFollow);
            }
        });
    }

    const openProfilePage = () => {
        setShowProfilePageStatus(!showProfilePageStatus);
        setOpenFollowerPopup(false);
    }

    useEffect(() => {
        if (userIdToFollower) {
            setDataOfUserToFollowerByUserId(userInfo.find((e) => e._id === userIdToFollower));
        }
        if (userData) {
            setDataUserInActive(userInfo.find((e) => e._id === userData));
        }
    });

    return (
        <div className='container-profile-card-in-people-likes-post-list'>
            <Link onClick={openProfilePage} to={`/profile/${userIdToFollower}`} className='container-img-in-center-in-people-likes-post-list'>
                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!dataOfUserToFollowerByUserId.profilePicture ? 'profileImgDefault.jpg' : dataOfUserToFollowerByUserId.profilePicture}`} alt='imgProfile' />
            </Link>
            <Link onClick={openProfilePage} to={`/profile/${userIdToFollower}`} className='container-fullname-in-center-in-people-likes-post-list'>
                <b>{dataOfUserToFollowerByUserId.firstname} {dataOfUserToFollowerByUserId.lastname}</b>
            </Link>
            {dataUserInActive._id === userIdToFollower
                ?
                <></>
                :
                <div className='container-follow-icon-in-center-in-people-likes-post-list'>
                    <button onClick={delayChangeIconFollower}>
                        {loadingEffectFollow
                            ?
                            <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="80%" visible={true} />
                            :
                            dataUserInActive.following !== undefined &&
                            <FontAwesomeIcon className='icon-fa-user-in-container-follow-icon-in-center-in-people-likes-post-list' icon={dataUserInActive.following.includes(userIdToFollower) ? faUserCheck : faUserPlus} />
                        }
                    </button>
                </div>
            }
        </div>
    );
}

export default Follower;
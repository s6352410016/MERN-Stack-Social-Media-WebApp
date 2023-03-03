import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';

const FollowersList = ({followerUserId , dataForUser}) => {
    const [changeIconFollower, setChangeIconFollower] = useState(false);
    const [dataOfFollower , setDataOfFollower] = useState({});

    const delayChangeIconFollower = () => {
        setTimeout(() => {
            setChangeIconFollower(true);
        }, 150);
    }

    useEffect(() => {
        if(followerUserId){
            setDataOfFollower(dataForUser.find((e) => e.userId === followerUserId));
        }
    } , []);

    return (
        <div className='container-user-data-in-container-user-data-in-follower-popup-in-container-follower-user-list-in-container-show-follower-of-user-in-container-show-status-in-container-show-post-follower-following-in-container-user-profile-in-container-content-right-in-body'>
            <Link to='/id' className='container-img-in-container-user-data-in-container-user-data-in-follower-popup-in-container-follower-user-list-in-container-show-follower-of-user-in-container-show-status-in-container-show-post-follower-following-in-container-user-profile-in-container-content-right-in-body'>
                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${dataOfFollower.image}`} alt='imgProfile' />
            </Link>
            <Link to='/id' className='container-fullname-user-in-container-user-data-in-container-user-data-in-follower-popup-in-container-follower-user-list-in-container-show-follower-of-user-in-container-show-status-in-container-show-post-follower-following-in-container-user-profile-in-container-content-right-in-body'>
                <p>{dataOfFollower.fullname}</p>
            </Link>
            <div onClick={delayChangeIconFollower} className='container-button-follow-in-container-user-data-in-container-user-data-in-follower-popup-in-container-follower-user-list-in-container-show-follower-of-user-in-container-show-status-in-container-show-post-follower-following-in-container-user-profile-in-container-content-right-in-body'>
                <FontAwesomeIcon className='icon-fa-user-check-in-container-button-follow-in-container-user-data-in-container-user-data-in-follower-popup-in-container-follower-user-list-in-container-show-follower-of-user-in-container-show-status-in-container-show-post-follower-following-in-container-user-profile-in-container-content-right-in-body' icon={changeIconFollower ? faUserCheck : faUserPlus} />
                <p>{changeIconFollower ? 'Following' : 'Follow'}</p>
            </div>
        </div>
    );
}

export default FollowersList;
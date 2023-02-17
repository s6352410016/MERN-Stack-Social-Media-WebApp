import React , {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus , faUserCheck} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const PeopleLikedYourPost = () => {
    const [changeIconFollower , setChangeIconFollower] = useState(false);

    const delayChangeIconFollower = () => {
        setTimeout(() => {
            setChangeIconFollower(true);
        }, 150);
    }

    return (
        <div className='container-profile-card-in-people-likes-post-list'>
            <Link to='id' className='container-img-in-center-in-people-likes-post-list'>
                <img src={require('../images/allUserProfileImg/user10.png')} alt='imgProfile' />
            </Link>
            <Link to='id' className='container-fullname-in-center-in-people-likes-post-list'>
                <b>Prayut Chan O Cha</b>
            </Link>
            <div className='container-follow-icon-in-center-in-people-likes-post-list'>
                <button onClick={delayChangeIconFollower}><FontAwesomeIcon icon={changeIconFollower ? faUserCheck : faUserPlus}/>&nbsp;&nbsp;{changeIconFollower ? 'Following' : 'Follow'}</button>
            </div>
        </div>
    );
}

export default PeopleLikedYourPost;
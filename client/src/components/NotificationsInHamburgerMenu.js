import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Notification from './Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SkeletonNotification from './SkeletonNotification';

const NotificationsInHamburgerMenu = () => {
    const { state } = useLocation();
    const [notifications, setNotifications] = useState([]);
    const [showSkeletonNotification, setShowSkeletonNotification] = useState(true);

    useEffect(() => {
        setNotifications(state.dataUserNotification);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowSkeletonNotification(false);
        }, 1000);
    });

    return (
        <div className='container-notification-in-NotificationsInHamburgerMenu'>
            <div className='container-header-in-container-notification-in-NotificationsInHamburgerMenu'>
                <Link to='/media'><FontAwesomeIcon icon={faChevronLeft} className='icon-arrow-left-in-container-header-in-container-in-SearchPeopleInHamburgerMenu' /></Link>
                <p>Notifications</p>
            </div>
            <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
            <div className='container-body-in-container-notification-in-NotificationsInHamburgerMenu'>
                {notifications !== undefined
                    ?
                    showSkeletonNotification
                        ?
                        notifications.map((e) => (
                            <SkeletonNotification key={e?._id} />
                        ))
                        :
                        notifications.map((e) => (
                            <Notification key={e?._id} userInfo={state.userInfo} notificationOfUserId={e.notificationOfUserId} notificationDetail={e.notificationDetail} createdAt={e.createdAt} />
                        ))
                    :
                    <></>
                }
                {notifications.length === 0 && <p style={{ textAlign: "center", fontSize: ".9rem" }} className='no-notification'>No notification at this time.</p>}
            </div>
        </div>
    );
}

export default NotificationsInHamburgerMenu;
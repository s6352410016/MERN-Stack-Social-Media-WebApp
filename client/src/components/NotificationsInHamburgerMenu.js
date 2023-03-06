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
        setNotifications(state);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowSkeletonNotification(false);
        }, 2000);
    });

    return (
        <div className='container-notification-in-NotificationsInHamburgerMenu'>
            <div className='container-header-in-container-notification-in-NotificationsInHamburgerMenu'>
                <Link to='/media'><FontAwesomeIcon icon={faChevronLeft} className='icon-arrow-left-in-container-header-in-container-in-SearchPeopleInHamburgerMenu' /></Link>
                <p>Notifications</p>
            </div>
            <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
            <div className='container-body-in-container-notification-in-NotificationsInHamburgerMenu'>
                {notifications.dataUserNotification !== undefined
                    ?
                    showSkeletonNotification
                        ?
                        notifications.dataUserNotification.map((e, index) => (
                            <SkeletonNotification key={index} />
                        ))
                        :
                        notifications.dataUserNotification.map((e, index) => (
                            <Notification key={index} image={e.image} username={e.username} userContent={e.userContent} modifyDate={e.modifyDate} />
                        ))
                    :
                    <></>
                }
            </div>
        </div>
    );
}

export default NotificationsInHamburgerMenu;
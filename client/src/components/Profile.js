import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserCheck, faMagnifyingGlass, faBell, faComment, faChevronDown, faUserPen, faArrowRightFromBracket, faCamera, faPlus, faArrowUp, faPenToSquare, faCameraRetro, faTrash } from '@fortawesome/free-solid-svg-icons';
import './css/MediaPage.css';
import SkeletonSearchResult from './SkeletonSearchResult';
import SearchResult from './SearchResult';
import SkeletonNotification from './SkeletonNotification';
import SkeletonChatsPopup from './SkeletonChatsPopup';
import Notification from './Notification';
import SkeletonUserProfileInHambuger from './SkeletonUserProfileInHambuger';
import ChatPopup from './ChatPopup';
import { HiOutlineXMark } from "react-icons/hi2";
import DatePicker from "react-date-picker";
import Follower from './Follower';
import Following from './Following';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CreatePost from './CreatePost';
import Post from './Post';
import SharePost from './SharePost';
import SkeletonPost from './SkeletonPost';
import SkeletonCreatePost from './SkeletonCreatePost';
import { RotatingLines } from 'react-loader-spinner';
import { SocketIOContext } from './SocketContext';
import { toast, Toaster } from "react-hot-toast";

const Profile = ({ setLogoutStatus }) => {
  const { socket } = useContext(SocketIOContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const inputUploadProfileImg = useRef();
  const inputUploadProfileBgImg = useRef();
  const containerPostScrollRef = useRef();
  const userDataRef = useRef();

  const [searchResult, setSearchResult] = useState('');
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [showSkeletonSearchResult, setShowSkeletonSearchResult] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [dataUserNotification, setDataUserNotification] = useState([]);
  const [userDataInActive, setUserDataInActive] = useState({});
  const [alertStatus, setAlertStatus] = useState(false);
  const [countAlert, setCountAlert] = useState(0);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openMenus, setOpenMenus] = useState(false);
  const [openChats, setOpenChats] = useState(false);
  const [showSkeletonNotification, setShowSkeletonNotification] = useState(true);
  const [showSkeletonChatsPopup, setShowSkeletonChatsPopup] = useState(true);
  const [showSkeletonUserProfileInHamburger, setShowSkeletonUserProfileInHamburger] = useState(true);
  const [showSkeletonCreatePost, setShowSkeletonCreatePost] = useState(true);
  const [userData, setUserData] = useState({});
  const [followAndUnFollow, setFollowAndUnFollow] = useState(false);
  const [createPostStatus, setCreatePostStatus] = useState(false);
  const [editPostStatus, setEditPostStatus] = useState(false);
  const [deletePostStatus, setDeletePostStatus] = useState(false);
  const [createSharePostStatus, setCreateSharePostStatus] = useState(false);
  const [editSharePostStatus, setEditSharePostStatus] = useState(false);
  const [deleteSharePostStatus, setDeleteSharePostStatus] = useState(false);
  const [openEditProfilePicturePopup, setOpenEditProfilePicturePopup] = useState(false);
  const [openEditCoverPicturePopup, setOpenEditCoverPicturePopup] = useState(false);
  const [openEditProfilePopup, setOpenEditProfilePopup] = useState(false);
  const [openEditProfileBackgroundPopup, setOpenEditProfileBackgroundPopup] = useState(false);
  const [openPreviewProfileBgImg, setOpenPreviewProfileBgImg] = useState(false);
  const [openFollowerPopup, setOpenFollowerPopup] = useState(false);
  const [openFollowingPopup, setOpenFollowingPopup] = useState(false);
  const [showProfilePageStatus, setShowProfilePageStatus] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [likedSharePost, setLikedSharePost] = useState(false);
  const [showIconScrollToTop, setShowIconScrollToTop] = useState(false);
  const [showSkeletonProfileDetailHeader, setShowSkeletonProfileDetailHeader] = useState(true);
  const [showSkeletonProfileDetailBody, setShowSkeletonProfileDetailBody] = useState(true);
  const [showSkeletionPost, setShowSkeletonPost] = useState(true);
  const [showEffectWhileUploadProfileImg, setShowEffectWhileUploadProfileImg] = useState(false);
  const [showEffectWhileUploadProfileBgImg, setShowEffectWhileUploadProfileBgImg] = useState(false);
  const [showEffectWhileUpdateProfile, setShowEffectWhileUpdateProfile] = useState(false);
  const [disableButtonUploadProfileImg, setDisableButtonUploadProfileImg] = useState(true);
  const [disableButtonUploadProfileBgImg, setDisableButtonUploadProfileBgImg] = useState(true);
  const [disavleButtonUpdateProfile, setDisableButtonUpdateProfile] = useState(true);
  const [objURLOfProfileImg, setObjURLOfProfileImg] = useState('');
  const [profileImg, setProfileImg] = useState();
  const [objURLOfProfileBackgroundImg, setObjURLOfProfileBackgroundImg] = useState('');
  const [profileBackgroundImg, setProfileBackgroundImg] = useState();
  const [value, setValue] = useState();
  const [dateToSelect, setDateToSelect] = useState('');
  const [postOfusers, setPostOfusers] = useState([]);
  const [postOfUsersToShare, setPostOfUsersToShare] = useState([]);
  const [sortAllPostAscening, setSortAllPostAscending] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [otherDetail, setOtherDetail] = useState('');
  const [openProfileStatus, setOpenProfileStatus] = useState(false);
  const [userDataFollow, setUserDataFollow] = useState({});
  const [followStatus, setFollowStatus] = useState(false);
  const [deleteCurrentProfileImg, setDeleteCurrentProfileImg] = useState(false);
  const [deleteCurrentProfileBgImg, setDeleteCurrentProfileBgImg] = useState(false);
  const [effectWhileDeleteProfileImg, setEffectWhileDeleteProfileImg] = useState(false);
  const [effectWhileDeleteProfileBgImg, setEffectWhileDeleteProfileBgImg] = useState(false);
  const [disableBtnDeleteProfileBgImg, setDisableBtnDeleteProfileBgImg] = useState(true);
  const [disableBtnDeleteProfileImg, setDisableBtnDeleteProfileImg] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeletonNotification(false);
      setShowSkeletonSearchResult(false);
      setShowSkeletonChatsPopup(false);
      setShowSkeletonUserProfileInHamburger(false);
      setShowSkeletonProfileDetailHeader(false);
      setShowSkeletonProfileDetailBody(false);
      setShowSkeletonPost(false);
      setShowSkeletonCreatePost(false);
    }, 1000);
  }, []);

  const SearchResultPopup = () => {
    setOpenSearchResult(!openSearchResult);
    setOpenMenus(false);
    setOpenNotifications(false);
    setOpenChats(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const notificationPopup = () => {
    if (dataUserNotification.length > 0) {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateUserToReadNotification`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userIdToRead: userData.userId
        })
      }).then((res) => {
        if (res.status === 200) {
          // socket.current?.emit('updatedNotification');
          setCountAlert(0);
          setAlertStatus(false);
        }
      });
    }

    setOpenNotifications(!openNotifications);
    setOpenMenus(false);
    setOpenSearchResult(false);
    setOpenChats(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const closeEditProfileImgPopup = () => {
    setOpenEditProfilePicturePopup(false);
    setShowEffectWhileUploadProfileImg(false);
    setProfileImg();
    setObjURLOfProfileImg('');
  }

  const closeEditProfilePopup = () => {
    setOpenEditProfilePopup(false);
    setFirstname('');
    setLastname('');
    setDateOfBirth('');
    setOtherDetail('');
  }

  const closeEditProfileImgPopupWithBg = () => {
    setOpenEditProfilePicturePopup(false);
    setShowEffectWhileUploadProfileImg(false);
    setProfileImg();
    setObjURLOfProfileImg('');
  }

  const selectProfileImgToUpload = (e) => {
    if (e.target.files.length > 0) {
      setObjURLOfProfileImg(URL.createObjectURL(e.target.files[0]));
      setProfileImg(e.target.files[0]);
      setOpenEditCoverPicturePopup(true);
    }
  }

  const selectProfileBgImgToUpload = (e) => {
    if (e.target.files.length > 0) {
      setObjURLOfProfileBackgroundImg(URL.createObjectURL(e.target.files[0]));
      setProfileBackgroundImg(e.target.files[0]);
      setOpenPreviewProfileBgImg(true);
    }
  }

  const clearFileBgImgToSelect = () => {
    setProfileBackgroundImg();
    setObjURLOfProfileBackgroundImg('');
    setOpenEditProfileBackgroundPopup(false);
    setOpenPreviewProfileBgImg(false);
  }

  const chatsPopup = () => {
    // setOpenChats(!openChats);
    setOpenMenus(false);
    setOpenNotifications(false);
    setOpenSearchResult(false);
    // const closePopup = document.getElementById('close-popup');
    // closePopup.classList.add('close-popup');
  }

  const showHiddenMenuInHeader = () => {
    const hiddenContentInHeaderPopup = document.querySelector('.hidden-content-in-header-popup');
    hiddenContentInHeaderPopup.classList.toggle('active');
  }

  const openPageSearchPeopleInHamburger = () => {
    navigate('/search-people', {
      state: {
        userInfo,
        userData,
        userDataInActive
      }
    });
  }

  const openPageNotificationsInHamburger = () => {
    navigate('/notifications', {
      state: {
        dataUserNotification,
        userInfo
      }
    });
  }

  const dropdownPopup = () => {
    setOpenMenus(!openMenus);
    setOpenNotifications(false);
    setOpenSearchResult(false);
    setOpenChats(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const closeDropdown = () => {
    setOpenMenus(false);
    setOpenNotifications(false);
    setOpenSearchResult(false);
    setOpenChats(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.remove('close-popup');
  }

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    setLogoutStatus(true);
  }

  const onProfilePageOnMobile = () => {
    setShowProfilePageStatus(!showProfilePageStatus);
    showHiddenMenuInHeader();
  }

  const uploadProfileImg = () => {
    setShowEffectWhileUploadProfileImg(true);
    const formData = new FormData();
    formData.append('profileImg', profileImg);
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProfileImg/${userData.userId}`, {
      method: 'PUT',
      body: formData
    }).then((res) => {
      if (res.status === 200) {
        setShowEffectWhileUploadProfileImg(false);
        setOpenEditProfilePicturePopup(false);
        setShowProfilePageStatus(!showProfilePageStatus);
        setProfileImg();
        setObjURLOfProfileImg('');
      }
    });
  }

  const uploadProfileBgImg = () => {
    setShowEffectWhileUploadProfileBgImg(true);
    const formData = new FormData();
    formData.append('profileBgImg', profileBackgroundImg);
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProfileBgImg/${userData.userId}`, {
      method: 'PUT',
      body: formData
    }).then((res) => {
      if (res.status === 200) {
        setShowEffectWhileUploadProfileBgImg(false);
        setOpenEditProfileBackgroundPopup(false);
        setShowProfilePageStatus(!showProfilePageStatus);
        setProfileBackgroundImg();
        setObjURLOfProfileBackgroundImg('');
      }
    });
  }

  const reloadProfilePage = () => {
    if (openProfileStatus) {
      window.location.reload();
    }
  }

  const dateOfBirthFormat = (value) => {
    const longEnUSFormatter = new Intl.DateTimeFormat('en-EN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (!!value) {
      const localeTimeZone = new Date(value);
      return longEnUSFormatter.format(localeTimeZone);
    }
  }

  const deleteCurrentProfileImgFunc = async () => {
    try {
      setEffectWhileDeleteProfileImg(true);
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/deleteCurrentProfileImg`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userDataRef?.current,
        })
      });
      if (response.status === 200) {
        setDeleteCurrentProfileImg(false);
        setOpenEditProfilePicturePopup(false);
        setEffectWhileDeleteProfileImg(false);
        setShowProfilePageStatus(!showProfilePageStatus);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const deleteCurrentProfileBgImgFunc = async () => {
    try {
      setEffectWhileDeleteProfileBgImg(true);
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/deleteCurrentProfileBgImg`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userDataRef?.current,
        })
      });
      if (response.status === 200) {
        setOpenPreviewProfileBgImg(false);
        setDeleteCurrentProfileBgImg(false);
        setOpenEditProfileBackgroundPopup(false);
        setEffectWhileDeleteProfileBgImg(false);
        setShowProfilePageStatus(!showProfilePageStatus);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    reloadProfilePage();
  }, [openProfileStatus]);

  useEffect(() => {
    if (!!profileImg) {
      setDisableButtonUploadProfileImg(false);
    } else {
      setDisableButtonUploadProfileImg(true);
    }
    if (!!profileBackgroundImg) {
      setDisableButtonUploadProfileBgImg(false);
    } else {
      setDisableButtonUploadProfileBgImg(true);
    }
  }, [profileImg, profileBackgroundImg]);

  useEffect(() => {
    setUserDataInActive(userInfo.find((e) => e?._id === id));
  }, [userInfo, userData, showProfilePageStatus]);

  useEffect(() => {
    if (openEditProfilePopup) {
      setDateOfBirth(userDataInActive.dateOfBirth);
      if (!!userDataInActive.dateOfBirth) {
        const localeTimeZone = new Date(userDataInActive.dateOfBirth);
        setValue(localeTimeZone);
      }
    }
  }, [openEditProfilePopup]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [showProfilePageStatus]);

  useEffect(() => {
    userDataRef.current = userData?.userId;
  }, [userData]);

  useEffect(() => {
    socket.current?.on('notificationServerEmit', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllNotifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        const filteredNotification = res.filter((e) => e.notificationOfReceiverId.includes(userDataRef?.current) && e.notificationOfUserId !== userDataRef?.current);
        const sortedFilteredNotification = filteredNotification.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setDataUserNotification(sortedFilteredNotification);
        setAlertStatus(true);
      });
    });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllNotifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    }).then((res) => {
      const filteredNotification = res.filter((e) => e.notificationOfReceiverId.includes(userDataRef?.current) && e.notificationOfUserId !== userDataRef?.current);
      const sortedFilteredNotification = filteredNotification.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDataUserNotification(sortedFilteredNotification);
      setAlertStatus(true);
    });
  }, [userData]);

  useEffect(() => {
    const countNotification = dataUserNotification.filter((e) => !e.read.includes(userData.userId));
    setCountAlert(countNotification.length);
  }, [dataUserNotification]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/authUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if (res.status === 401) {
        window.location.href = '/';
      } else if (res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = '/';
      } else {
        return res.json();
      }
    }).then((res) => {
      setUserData({
        userId: res.userId,
        firstname: res.firstname,
        lastname: res.lastname
      });
    });
  }, []);

  useEffect(() => {
    socket.current?.on('getAllUsers', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllUsers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        setUserInfo(res);
      });
    });
  }, [followAndUnFollow]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllUsers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    }).then((res) => {
      setUserInfo(res);
    });
  }, [followAndUnFollow, showProfilePageStatus]);

  useEffect(() => {
    socket.current?.on('notificationServerEmit', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllPosts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        setPostOfusers([...res]);
      });
    });
  }, []);

  useEffect(() => {
    socket.current?.on('postTransactionServerEmit', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllPosts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        setPostOfusers([...res]);
      });
    });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllPosts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    }).then((res) => {
      setPostOfusers([...res]);
    });
  }, []);

  useEffect(() => {
    socket.current?.on('notificationServerEmit', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllSharePostByUserIdToShare/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        setPostOfUsersToShare(res);
      });
    });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllSharePostByUserIdToShare/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    }).then((res) => {
      setPostOfUsersToShare(res);
    });
  }, [showProfilePageStatus]);

  useEffect(() => {
    const sortedPosts = [...postOfusers, ...postOfUsersToShare].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setSortAllPostAscending(sortedPosts);
  }, [postOfusers, postOfUsersToShare]);

  useEffect(() => {
    const containerPostScroll = document.querySelector('#container-post-scroll');
    if (containerPostScroll !== null) {
      containerPostScroll.addEventListener('scroll', () => {
        if (containerPostScroll.scrollTop > 399) {
          setShowIconScrollToTop(true);
        } else {
          setShowIconScrollToTop(false);
        }
      });
    }
  }, [userDataInActive]);

  useEffect(() => {
    const containerPostScroll = document.querySelector('#container-post-scroll');
    containerPostScroll.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [createPostStatus, createSharePostStatus]);

  useEffect(() => {
    if (value !== undefined) {
      setDateOfBirth(value);
    }
    if (value === null) {
      setDateOfBirth("");
    }
  }, [value]);

  useEffect(() => {
    if (userDataInActive !== undefined) {
      setFirstname(userDataInActive.firstname);
      setLastname(userDataInActive.lastname);
      setDateOfBirth(userDataInActive.dateOfBirth);
      if (!!userDataInActive.dateOfBirth) {
        const localeTimeZone = new Date(userDataInActive.dateOfBirth);
        setValue(localeTimeZone);
      }
    }
  }, [userDataInActive]);

  useEffect(() => {
    if (openEditProfilePopup) {
      if (!!firstname.trim() && !!lastname.trim()) {
        setDisableButtonUpdateProfile(false);
      } else {
        setDisableButtonUpdateProfile(true);
      }
    }
  }, [firstname, lastname, dateOfBirth, otherDetail, openEditProfilePopup]);

  useEffect(() => {
    setUserInfo((prev) => prev.map((e) => {
      if (e.firstname) {
        e.fullname = `${e.firstname} ${e.lastname}`;
      }
      return e;
    }));
  }, [userDataInActive]);

  useEffect(() => {
    setUserDataFollow(userInfo.find((e) => e._id === userData?.userId));
  }, [userInfo]);

  useEffect(() => {
    if (userDataInActive?.profileBackground !== "") {
      setDisableBtnDeleteProfileBgImg(false);
    } else {
      setDisableBtnDeleteProfileBgImg(true);
    }

    if (userDataInActive?.profilePicture !== "") {
      setDisableBtnDeleteProfileImg(false);
    } else {
      setDisableBtnDeleteProfileImg(true);
    }
  }, [userDataInActive]);

  const scrollToTop = () => {
    const containerPostScroll = document.querySelector('#container-post-scroll');
    containerPostScroll.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const updateUserInfoData = async (e) => {
    e.preventDefault();
    if (value > new Date()) {
      return toast.error("Your birth date is not valid.");
    }

    try{
      const userExistRes = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkUserExistUpdateProfile` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname,
          userId: userDataRef?.current
        })
      });
      const resMessage = await userExistRes.json();
      
      // if(resMessage.msg === "fristname and lastname is already exist."){
      //   return toast.error("Fristname and lastname is already exist.");
      // }else if(resMessage.msg === "fristname is already exist."){
      //   return toast.error("Fristname is already exist.");
      // }else if(resMessage.msg === "lastname is already exist."){
      //   return toast.error("Lastname is already exist.");
      // }
      if(resMessage.msg === "fristname is already exist."){
        return toast.error("Fristname is already exist.");
      }
    }catch(err){
      console.log(`error ${err}`);
    }

    setShowEffectWhileUpdateProfile(true);
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateOtherDetailOfUserByUserId/${userData.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        dateOfBirth: dateOfBirth,
        otherDetail: otherDetail.trim(),
      })
    }).then((res) => {
      if (res.status === 200) {
        setShowEffectWhileUpdateProfile(false);
        setOpenEditProfilePopup(false);
        setFirstname('');
        setLastname('');
        setDateOfBirth('');
        setOtherDetail('');
        setShowProfilePageStatus(!showProfilePageStatus);
      }
    });
  }

  const openProfileEditPopup = () => {
    setOpenEditProfilePopup(true);
    setFirstname(userDataInActive.firstname);
    setLastname(userDataInActive.lastname);
    setOtherDetail(userDataInActive.otherDetail);
  }

  const followUserInProfilePage = () => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/followAndUnFollow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        activeUserId: userData?.userId,
        userIdToFollow: userDataInActive?._id
      })
    }).then((res) => {
      if (res.status === 200) {
        setFollowAndUnFollow(!followAndUnFollow);
        socket.current?.emit('created');
      }
    });
  }

  return (
    <div className='container-profile'>
      <Toaster />
      <div id='close-popup' onClick={closeDropdown}></div>
      <header className='container-header'>
        <div className='content-left-header'>
          <Link to='/media' className='text-decoration-none'><h2 className='logo-header'>BYNSocial</h2></Link>
        </div>
        <div className='content-center-header'>
          <div className='container-input-header' onClick={SearchResultPopup}>
            <FontAwesomeIcon className='icon-search-input' icon={faMagnifyingGlass} />&nbsp;&nbsp;
            <input className='search-people' type='text' placeholder='Search people' onChange={(e) => setSearchResult(e.target.value)} />
            {openSearchResult &&
              <div className='search-result'>
                {showSkeletonSearchResult
                  ?
                  userInfo.filter((e) => {
                    return searchResult.trim() !== '' ? e.fullname.toLowerCase().includes(searchResult.trim().toLowerCase()) && e.firstname.toLowerCase() !== userData.firstname && e.lastname.toLowerCase() !== userData.lastname : '';
                  }).map((e) => (
                    <SkeletonSearchResult key={e?._id} />
                  ))
                  :
                  userInfo.filter((e) => {
                    return searchResult.trim() !== '' ? e.fullname.toLowerCase().includes(searchResult.trim().toLowerCase()) && e.firstname.toLowerCase() !== userData.firstname && e.lastname.toLowerCase() !== userData.lastname : '';
                  }).map((e) => (
                    <SearchResult key={e?._id} openProfileStatus={openProfileStatus} setOpenProfileStatus={setOpenProfileStatus} userId={e._id} image={e.profilePicture} firstname={e.firstname} lastname={e.lastname} />
                  ))
                }
                {searchResult.trim() === '' && <div className='no-search-result-container'><p className='no-search-result'>Users not found.</p></div>}
              </div>
            }
          </div>
        </div>
        <div className='content-right-header'>
          <div className='container-icons' id='notification-id'>
            <div className='bell-onclick' onClick={notificationPopup}>
              {countAlert !== 0
                ?
                alertStatus &&
                <div style={{ width: countAlert > 8 ? '24px' : '19px' }} className='alert-red-circle'>{countAlert > 9 ? '9+' : countAlert}</div>
                :
                <></>
              }
              <FontAwesomeIcon className='icons-in-content-right-header' icon={faBell} />
            </div>
            {openNotifications &&
              <div className='notification-popup'>
                <div className='notification-header'>
                  <p className='p-notification-header'>Notifications</p>
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div className='notification-body' style={
                  dataUserNotification.length === 1 ? { height: '100px' } : dataUserNotification.length === 2 ? { height: '200px' } : dataUserNotification.length === 3 ? { height: '300px' } : dataUserNotification.length === 4 ? { height: '400px' } : dataUserNotification.length > 4 ? { height: '400px' } : { height: 'auto' }
                }>
                  {showSkeletonNotification
                    ?
                    dataUserNotification.map((e) => (
                      <SkeletonNotification key={e?._id} />
                    ))
                    :
                    dataUserNotification.map((e) => (
                      <Notification key={e?._id} userInfo={userInfo} notificationOfUserId={e.notificationOfUserId} notificationDetail={e.notificationDetail} createdAt={e.createdAt} />
                    ))
                  }
                  {dataUserNotification.length === 0 && <p className='no-notification'>No notification at this time.</p>}
                </div>
              </div>
            }
          </div>
          <Link to='/chat' className='container-icons' onClick={chatsPopup}>
            <div className='bg-hover-msg'>
              <FontAwesomeIcon className='icons-in-content-right-header' icon={faComment} />
            </div>
          </Link>
          <div className='container-icons' id='dropdown-menus-id' onClick={dropdownPopup}>
            <div className='bg-hover-arrow-down'>
              <FontAwesomeIcon className='icons-in-content-right-header fix-icon' icon={faChevronDown} />
            </div>
            {openMenus &&
              <div className='dropdown-menus-class'>
                <Link onClick={() => setOpenProfileStatus(true)} to={`/profile/${userData.userId}`} className='menus-in-dropdown'>
                  <FontAwesomeIcon className='icons-in-dropdown' icon={faUserPen} />&nbsp;&nbsp;<span className='text-in-dropdown'>Profile</span>
                </Link>
                <div className='menus-in-dropdown' onClick={signOut}>
                  <FontAwesomeIcon className='icons-in-dropdown' icon={faArrowRightFromBracket} />&nbsp;&nbsp;<span className='text-in-dropdown'>Signout</span>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='hamberger-menu-container' style={{ display: 'none' }}>
          <div onClick={showHiddenMenuInHeader} className='hamburger-menu'>
            <div className='bar1'></div>
            <div className='bar2'></div>
            <div className='bar3'></div>
          </div>
          <div className='hidden-content-in-header-popup'>
            {userDataInActive !== undefined
              ?
              showSkeletonUserProfileInHamburger
                ?
                <SkeletonUserProfileInHambuger />
                :
                <Link to={`/profile/${userDataInActive._id}`} className='container-user-profile-in-hidden-content-in-header-popup'>
                  <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataFollow?.profilePicture ? 'profileImgDefault.jpg' : userDataFollow?.profilePicture}`} alt='profileImg' />
                  <div className='container-fullname-in-container-user-profile-in-hidden-content-in-header-popup'>
                    <p>{userData.firstname} {userData.lastname}</p>
                  </div>
                </Link>
              :
              <></>
            }
            <div style={{ width: '95%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
            <div onClick={openPageSearchPeopleInHamburger} className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icon-search' icon={faMagnifyingGlass} />Search people</p>
            </div>
            <div onClick={openPageNotificationsInHamburger} className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-content-right-header' icon={faBell} />Notifications</p>
            </div>
            <Link to='/chat' className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-content-right-header' icon={faComment} />Chats</p>
            </Link>
            <Link onClick={onProfilePageOnMobile} to={`/profile/${userData.userId}`} className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-dropdown' icon={faUserPen} />Profile</p>
            </Link>
            <div onClick={signOut} className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-dropdown' icon={faArrowRightFromBracket} />Signout</p>
            </div>
            <div style={{ width: '95%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
          </div>
        </div>
      </header >
      <div className='container-body-in-container-profile'>
        <div className='container-user-profile-in-container-body-in-container-profile'>
          <div className={userDataInActive !== undefined && userDataInActive._id === userData.userId ? 'container-header-profile-img-background-in-container-user-profile-in-container-body-in-container-profile' : 'container-header-profile-img-background-in-container-user-profile-in-container-body-in-container-profile style-in-profile-page'}>
            {showSkeletonProfileDetailHeader
              ?
              <Skeleton height={'100%'} width={'100%'} className='style-skeleton-profile-bg-img-user' />
              :
              userDataInActive !== undefined
                ?
                userDataInActive._id === userData.userId
                  ?
                  <img onClick={() => setOpenEditProfileBackgroundPopup(true)} src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileBgImg/${!userDataInActive.profileBackground ? 'bgDefault.png' : userDataInActive.profileBackground}`} alt='imgProfileBackground' />
                  :
                  <img style={{ cursor: 'default' }} src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileBgImg/${!userDataInActive.profileBackground ? 'bgDefault.png' : userDataInActive.profileBackground}`} alt='imgProfileBackground' />
                :
                <></>
            }
          </div>
          <div className={userDataInActive !== undefined && userDataInActive._id === userData.userId ? 'container-footer-in-container-user-profile-in-container-body-in-container-profile' : 'container-footer-in-container-user-profile-in-container-body-in-container-profile style-in-profile-page'}>
            {userDataInActive !== undefined &&
              userDataInActive._id === userData.userId
              ?
              <>
                <button onClick={() => setOpenEditProfileBackgroundPopup(true)} className='edit-background-picture-in-container-footer-in-container-user-profile-in-container-body-in-container-profile'><FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>&nbsp;Edit background</button>
                <button onClick={openProfileEditPopup}><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>&nbsp;Edit profile</button>
              </>
              :
              <button onClick={followUserInProfilePage}>
                {userDataFollow?.following.includes(userDataInActive?._id) ? 'Following' : 'Follow'}
                &nbsp;&nbsp;
                <FontAwesomeIcon style={{ color: '#fff' }} icon={userDataFollow?.following.includes(userDataInActive?._id) ? faUserCheck : faUserPlus} className='follower-user-icon' />
              </button>
            }
          </div>
          {openEditProfileBackgroundPopup &&
            <div className='container-edit-profile-img-bg-in-container-user-profile-in-container-body-in-container-profile'>
              <div className='bg-onclick-to-close-people-likes-post-list'></div>
              <div className='container-edit-profile-img-centent-in-container-edit-profile-img-bg-in-container-user-profile-in-container-body-in-container-profile'>
                <p>Edit background</p>
                <div onClick={clearFileBgImgToSelect} style={{ marginRight: '1rem' }} className='container-icon-xmark-in-container-header-in-people-likes-post-list'>
                  <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-people-likes-post-list' />
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div className='container-preview-profile-bg-img-in-container-edit-profile-img-centent-in-container-edit-profile-img-bg-in-container-user-profile-in-container-body-in-container-profile'>
                  {openPreviewProfileBgImg
                    ?
                    !objURLOfProfileBackgroundImg && userDataInActive?.profileBackground !== ''
                      ?
                      <img onClick={() => inputUploadProfileBgImg.current.click()} src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileBgImg/${userDataInActive?.profileBackground}`} alt='imgProfileBackground hee' />
                      :
                      <img onClick={() => inputUploadProfileBgImg.current.click()} src={objURLOfProfileBackgroundImg} alt='imgProfileBackground kuy' />
                    :
                    userDataInActive?.profileBackground !== ''
                      ?
                      <img onClick={() => inputUploadProfileBgImg.current.click()} src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileBgImg/${userDataInActive?.profileBackground}`} alt='imgProfileBackground xx' />
                      :
                      <img onClick={() => inputUploadProfileBgImg.current.click()} src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileBgImg/bgDefault.png`} alt='imgProfileBackground yy' />
                  }
                </div>
                <input name='profileBgImg' onChange={selectProfileBgImgToUpload} style={{ display: 'none' }} ref={inputUploadProfileBgImg} type='file' accept='image/png , image/jpeg , image/webp' onClick={(e) => e.target.value = null}></input>
                <div onClick={() => setDeleteCurrentProfileBgImg(true)} className='container-body-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile-delete-img'>
                  <button disabled={disableBtnDeleteProfileBgImg} className='choose-img-in-container-body-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile-delete-img'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>Delete Current Profile Background Picture</button>
                </div>
                <button onClick={() => inputUploadProfileBgImg.current.click()} className='button-choose-profile-bg-img-in-container-edit-profile-img-centent-in-container-edit-profile-img-bg-in-container-user-profile-in-container-body-in-container-profile'><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Choose picture</button>
                <button disabled={disableButtonUploadProfileBgImg} onClick={uploadProfileBgImg} className='button-save-in-container-edit-profile-img-centent-in-container-edit-profile-img-bg-in-container-user-profile-in-container-body-in-container-profile'>
                  {showEffectWhileUploadProfileBgImg
                    ?
                    <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="5%" visible={true} />
                    :
                    'Save'
                  }
                </button>
              </div>
            </div>
          }
          {deleteCurrentProfileBgImg &&
            <div className='container-delete-post-in-icon-settings-post-of-users'>
              <div className='bg-onclick-to-close-delete-post-popup-in-icon-settings-post-of-users'></div>
              <div className='container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                <div className='container-header-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                  <p style={{ color: "#353535", fontSize: "1.2rem", fontWeight: "bold", textTransform: "initial" }}>Are you sure to delete this picture?</p>
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div className='container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                  <div onClick={() => setDeleteCurrentProfileBgImg(false)} className='container-cancel-button-in-container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                    <button>Cancel</button>
                  </div>
                  <div className='container-confirm-button-in-container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                    <button onClick={deleteCurrentProfileBgImgFunc}>
                      {effectWhileDeleteProfileBgImg
                        ?
                        <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="20%" visible={true} />
                        :
                        'Confirm'
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
          {openEditProfilePopup &&
            <div className='container-user-edit-profile-bg-in-container-user-profile-in-container-body-in-container-profile'>
              <div className='bg-onclick-to-close-people-likes-post-list'></div>
              <div className='container-user-edit-profile-in-container-user-profile-in-container-body-in-container-profile'>
                <p>Edit profile</p>
                <div onClick={closeEditProfilePopup} style={{ marginRight: '1rem' }} className='container-icon-xmark-in-container-header-in-people-likes-post-list'>
                  <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-people-likes-post-list' />
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div className='container-user-info-detail-in-container-user-edit-profile-in-container-user-profile-in-container-body-in-container-profile'>
                  <form onSubmit={(e) => updateUserInfoData(e)} className='form-container-to-edit-profile-in-container-user-info-detail-in-container-user-edit-profile-in-container-user-profile-in-container-body-in-container-profile'>
                    <div className='flex-in-form-container-to-edit-profile-in-container-user-info-detail-in-container-user-edit-profile-in-container-user-profile-in-container-body-in-container-profile'>
                      <div className='flex-in-flex-in-form-container-to-edit-profile-in-container-user-info-detail-in-container-user-edit-profile-in-container-user-profile-in-container-body-in-container-profile'>
                        <label>Firstname:</label>
                        <input type='text' defaultValue={userDataInActive.firstname} onChange={(e) => setFirstname(e.target.value)} />
                      </div>
                      <div className='flex-in-flex-in-form-container-to-edit-profile-in-container-user-info-detail-in-container-user-edit-profile-in-container-user-profile-in-container-body-in-container-profile'>
                        <label>Lastname:</label>
                        <input type='text' defaultValue={userDataInActive.lastname} onChange={(e) => setLastname(e.target.value)} />
                      </div>
                    </div>
                    <div className='edit-content-in-form-container-to-edit-profile-in-container-user-info-detail-in-container-user-edit-profile-in-container-user-profile-in-container-body-in-container-profile'>
                      <label>Date of birth:</label>
                      <br />
                      <DatePicker value={value} onChange={(date) => setValue(date)} />
                    </div>
                    <div className='edit-content-in-form-container-to-edit-profile-in-container-user-info-detail-in-container-user-edit-profile-in-container-user-profile-in-container-body-in-container-profile-fix'>
                      <label>Other detail:</label>
                      <br />
                      <input type='text' defaultValue={userDataInActive.otherDetail} onChange={(e) => setOtherDetail(e.target.value)} />
                    </div>
                    <div className='container-button-save-edit-profile-img-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'>
                      <button disabled={disavleButtonUpdateProfile} type='submit'>
                        {showEffectWhileUpdateProfile
                          ?
                          <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="5%" visible={true} />
                          :
                          'Save'
                        }
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          }
          <div className={userDataInActive !== undefined ? 'container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile' : 'container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile style-in-profile-page'}>
            <div className='container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'>
              {showSkeletonProfileDetailHeader
                ?
                <Skeleton height={'100%'} width={'100%'} circle={true} baseColor={'#F2F2F2'} highlightColor={'#FFFFFF'} className='style-skeleton-profile-img-user' />
                :
                userDataInActive !== undefined
                  ?
                  userDataInActive._id === userData.userId
                    ?
                    <img onClick={() => setOpenEditProfilePicturePopup(true)} src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataInActive.profilePicture ? 'profileImgDefault.jpg' : userDataInActive.profilePicture}`} alt='imgProfile' />
                    :
                    <img style={{ cursor: 'default' }} src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataInActive.profilePicture ? 'profileImgDefault.jpg' : userDataInActive.profilePicture}`} alt='imgProfile' />
                  :
                  <></>
              }
              {showSkeletonProfileDetailHeader !== true &&
                userDataInActive !== undefined
                ?
                userDataInActive._id === userData.userId &&
                <div onClick={() => setOpenEditProfilePicturePopup(true)} className='container-edit-profile-img-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'>
                  <FontAwesomeIcon className='edit-photo-icon-in-container-edit-profile-img-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile' icon={faCamera}></FontAwesomeIcon>
                </div>
                :
                <></>
              }
              {openEditProfilePicturePopup &&
                <div className='container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'>
                  <div className='bg-onclick-to-close-people-likes-post-list'></div>
                  <div className='container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'>
                    <p>Edit profile picture</p>
                    <div onClick={closeEditProfileImgPopup} style={{ marginRight: '1rem' }} className='container-icon-xmark-in-container-header-in-people-likes-post-list'>
                      <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-people-likes-post-list' />
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                    <input name='profileImg' onChange={(e) => selectProfileImgToUpload(e)} ref={inputUploadProfileImg} onClick={(e) => e.target.value = null} type='file' accept='image/png , image/jpeg , image/webp' style={{ display: 'none' }} />
                    {openEditCoverPicturePopup
                      ?
                      !!objURLOfProfileImg
                        ?
                        <div className='container-profile-img-preview-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'>
                          <img onClick={() => inputUploadProfileImg.current.click()} src={objURLOfProfileImg} alt='profileImg' />
                        </div>
                        :
                        <div className='container-profile-img-preview-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'>
                          <img onClick={() => inputUploadProfileImg.current.click()} src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataInActive.profilePicture ? 'profileImgDefault.jpg' : userDataInActive.profilePicture}`} alt='profileImg' />
                        </div>
                      :
                      <div className='container-profile-img-preview-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'>
                        <img onClick={() => inputUploadProfileImg.current.click()} src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataInActive.profilePicture ? 'profileImgDefault.jpg' : userDataInActive.profilePicture}`} alt='profileImg' />
                      </div>
                    }
                    <div onClick={() => setDeleteCurrentProfileImg(true)} className='container-body-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile-delete-img'>
                      <button disabled={disableBtnDeleteProfileImg} className='choose-img-in-container-body-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile-delete-img'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>Delete Current Profile Picture</button>
                    </div>
                    <div className='container-body-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'>
                      <button onClick={() => inputUploadProfileImg.current.click()} className='choose-img-in-container-body-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Choose Photo</button>
                    </div>
                    <div className='container-button-save-edit-profile-img-in-container-edit-profile-img-box-in-container-edit-profile-img-popup-in-container-user-profile-img-in-container-user-detail-profile-in-container-user-profile-in-container-body-in-container-profile'>
                      <button onClick={uploadProfileImg} disabled={disableButtonUploadProfileImg}>
                        {showEffectWhileUploadProfileImg
                          ?
                          <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="5%" visible={true} />
                          :
                          'Save'
                        }
                      </button>
                    </div>
                  </div>
                </div>
              }
              {deleteCurrentProfileImg &&
                <div className='container-delete-post-in-icon-settings-post-of-users'>
                  <div className='bg-onclick-to-close-delete-post-popup-in-icon-settings-post-of-users'></div>
                  <div className='container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                    <div className='container-header-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                      <p style={{ color: "#353535", fontSize: "1.2rem", fontWeight: "bold", textTransform: "initial" }}>Are you sure to delete this picture?</p>
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                    <div className='container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                      <div onClick={() => setDeleteCurrentProfileImg(false)} className='container-cancel-button-in-container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                        <button>Cancel</button>
                      </div>
                      <div className='container-confirm-button-in-container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                        <button onClick={deleteCurrentProfileImgFunc}>
                          {effectWhileDeleteProfileImg
                            ?
                            <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="20%" visible={true} />
                            :
                            'Confirm'
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
            {showSkeletonProfileDetailHeader
              ?
              <Skeleton height={20} width={250} baseColor={'#F2F2F2'} highlightColor={'#FFFFFF'} className='style-skeleton-profile-fullname-user-in-profile-page' />
              :
              userDataInActive !== undefined &&
              <p>{userDataInActive.firstname} {userDataInActive.lastname}</p>
            }
          </div>
        </div>
        <div className='container-content-of-user-in-profile-page-in-container-body-in-container-profile'>
          {userDataInActive !== undefined &&
            <div className='container-content-left-of-user-in-container-content-of-user-in-profile-page-in-container-body-in-container-profile'>
              {showSkeletonProfileDetailBody
                ?
                <>
                  <Skeleton height={15} width={80} className='style-skeleton-profile-detail-user-in-profile-page' />
                  <Skeleton height={15} width={140} className='style-skeleton-profile-detail-user-in-profile-page' />
                  <Skeleton height={15} width={100} className='style-skeleton-profile-detail-user-in-profile-page' />
                  <Skeleton height={15} width={100} className='style-skeleton-profile-detail-user-in-profile-page' />
                  <Skeleton height={15} width={120} className='style-skeleton-profile-detail-user-in-profile-page' />
                </>
                :
                <>
                  <b>Info</b>
                  <p>Date of birth: <span>{!userDataInActive.dateOfBirth ? 'empty' : dateOfBirthFormat(userDataInActive.dateOfBirth)}</span></p>
                  <p onClick={() => setOpenFollowerPopup(true)} style={{ cursor: 'pointer' }}>Follower: <span>{userDataInActive.follower !== undefined ? userDataInActive.follower.length : ''}</span></p>
                  <p onClick={() => setOpenFollowingPopup(true)} style={{ cursor: 'pointer' }}>Following: <span>{userDataInActive.following !== undefined ? userDataInActive.following.length : ''}</span></p>
                  <p>Other: <span>{!userDataInActive.otherDetail ? 'empty' : userDataInActive.otherDetail}</span></p>
                </>
              }
            </div>
          }
          {openFollowerPopup &&
            <div className='container-bg-follower-in-container-content-of-user-in-profile-page-in-container-body-in-container-profile'>
              <div onClick={() => setOpenFollowerPopup(false)} className='bg-onclick-to-close-people-likes-post-list'></div>
              <div className='container-follower-list-in-container-bg-follower-in-container-content-of-user-in-profile-page-in-container-body-in-container-profile'>
                <p>Follower</p>
                <div onClick={() => setOpenFollowerPopup(false)} style={{ marginRight: '1rem' }} className='container-icon-xmark-in-container-header-in-people-likes-post-list'>
                  <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-people-likes-post-list' />
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div className='container-overflow-y-auto-in-container-follower-list-in-container-bg-follower-in-container-content-of-user-in-profile-page-in-container-body-in-container-profile'>
                  {userDataInActive !== undefined &&
                    userDataInActive.follower.length === 0
                    ?
                    <div className='container-no-one-like-in-container-profile-card-in-people-likes-post-list'>
                      <p style={{ fontSize: '1rem', fontWeight: 'normal' }}>No one follow</p>
                    </div>
                    :
                    userDataInActive.follower.map((e) => (
                      <Follower key={e} setOpenFollowerPopup={setOpenFollowerPopup} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} userIdToFollower={e} userInfo={userInfo} userData={userData.userId} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} />
                    ))
                  }
                </div>
              </div>
            </div>
          }
          {openFollowingPopup &&
            <div className='container-bg-follower-in-container-content-of-user-in-profile-page-in-container-body-in-container-profile'>
              <div onClick={() => setOpenFollowingPopup(false)} className='bg-onclick-to-close-people-likes-post-list'></div>
              <div className='container-follower-list-in-container-bg-follower-in-container-content-of-user-in-profile-page-in-container-body-in-container-profile'>
                <p>Following</p>
                <div onClick={() => setOpenFollowingPopup(false)} style={{ marginRight: '1rem' }} className='container-icon-xmark-in-container-header-in-people-likes-post-list'>
                  <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-people-likes-post-list' />
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div className='container-overflow-y-auto-in-container-follower-list-in-container-bg-follower-in-container-content-of-user-in-profile-page-in-container-body-in-container-profile'>
                  {userDataInActive !== undefined &&
                    userDataInActive.following.length === 0
                    ?
                    <div className='container-no-one-like-in-container-profile-card-in-people-likes-post-list'>
                      <p style={{ fontSize: '1rem', fontWeight: 'normal' }}>No one following</p>
                    </div>
                    :
                    userDataInActive.following.map((e) => (
                      <Following key={e} setOpenFollowingPopup={setOpenFollowingPopup} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} userIdToFollower={e} userInfo={userInfo} userData={userData.userId} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} />
                    ))
                  }
                </div>
              </div>
            </div>
          }
          <div className='container-show-post-of-user-in-container-content-of-user-in-profile-page-in-container-body-in-container-profile'>
            {showSkeletonCreatePost
              ?
              userDataInActive !== undefined &&
              userDataInActive._id === userData.userId &&
              <SkeletonCreatePost />
              :
              userDataInActive !== undefined &&
              userDataInActive._id === userData.userId &&
              <CreatePost userData={userData} activeUserId={userData.userId} userInfo={userInfo} createPostStatus={createPostStatus} setCreatePostStatus={setCreatePostStatus} />
            }
            {userDataInActive !== undefined &&
              <div ref={containerPostScrollRef} style={{ marginTop: userDataInActive._id !== userData.userId && '0' }} id='container-post-scroll' className='overflow-y-auto-in-post-content-of-users fix'>
                {showIconScrollToTop &&
                  <div onClick={scrollToTop} style={{ left: '61%' }} className='container-button-scroll-to-top-in-overflow-y-auto-in-post-content-of-users style-in-profile-page-mobile'>
                    <FontAwesomeIcon icon={faArrowUp} className='arrow-up-icon-in-container-button-scroll-to-top-in-overflow-y-auto-in-post-content-of-users' />
                  </div>
                }
                {sortAllPostAscening.filter((e) => e.userIdToPost === userDataInActive._id || e.userIdToShare === userDataInActive._id).length !== 0
                  ?
                  showSkeletionPost
                    ?
                    sortAllPostAscening.map((e) => (
                      <SkeletonPost key={e?._id} />
                    ))
                    :
                    sortAllPostAscening.map((e) => {
                      if (e.userIdToPost && e.userIdToPost === userDataInActive._id) {
                        return <Post key={e?._id} setOpenProfileStatus={setOpenProfileStatus} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} setCreateSharePostStatus={setCreateSharePostStatus} createSharePostStatus={createSharePostStatus} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} userDataInActive={userData?.userId} likedPost={likedPost} setLikedPost={setLikedPost} editPostStatus={editPostStatus} setEditPostStatus={setEditPostStatus} deletePostStatus={deletePostStatus} setDeletePostStatus={setDeletePostStatus} userInfo={userInfo} activeUserId={userData.userId} postId={e._id} userIdToPost={e.userIdToPost} postMsg={e.postMsg} postImgs={e.postImgs} postVideo={e.postVideo} createdAt={e.createdAt} postLikes={e.postLikes} />;
                      }
                      if (e.postIdToShare && e.userIdToShare === userDataInActive._id) {
                        return <SharePost key={e?._id} setOpenProfileStatus={setOpenProfileStatus} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} setCreateSharePostStatus={setCreateSharePostStatus} createSharePostStatus={createSharePostStatus} userDataInActive={userData?.userId} setFollowAndUnFollow={setFollowAndUnFollow} followAndUnFollow={followAndUnFollow} setLikedSharePost={setLikedSharePost} likedSharePost={likedSharePost} setDeleteSharePostStatus={setDeleteSharePostStatus} deleteSharePostStatus={deleteSharePostStatus} setEditSharePostStatus={setEditSharePostStatus} editSharePostStatus={editSharePostStatus} shareId={e._id} userIdToShare={e.userIdToShare} postIdToShare={e.postIdToShare} shareMsg={e.shareMsg} sharePostLikes={e.sharePostLikes} createdAt={e.createdAt} userInfo={userInfo} activeUserId={userData.userId} postOfusers={postOfusers} />;
                      }
                    })
                  :
                  <div className='style-update-in-mobile-fix-bell' style={{ color: '#353535', fontSize: '1.1rem', fontWeight: '500', margin: '1rem 0' }}>Post is empty</div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
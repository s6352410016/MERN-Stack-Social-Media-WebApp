import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCirclePlay, faFaceGrinBeam, faCircleXmark, faFileCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { RotatingLines } from 'react-loader-spinner';
import { SocketIOContext } from './SocketContext';

const CreatePost = ({ userData, activeUserId, userInfo, createPostStatus, setCreatePostStatus }) => {
  const { socket } = useContext(SocketIOContext);

  const imageIconRef = useRef();
  const videoIconRef = useRef();
  const inputRef = useRef();

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [postMsg, setPostMsg] = useState('');
  const [cursorPosition, setCursorPosition] = useState();
  const [filesImg, setFilesImg] = useState([]);
  const [openPreviewImg, setOpenPreviewImg] = useState(false);
  const [openVideoFilePreview, setOpenVideoFilePreview] = useState(false);
  const [videoFile, setVideoFile] = useState();
  const [fileImgsToSelect, setFileImgsToSelect] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [effectWhileCreatePost, setEffectWhileCreatePost] = useState(false);
  const [dataOfUserByActiveUserId, setDataOfUserByActiveUserId] = useState({});

  const emojiClick = ({ emoji }) => {
    inputRef.current.focus();
    const start = postMsg.substring(0, inputRef.current.selectionStart);
    const end = postMsg.substring(inputRef.current.selectionStart);
    const msg = start + emoji + end;
    setPostMsg(msg);
    setCursorPosition(start.length + emoji.length);
  }

  const imagePreview = (e) => {
    const files = e.target.files;
    const arrFiles = Array.from(files);
    const createUrlFromFiles = arrFiles.map((files) => URL.createObjectURL(files));
    setFilesImg(createUrlFromFiles);
    setFileImgsToSelect(arrFiles.map((e) => e));
    if (files.length > 0) {
      setOpenPreviewImg(true);
      setOpenVideoFilePreview(false);
      setVideoFile();
    }
  }

  const clearImageFiles = (index) => {
    const newFilesImg = filesImg.filter((file, i) => i !== index);
    const copyFileImg = [...fileImgsToSelect];
    copyFileImg.splice(index, 1);
    setFilesImg(newFilesImg);
    setFileImgsToSelect(copyFileImg);
  }

  const videoFileUpload = (e) => {
    const file = e.target.files;
    if (file.length > 0) {
      setVideoFile(e.target.files[0]);
      setOpenVideoFilePreview(true);
      setOpenPreviewImg(false);
      setFilesImg([]);
      setFileImgsToSelect([]);
    }
  }

  const clearVideoFile = () => {
    setOpenVideoFilePreview(false);
    setVideoFile();
    inputRef?.current.focus();
  }

  const postMsgFunc = (e) => {
    setPostMsg(e.target.value);
  }

  const createPost = (e) => {
    e.preventDefault();
    setEffectWhileCreatePost(true);

    if (fileImgsToSelect.length !== 0) {
      const formData = new FormData();
      formData.append('userIdToPost', activeUserId)
      formData.append('postMsg', postMsg);
      fileImgsToSelect.map((file) => {
        formData.append('postImage', file);
      });
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createPostWithImages`, {
        method: 'POST',
        body: formData
      }).then((res) => {
        if (res.status === 201) {
          return res.json();
        }
      }).then(async (res) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            notificationOfUserId: activeUserId,
            notificationOfPostId: res.postId,
            notificationDetail: 'Create a new post',
            notificationOfReceiverId: userInfo.map((e) => e._id)
          })
        });
        if (response.status === 201) {
          socket.current?.emit('created');
        }
        setOpenPreviewImg(false);
        setOpenEmojiPicker(false);
        setPostMsg('');
        setFilesImg([]);
        setFileImgsToSelect([]);
        // setCreatePostStatus(!createPostStatus);
        setEffectWhileCreatePost(false);
      });
      return;
    }
    if (!!videoFile) {
      const formData = new FormData();
      formData.append('userIdToPost', activeUserId);
      formData.append('postMsg', postMsg);
      formData.append('postVideo', videoFile);
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createPostWithVideo`, {
        method: 'POST',
        body: formData
      }).then((res) => {
        if (res.status === 201) {
          return res.json();
        }
      }).then(async (res) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            notificationOfUserId: activeUserId,
            notificationOfPostId: res.postId,
            notificationDetail: 'Create a new post',
            notificationOfReceiverId: userInfo.map((e) => e._id)
          })
        });
        if (response.status === 201) {
          socket.current?.emit('created');
        }
        // setCreatePostStatus(!createPostStatus);
        setEffectWhileCreatePost(false);
        setOpenVideoFilePreview(false);
        setOpenEmojiPicker(false);
        setPostMsg('');
        setVideoFile();
      });
      return;
    }
    if (!!postMsg && fileImgsToSelect.length === 0 && !videoFile) {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createPostWithMsg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userIdToPost: activeUserId,
          postMsg: postMsg
        })
      }).then((res) => {
        if (res.status === 201) {
          return res.json();
        }
      }).then(async (res) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            notificationOfUserId: activeUserId,
            notificationOfPostId: res.postId,
            notificationDetail: 'Create a new post',
            notificationOfReceiverId: userInfo.map((e) => e._id)
          })
        });
        if (response.status === 201) {
          socket.current?.emit('created');
        }
        // setCreatePostStatus(!createPostStatus);
        setEffectWhileCreatePost(false);
        setPostMsg('');
        setOpenEmojiPicker(false);
      });
      return;
    }
  }

  useEffect(() => {
    if (postMsg.trim() !== "" || fileImgsToSelect.length !== 0 || !!videoFile) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [postMsg, fileImgsToSelect, videoFile]);

  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  useEffect(() => {
    setDataOfUserByActiveUserId(userInfo.find((e) => e._id === activeUserId));
  }, [userData, userInfo]);

  return (
    <div className='container-content-center-in-body'>
      <form onSubmit={(e) => createPost(e)} encType='multipart/form-data' className='create-post-container'>
        <div className='container-post-content'>
          <Link to={`/profile/${dataOfUserByActiveUserId !== undefined && dataOfUserByActiveUserId._id}`} className='link-to-profile-post'>
            <div className='box-of-user-profile-img'>
              <div className='container-user-profile-img'>
                {dataOfUserByActiveUserId !== undefined &&
                  <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!dataOfUserByActiveUserId.profilePicture ? 'profileImgDefault.jpg' : dataOfUserByActiveUserId.profilePicture}`} alt='imgProfile' />
                }
              </div>
            </div>
          </Link>
          <div className='container-input-post'>
            <input id='auto-focus' type='text' placeholder="what's happening" value={postMsg} ref={inputRef} onChange={(e) => postMsgFunc(e)} />
          </div>
        </div>
        <div className='container-icons-post'>
          <div className='form-fix-style-in-container-icons-post'>
            <div className='image-upload-icon' onClick={() => { imageIconRef.current.click(); inputRef?.current.focus(); }}>
              <FontAwesomeIcon icon={faImage} className='style-icon-post' id='color-icon-image' />
              <input name='postImage' type='file' multiple accept='image/png , image/jpeg , image/webp' className='display-none-input-file' ref={imageIconRef} onChange={(e) => imagePreview(e)} onClick={(e) => e.target.value = null} />
              <p>Photo</p>
            </div>
            <div className='video-upload-icon' onClick={() => { videoIconRef.current.click(); inputRef?.current.focus(); }}>
              <FontAwesomeIcon icon={faCirclePlay} className='style-icon-post' id='color-icon-video' />
              <input name='postVideo' type='file' accept='video/mp4' className='display-none-input-file' ref={videoIconRef} onChange={(e) => videoFileUpload(e)} onClick={(e) => e.target.value = null} />
              <p>Video</p>
            </div>
            <div className='emoji-text-container'>
              <div className='emoji-onclick' onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                <FontAwesomeIcon icon={faFaceGrinBeam} className='style-icon-post' id='color-icon-emoji' />
                <p>Emoji</p>
              </div>
            </div>
            <div className='post-button-container'>
              <button type='submit' disabled={disabled}>
                {effectWhileCreatePost
                  ?
                  <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="15%" visible={true} />
                  :
                  'Post'
                }
              </button>
            </div>
          </div>
        </div>
        {filesImg.length !== 0 &&
          <div className='container-of-preview-img'>
            <div className='container-img-in-preview'>
              {filesImg.map((files, index) => (
                <div key={index} className='preview-img-post-fix'>
                  <FontAwesomeIcon icon={faCircleXmark} className='style-xmark' onClick={() => { clearImageFiles(index); inputRef?.current.focus(); }} />
                  <img src={files} alt='previewImg' />
                </div>
              ))}
            </div>
          </div>
        }
        {openVideoFilePreview &&
          <div className='container-of-video-file-preview'>
            <div className='container-of-icon-video'>
              <FontAwesomeIcon icon={faFileCircleCheck} className='video-icon-in-caontainer-of-video-file-preview' />
            </div>
            <div className='container-of-file-name'>
              <span>{videoFile.name}</span>
            </div>
            <div className='container-of-icon-xmark'>
              <FontAwesomeIcon icon={faXmark} className='xmark-icon-in-caontainer-of-video-file-preview' onClick={clearVideoFile} />
            </div>
          </div>
        }
        {openEmojiPicker &&
          <div className='container-of-emoji-select'>
            <div className='container-emoji'>
              <EmojiPicker onEmojiClick={emojiClick} />
            </div>
          </div>
        }
      </form>
    </div>
  );
}

export default CreatePost;
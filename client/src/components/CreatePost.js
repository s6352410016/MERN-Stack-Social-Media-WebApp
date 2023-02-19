import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCirclePlay, faFaceGrinBeam, faCircleXmark, faFileVideo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const CreatePost = () => {
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
    if (files.length > 0) {
      setOpenPreviewImg(true);
      setOpenVideoFilePreview(false);
      setVideoFile();
    }
  }

  const clearImageFiles = () => {
    setOpenPreviewImg(false);
    setFilesImg([]);
  }

  const videoFileUpload = (e) => {
    const file = e.target.files;
    if (file.length > 0) {
      setVideoFile(e.target.files[0]);
      setOpenVideoFilePreview(true);
      setOpenPreviewImg(false);
      setFilesImg([]);
    }
  }

  const clearVideoFile = () => {
    setOpenVideoFilePreview(false);
    setVideoFile();
  }

  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  return (
    <div className='container-content-center-in-body'>
      <div className='create-post-container'>
        <div className='container-post-content'>
          <Link to='/profile' className='link-to-profile-post'>
            <div className='box-of-user-profile-img'>
              <div className='container-user-profile-img'>
                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/user1.png`} alt='imgProfile' />
              </div>
            </div>
          </Link>
          <div className='container-input-post'>
            <input id='auto-focus' type='text' placeholder="what's happening" value={postMsg} ref={inputRef} onChange={(e) => setPostMsg(e.target.value)} />
          </div>
        </div>
        <div className='container-icons-post'>
          <form encType='multipart/form-data' className='form-fix-style-in-container-icons-post'>
            <div className='image-upload-icon' onClick={() => imageIconRef.current.click()}>
              <FontAwesomeIcon icon={faImage} className='style-icon-post' id='color-icon-image' />
              <input type='file' multiple accept='image/png , image/jpeg , image/webp' className='display-none-input-file' ref={imageIconRef} onChange={(e) => imagePreview(e)} onClick={(e) => e.target.value = null} />
              <p>Photo</p>
            </div>
            <div className='video-upload-icon' onClick={() => videoIconRef.current.click()}>
              <FontAwesomeIcon icon={faCirclePlay} className='style-icon-post' id='color-icon-video' />
              <input type='file' accept='video/mp4' className='display-none-input-file' ref={videoIconRef} onChange={(e) => videoFileUpload(e)} onClick={(e) => e.target.value = null} />
              <p>Video</p>
            </div>
            <div className='emoji-text-container'>
              <div className='emoji-onclick' onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                <FontAwesomeIcon icon={faFaceGrinBeam} className='style-icon-post' id='color-icon-emoji' />
                <p>Emoji</p>
              </div>
            </div>
            <div className='post-button-container'>
              <button>Post</button>
            </div>
          </form>
        </div>
        {openPreviewImg &&
          <div className='container-of-preview-img'>
            <FontAwesomeIcon icon={faCircleXmark} className='style-xmark' onClick={clearImageFiles} />
            <div className='container-img-in-preview'>
              {filesImg.map((files, index) => (
                <img src={files} key={index} alt='previewImg' />
              ))}
            </div>
          </div>
        }
        {openVideoFilePreview &&
          <div className='container-of-video-file-preview'>
            <div className='container-of-icon-video'>
              <FontAwesomeIcon icon={faFileVideo} className='video-icon-in-caontainer-of-video-file-preview' />
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
      </div>
    </div>
  );
}

export default CreatePost;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCirclePlay, faFaceGrinBeam , faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const CreatePost = () => {
  const imageIconRef = useRef();
  const videoIconRef = useRef();
  const inputRef = useRef();

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [postMsg, setPostMsg] = useState('');
  const [cursorPosition, setCursorPosition] = useState();
  const [previewImg, setPreviewImg] = useState([]);
  const [openPreviewImg, setOpenPreviewImg] = useState(false);

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
    setPreviewImg(createUrlFromFiles);
    setOpenPreviewImg(true);
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
                <img src={require('../images/allUserProfileImg/user1.png')} alt='imgProfile' />
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
              <input type='file' multiple accept='image/png , image/jpeg , image/webp' className='display-none-input-file' ref={imageIconRef} onChange={(e) => imagePreview(e)} />
              <p>Photo</p>
            </div>
            <div className='video-upload-icon' onClick={() => videoIconRef.current.click()}>
              <FontAwesomeIcon icon={faCirclePlay} className='style-icon-post' id='color-icon-video' />
              <input type='file' className='display-none-input-file' ref={videoIconRef} />
              <p>Video</p>
            </div>
            <div className='emoji-text-container'>
              {openEmojiPicker &&
                <>
                  <div className='background-emoji-text-container' onClick={() => setOpenEmojiPicker(false)}></div>
                  <EmojiPicker onEmojiClick={emojiClick} />
                </>
              }
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
          <FontAwesomeIcon icon={faCircleXmark} className='style-xmark' onClick={() => setOpenPreviewImg(false)}/>
          <div className='container-img-in-preview'>
            {previewImg.map((files, index) => (
              <img src={files} key={index} alt='previewImg' />
            ))}
          </div>
        </div>
      }
      </div>
    </div>
  );
}

export default CreatePost;
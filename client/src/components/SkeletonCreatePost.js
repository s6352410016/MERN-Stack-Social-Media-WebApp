import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCirclePlay, faFaceGrinBeam } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCreatePost = () => {
  return (
    <div className='container-content-center-in-body'>
      <div className='create-post-container'>
        <div className='container-post-content'>
          <Link className='link-to-profile-post cursor-default'>
            <div className='box-of-user-profile-img'>
              <div className='container-user-profile-img' id='fix-height-skeletion-load'>
                <Skeleton circle={true} height={50} width={50} className='style-skeleton-img' />
              </div>
            </div>
          </Link>
          <div className='container-input-post'>
            <input type='text' placeholder="what's happening" />
          </div>
        </div>
        <div className='container-icons-post'>
          <form className='form-fix-style-in-container-icons-post'>
            <div className='image-upload-icon'>
              <FontAwesomeIcon icon={faImage} className='style-icon-post' id='color-icon-image' />
              <input type='file' id='image' className='display-none-input-file' />
              <p>Photo</p>
            </div>
            <div className='video-upload-icon'>
              <FontAwesomeIcon icon={faCirclePlay} className='style-icon-post' id='color-icon-video' />
              <input type='file' id='video' className='display-none-input-file' />
              <p>Video</p>
            </div>
            <div className='emoji-text-container'>
              <FontAwesomeIcon icon={faFaceGrinBeam} className='style-icon-post' id='color-icon-emoji' />
              <p>Emoji</p>
            </div>
            <div className='post-button-container'>
              <button>Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCreatePost;
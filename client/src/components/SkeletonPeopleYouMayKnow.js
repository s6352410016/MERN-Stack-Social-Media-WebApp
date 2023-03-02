import React from 'react';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPeopleYouMayKnow = () => {
  return (
    <div className='container-people-you-may-know' id='no-bg-in-skeleton-load'>
        <Link className='text-decoration-none-in-container-people-you-may-know cursor-default' id='fix-container-img'>
            <div className='container-image-people-you-may-know'>
                <div className='img-container-people-you-may-know'>
                    <Skeleton circle={true} height={50} width={50}/>
                </div>          
            </div>
        </Link>
        <Link className='text-decoration-none-in-container-people-you-may-know cursor-default' id='fix-container-fullname'>
            <div className='container-fullname-people-you-may-know'>
                <b><Skeleton height={15} width={150}/></b>
            </div>
        </Link>
        <div className='container-button-follow-people-you-may-know cursor-default'>
            <Skeleton circle={true} height={45} width={45}/>
        </div>
    </div>
  );
}

export default SkeletonPeopleYouMayKnow;
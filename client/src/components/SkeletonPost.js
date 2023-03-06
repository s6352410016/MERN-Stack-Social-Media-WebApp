import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPost = () => {
    return (
        <div className='container-post-of-users padding-bottom-none'>
            <div className='content-header-in-post-of-users'>
                <Link className='link-container-of-img cursor-none'>
                    <div className='container-of-img-profile-users cursor-none'>
                        <Skeleton circle={true} height={50} width={50} className='style-skeleton-img' />
                    </div>
                </Link>
                <div className='content-center-in-header-in-post-of-users'>
                    <Skeleton height={15} width={200} className='style-skeleton-fullname' />
                    <Skeleton height={15} width={80} className='style-skeleton-modifydate' />
                </div>
            </div>
            <div className='message-in-post-container'>
                <Skeleton height={15} width={250} className='style-skeleton-post-msg'/>
            </div>
            <div className='content-center-in-post-of-users cursor-none' style={{ marginTop: '10px' }}>
                <div className='container-img-post-of-users'>
                    <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination]} className="mySwiper">
                        <SwiperSlide><Skeleton height={'100%'} width={'100%'} /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div style={{ marginTop: '1rem' }} />
            <Skeleton height={15} width={450} className='style-skeleton-content-post'/>
            <div style={{ marginTop: '5px' }} />
            <Skeleton height={15} width={250} className='style-skeleton-sub-content-post'/>
        </div >
    );
}

export default SkeletonPost;
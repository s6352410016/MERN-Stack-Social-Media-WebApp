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
                        <div className='container-width-full-img'>
                            <Skeleton circle={true} height={50} width={50} />
                        </div>
                    </div>
                </Link>
                <div className='content-center-in-header-in-post-of-users'>
                    <Link className='link-in-container-of-fullname-user cursor-none'><Skeleton height={15} width={200} /></Link>
                    <p className='modify-date-post-of-users'><Skeleton height={15} width={80} /></p>
                </div>
            </div>
            <div className='message-in-post-container'>
                <Skeleton height={15} width={250} />
            </div>
            <div className='content-center-in-post-of-users cursor-none' style={{marginTop: '10px'}}>
                <div className='container-img-post-of-users'>
                    <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination]} className="mySwiper">
                        <SwiperSlide><Skeleton height={'100%'} width={'100%'} /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div style={{marginTop: '1rem'}}/>
            <Skeleton height={15} width={450}/>
            <div style={{marginTop: '5px'}}/>
            <Skeleton height={15} width={250}/>
        </div >
    );
}

export default SkeletonPost;
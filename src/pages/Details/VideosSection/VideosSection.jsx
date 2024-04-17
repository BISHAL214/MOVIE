import React, { useState, useRef } from "react";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'

import './VideosSection.scss'

import { PlayButton, ContentWrapper, VideoPopup, Img } from '../../../components/index'

const VideosSection = ({ data, loading }) => {

    const videoContainer = useRef();

    const navigation = (direction) => {
        const container = videoContainer.current;

        const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>

                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation('left')}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation('right')}
                />

                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos" ref={videoContainer}>
                        {data?.results?.map((videos) => (
                            <div onClick={() => {
                                setVideoId(videos?.key)
                                setShow(true)
                            }}
                                key={videos?.id}
                                className="videoItem">
                                <div className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${videos.key}/mqdefault.jpg`} />
                                    <PlayButton />
                                </div>
                                <div className="videoTitle">
                                    {videos?.name}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'

import './Cast.scss';

import { ContentWrapper, Img } from '../../../components/index'
import avatar from '../../../assets/avatar.png'

const Cast = ({ data, loading }) => {

    const castContainer = useRef();
    const { url } = useSelector((state) => state.home);

    const navigation = (direction) => {
        const container = castContainer.current;

        const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>

                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation('left')}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation('right')}
                />

                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems" ref={castContainer}>
                        {data?.map((casts) => {
                            let imgUrl = casts?.profile_path ? url.profile + casts.profile_path : avatar;
                            return (
                                <div key={casts?.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">
                                        {casts?.name}
                                    </div>
                                    <div className="character">
                                        {casts?.character}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;

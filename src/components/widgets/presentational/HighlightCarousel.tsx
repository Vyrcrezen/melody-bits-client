import _ from "lodash";
import React, { useContext } from "react";
import { sitemap } from "../../../sitemap";
import { defaultLangData, LangDataContext } from "../../../context/langContext";
import { CarouselSlideDefault } from "../../shared/presentational/CarouselSlideDefault";

export function HighlightCarousel() {
    const imageLocation = sitemap.mediaContent.carouselImages;

    const { index: { carousel: langCarousel } } = _.merge({}, defaultLangData, useContext(LangDataContext));

    return (
        <div id="carouselExampleCaptions" className="carousel slide carousel-dark d-flex justify-content-center border border-solid container p-0 vy-primary-bg" data-bs-ride="carousel" style={{ height: '30vh' }}>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
            </div>
            <div className="carousel-inner h-100">
                <CarouselSlideDefault imageSrc={`${imageLocation}/10.jpg`} title={langCarousel.langSlide.title} description={langCarousel.langSlide.description} isActive={true} />
                <CarouselSlideDefault imageSrc={`${imageLocation}/11.jpg`} title={langCarousel.mobileSlide.title} description={langCarousel.mobileSlide.description} />
                <CarouselSlideDefault imageSrc={`${imageLocation}/12.jpg`} title={langCarousel.uploadeSlide.title} description={langCarousel.uploadeSlide.description} />
                <CarouselSlideDefault imageSrc={`${imageLocation}/13.jpg`} title={langCarousel.favoriteSlide.title} description={langCarousel.favoriteSlide.description} />
                <CarouselSlideDefault imageSrc={`${imageLocation}/14.jpg`} title={langCarousel.characterSlide.title} description={langCarousel.characterSlide.description} />
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">{langCarousel.previous}</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">{langCarousel.next}</span>
            </button>
        </div>
    );
}

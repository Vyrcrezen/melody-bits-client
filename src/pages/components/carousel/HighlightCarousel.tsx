import React from "react";
import { sitemap } from "../../../sitemap";

export function HighlightCarousel() {
    const imageLocation = sitemap.mediaContent.carouselImages;

    return (
        <div id="carouselExampleCaptions" className="carousel slide carousel-dark d-flex justify-content-center border border-solid container p-0 vy-primary-bg" data-bs-ride="carousel" style={{ height: '30vh' }}>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner h-100">
                <div className="carousel-item active h-100">
                    <img src={`${imageLocation}/1.jpg`} className="d-block h-100 m-auto" alt="..." />
                    <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                        <h5>Awesome selection</h5>
                        <p>Music from multiple genres!</p>
                    </div>
                </div>
                <div className="carousel-item h-100">
                    <img src={`${imageLocation}/2.jpg`} className="d-block h-100 m-auto" alt="..." />
                    <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                        <h5>Favorites</h5>
                        <p>Keep track of your favorite music!</p>
                    </div>
                </div>
                <div className="carousel-item h-100">
                    <img src={`${imageLocation}/1.jpg`} className="d-block h-100 m-auto" alt="..." />
                    <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                        <h5>Awesome selection!</h5>
                        <p>There are music from multiple genres!</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

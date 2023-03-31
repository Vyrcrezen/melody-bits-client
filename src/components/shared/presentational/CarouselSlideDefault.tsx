import React from "react";

export function CarouselSlideDefault({ imageSrc, title, description, isActive=false }: { imageSrc: string, title: string, description: string, isActive?: boolean}) {
    return (
        <div className={`carousel-item h-100 ${isActive ? 'active' : ''}`}>
            <img src={`${imageSrc}`} className='d-block h-100 m-auto'  alt="..." />
            <div className="carousel-caption rounded d-none d-md-block" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <h5>{title}</h5>
                <p>{description}</p>
            </div>
        </div>
    );
}

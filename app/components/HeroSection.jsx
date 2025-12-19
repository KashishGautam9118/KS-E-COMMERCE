'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="container mb-5">
      <div className="rounded-4 shadow-lg overflow-hidden">
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Link href="#featured-products">
                <Image
                  src="/banner1.jpg"   // put your first banner in /public
                  alt="Banner 1"
                  className="d-block w-100"
                  width={1600}
                  height={500}
                  style={{ objectFit: 'cover', height: '300px', cursor: 'pointer' }}
                />
              </Link>
            </div>
            <div className="carousel-item">
              <Image
                src="/banner2.jpg"   // second banner
                alt="Banner 2"
                className="d-block w-100"
                width={1600}
                height={500}
                style={{ objectFit: 'cover', height: '300px' }}
              />
            </div>
            <div className="carousel-item">
              <Image
                src="/banner3.jpg"   // third banner
                alt="Banner 3"
                className="d-block w-100"
                width={1600}
                height={500}
                style={{ objectFit: 'cover', height: '300px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

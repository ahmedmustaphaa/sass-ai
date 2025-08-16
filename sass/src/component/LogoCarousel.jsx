import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const logos = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Framer_logo.png", alt: "Framer", width: 80 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", alt: "Netflix", width: 100 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google", width: 100 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg", alt: "LinkedIn", width: 110 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", alt: "Instagram", width: 40 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png", alt: "Facebook", width: 110 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png", alt: "Slack", width: 40 },
];

function LogoSlider() {
  const settings = {
    infinite: true,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="py-6 opacity-70">
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ width: logo.width }}
              className="object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default LogoSlider;

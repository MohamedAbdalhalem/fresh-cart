import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import img4 from "../../assets/images/slider-2.jpeg";
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    return (
        <div className="flex">
            <div className="homeSlider w-3/4">
    <Slider {...settings}>
      <div>
        <img src={img1} className="w-full h-60 block" alt="vigatables" />
      </div>          
      <div>
        <img src={img2} className="w-full h-60 block" alt="wafer rolles" />  
      </div>
      <div>
        <img src={img3} className="w-full h-60 block" alt="cokkies" />
      </div>
      <div>
        <img src={img4} className="w-full h-60 block" alt="fruites" />
      </div>
    </Slider>
            </div>
            <div className="w-1/4 ">
                <img src={img1} className="w-full h-[120px] block" alt="vigatables" />
                <img src={img4} className="w-full h-[120px] block" alt="fruites" />
            </div>
        </div>

    
  );
}


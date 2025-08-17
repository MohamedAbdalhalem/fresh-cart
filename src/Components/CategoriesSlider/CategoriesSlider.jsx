import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import usecategories from './../../Custom Hooks/usecategories';
import { Link } from "react-router-dom";

export default function CategoriesSlider() {
   
  // function getallcategories() {
  //   return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  // }
  // const { data } = useQuery({
  //   queryKey: ['allCategories'],
  //   queryFn: getallcategories,
  // })
  const { data } = usecategories()
  console.log(data?.data.data)
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 2,
  };
  return (
    <div className="categoriesSlider my-5">
      <Slider {...settings} autoplay>
        {data?.data.data.map(category => <Link to={`/categories/${category._id}`} key={category._id}>
          <img src={category.image} className="w-full h-60" alt={category.name} />
          <h4 className="text-center font-medium dark:text-white">{ category.name }</h4>
        </Link>)}
      </Slider>
    </div>
  );

}

//import ProductCarousel from "../pages/products/ProductCarousel";
import SmallProduct from "../pages/products/SmallProduct";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice"
import Loader from "./Loader";
import { ImagesSliderDemo } from "./ui/image-slider/imagesSliderDemo";
import { TextRevealCardPreview } from "./ui/text-reveal/textrevealdemo";


const Header = () => {
 
  
  
  return (
    <><div className="flex flex-wrap ">
      
     {/* <TextRevealCardPreview/>*/}
     <ImagesSliderDemo/>
      
      
      </div>
    </>
  )
}

export default Header

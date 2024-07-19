 import ProductCarousel from "../../../pages/products/ProductCarousel"
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./text-reveal-card";

export function TextRevealCardPreview() {
  return (
    <div className="flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full">
      <ProductCarousel/>
      <TextRevealCard
        text="Your journey begins with "
        revealText="Safar Sarthi"
      > { /*
        <TextRevealCardTitle>
          Find Your 
        </TextRevealCardTitle>
      <TextRevealCardDescription>
         Inner Self
        </TextRevealCardDescription>*/}
      </TextRevealCard>
  
     
    </div>
  );
}

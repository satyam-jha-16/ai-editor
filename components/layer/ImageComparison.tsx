'use client';
import { Layer } from "@/zustand/layerStore";
import { CircleSlash2 } from "lucide-react";
import {ReactCompareSlider, ReactCompareSliderImage} from 'react-compare-slider';

export default function ImageComparison({layers} : {layers: Layer[]}) {
  if(layers.length === 0) 
    return <div>no layers selected for comparison <CircleSlash2/></div>
  if (layers.length === 1)
    return (<div className="h-full">
      <ReactCompareSliderImage 
      src={layers[0].url || ""}
      srcSet={layers[0].url || ""}
      alt={layers[0].name || ""}
      className="rounded-lg object-contain"
      /> 
      </div>);
  
  return (
    <ReactCompareSlider
      itemOne={
        <ReactCompareSliderImage
          src={layers[0].url || ""}
          srcSet={layers[0].url || ""}
          alt={layers[0].name || ""}
          className="rounded-lg object-contain"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={layers[1].url || ""}
          srcSet={layers[1].url || ""}
          alt={layers[1].name || ""}
          className="rounded-lg object-contain"
        />
      }
    />
  );
}
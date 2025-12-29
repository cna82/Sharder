"use client";
//imprts
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
// images arr for map 
const images = [
  {
    id: 1,
    src: "/images/AmazingFeatures/amazing (1).webp",
  },
  {
    id: 2,
    src: "/images/AmazingFeatures/amazing (2).webp",
  },
  {
    id: 3,
    src: "/images/AmazingFeatures/amazing (3).webp",
  },
];

const AmazingFeaturesSlider = () => {
  return (
    <div className="w-full bg-white rounded-2xl p-5">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2800 }}
        loop={true}
        spaceBetween={20}
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        {images?.map(({ id, src }) => (
          <SwiperSlide key={id}>
            <div className="relative w-full h-72 md:h-80 lg:h-96">
              <Image
                src={src}
                alt={`Slide ${id}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={id === 1} //just for 1st pic priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-center mt-6 space-y-2">
        <h2 className="text-base sm:text-2xl font-bold text-gray-800">
          <span className="text-sky-500">شاردر</span>، انقلابی در آشپزخانه
        </h2>
        <p className="text-sm text-gray-500">
          وارانتی ۵۵۵ روزه + خدمات پس از فروش عالی و بی نقص
        </p>
        <span className="inline-block mt-3 px-4 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-sky-600 to-gray-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-200 text-sm sm:text-base">
          شاردر، نبض آشپزخانه هر ایرانی
        </span>
      </div>
    </div>
  );
}
export default AmazingFeaturesSlider
import {
  foodImage1,
  foodImage2,
  foodImage3,
  foodImage4,
  foodImage5,
  foodImage6,
  foodImage7,
  foodImage8,
  foodImage9,
} from "../assets/foodImages";

const randomFoodImage = () => {
  const foodImages = [
    foodImage1,
    foodImage2,
    foodImage3,
    foodImage4,
    foodImage5,
    foodImage6,
    foodImage7,
    foodImage8,
    foodImage9,
  ];

  const randomFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];

  return randomFoodImage;
};

export default randomFoodImage;

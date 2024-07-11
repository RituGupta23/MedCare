import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h1>Our Mission</h1>
          <p>
            MedCare is to offer exceptional healthcare services that blend advanced medical technology with a compassionate approach. We strive to create a nurturing environment where patients feel valued, respected, and confident in the care they receive.
          </p>
          <h6>"The only way to keep your health is to eat what you don't want, drink what you don't like, and do what you'd rather not." - Mark Twain</h6>
          <p>
          At MedCare, your health is our top priority. We are dedicated to providing exceptional care that promotes your overall well-being. Trust us to be your partner in health and wellness, guiding you towards a healthier, happier life.
          </p>
          <p>Take care of your body. It's the only place you have to live.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;

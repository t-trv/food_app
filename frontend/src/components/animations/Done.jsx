import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Lottie from "lottie-react";

const Done = ({
  title = "Hoàn thành!",
  animationData,
  className,
  onComplete,
  autoHide = false,
  duration = 2000,
  width = 200,
  height = 200,
}) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      // Animation sẽ tự động chạy khi component mount
      lottieRef.current.setSpeed(1);
    }
  }, []);

  // Handle animation complete
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
    if (autoHide) {
      // Component sẽ tự ẩn sau khi animation hoàn thành
      // Bạn có thể điều khiển việc này từ component cha
    }
  };

  // Nếu có duration, tự động gọi onComplete sau duration
  useEffect(() => {
    if (autoHide && duration) {
      const timer = setTimeout(() => {
        handleComplete();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration]);

  return (
    <StyledWrapper className={className}>
      <div className="done-container">
        {animationData ? (
          <div className="animation-wrapper" style={{ width, height }}>
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={true}
              onComplete={handleComplete}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : (
          <div className="fallback-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={width}
              height={height}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        )}
        {title && <h2 className="title">{title}</h2>}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  z-index: 1000;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .done-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    animation: fadeIn 0.5s ease-in-out;
    width: fit-content;
  }

  .animation-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 0 auto;
  }

  .fallback-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 0 auto;
    color: #22c55e;
    animation: checkmark 0.6s ease-in-out;
  }

  @keyframes checkmark {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .title {
    color: var(--color-secondary);
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
    margin: 0;
    width: fit-content;
    white-space: nowrap;
  }
`;

export default Done;

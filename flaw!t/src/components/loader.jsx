import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 3000); // Start fade out after 3s
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => setLoading(false), 700); // match fade duration
      return () => clearTimeout(timer);
    }
  }, [fadeOut]);

  if (!loading) return null;

  return (
    <StyledOverlay $fadeOut={fadeOut}>
      <StyledWrapper>
        <div className="loader">
          <div className="progress" data-percentage="100%" />
        </div>
      </StyledWrapper>
    </StyledOverlay>
  );
};

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $fadeOut }) => ($fadeOut ? 0 : 1)};
  transition: opacity 0.5s ease;
  pointer-events: ${({ $fadeOut }) => ($fadeOut ? "none" : "auto")};
`;

const StyledWrapper = styled.div`
  .loader {
    width: 80vw;
    max-width: 400px;
    height: 8vw;
    max-height: 32px;
    background-color: #000000;
    position: relative;
    overflow: hidden;
    border: 3px solid white;
    border-radius: 8px;
  }

  .progress {
    width: 0%;
    height: 100%;
    background-color: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    animation: progress-animation 3s ease-in-out forwards;
  }

  .progress::after {
    content: attr(data-percentage);
    position: absolute;
    top: 50%;
    left: 50%;
    font-weight: bold;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    color: black;
    animation: percentage-animation 3s steps(4, end) forwards;
  }

  @keyframes progress-animation {
    0% {
      width: 0%;
    }
    25% {
      width: 25%;
    }
    50% {
      width: 50%;
    }
    75% {
      width: 75%;
    }
    100% {
      width: 100%;
    }
  }

  @keyframes percentage-animation {
    0% {
      content: "0%";
    }
    25% {
      content: "25%";
    }
    50% {
      content: "50%";
    }
    75% {
      content: "75%";
    }
    100% {
      content: "100%";
    }
  }

  @media (max-width: 480px) {
    .loader {
      width: 90vw;
      height: 10vw;
      max-height: 40px;
    }

    .progress::after {
      font-size: 0.7rem;
    }
  }
`;

export default Loader;

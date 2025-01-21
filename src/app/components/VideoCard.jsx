"use client";

import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import Heading from "./Heading";

export default function VideoCard({
  heading = null,
  url = null,
  image = null,
  className = "",
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="container px-[34px] lg:px-0">
      <div
        className={`h-[223px] lg:h-[453px] w-full rounded-[30px] overflow-hidden transition-transform duration-300 ease-in-out transform ${className}`}
      >
        <div className="w-full h-full relative">
          <img
            src={image || "https://via.placeholder.com/400x300"}
            alt="Card Image"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
          />
        </div>

        <div
          className="absolute flex flex-col gap-[20px] justify-center items-center bottom-0 w-full h-[100%] p-[20px]"
          style={{
            background:
              "linear-gradient(64.59deg, #009677 15.69%, rgba(67, 178, 80, 0.56) 48.19%, rgba(80, 184, 72, 0) 68.55%)",
          }}
        >
          <div>
            <button
              className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
              onClick={() => setOpen(true)}
            >
              <svg
                className="absolute animate-[ping_4s_infinite]"
                width="148"
                height="148"
                viewBox="0 0 148 148"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  opacity="0.19"
                  cx="74.4831"
                  cy="74.0163"
                  r="73.4967"
                  fill="white"
                />
              </svg>
              <svg
                className="absolute"
                width="148"
                height="148"
                viewBox="0 0 148 148"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="74.4829" cy="74.0161" r="44.4399" fill="white" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M65.9375 89.4019V58.6359C65.9375 57.2836 67.4335 56.4668 68.571 57.1981L92.5002 72.5811C93.5468 73.2539 93.5468 74.7838 92.5002 75.4567L68.571 90.8397C67.4335 91.5709 65.9375 90.7542 65.9375 89.4019ZM69.356 86.2712L88.4151 74.0189L69.356 61.7666V86.2712Z"
                  fill="#009677"
                />
              </svg>
            </button>
          </div>

          {heading && (
            <Heading
              content={heading}
              className="text-[18px] lg:text-[20px] leading-[25px] font-normal text-white mt-[100px] lg:mt-[166px]"
              tag="h3"
            />
          )}
        </div>
      </div>

      {heading && (
        <ModalVideo
          channel="custom"
          isOpen={isOpen}
          url={url}
          onClose={() => setOpen(false)}
          ratio="9:16"
        />
      )}
    </div>
  );
}

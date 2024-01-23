"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";

const Page = () => {
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 1) {
        setCountdown((prevCount) => prevCount - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    if (countdown === 1) {
      redirect("/accounts");
    }
    return () => clearInterval(timer);
  }, [countdown]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl rounded-lg p-6 shadow-lg bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-blue-600 mx-auto">
            Allocating Resources in Cloud
          </h1>
        </div>
        <div className="flex justify-center">
          <video
            className="rounded-lg"
            width="440"
            height="360"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://waiting-buffers.s3.amazonaws.com/loop.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-4">
          <div className="demo-container">
            <div className="progress-bar">
              <div className="progress-bar-value"></div>
            </div>
          </div>
          <p className="mt-2 text-center text-lg text-gray-700">
            You will be redirected automatically
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="focus:ring focus:ring-blue-600 hover:bg-blue-100 inline-flex h-10 w-28 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-lg font-medium text-white transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            {countdown}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

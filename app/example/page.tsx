"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";

const Page = () => {
  const [countdown, setCountdown] = useState(10);

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
          <h1 className="text-3xl font-semibold text-blue-600">
            Allocating Resources
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
              src="https://waiting-buffers.s3.us-east-1.amazonaws.com/loop.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCmFwLXNvdXRoLTEiRzBFAiEAr7YQVJOCUYy8kPFUuFi6EctPRGFH6rUoLwNR40L32TQCIFd6jS9YpyIbKaLyQ6QrwS8OR6OotmSkcJEr0WpCOv3JKuQCCC0QABoMNDI4ODQyNjc3MDM5IgwnrGlxQN%2F%2BOxh3pAcqwQKU84MM%2BSuD1IyVXmVe76eTkNpR%2F84hFM%2FANvKtN9UGxwgMmWoiQ78zAaUv4oaFKrLcmQpXuO9kB81igW03Dbpveds5LgjIwVX3k2nISzpwGQjwNuwbnXOhG0vBxp%2FEr7ORzoRkrfbJYgV915U%2F3f%2FiwYYZocV19Vq6IfL9vgpIurkEbQMHLxfq%2BAdY8tT3LGnDbjn6IpYXX89fxcqm3sh0JxR6tmLHkTwqE5h1ylYTDG00fXaeqoqfjN7E9XrLwfKiB79qLqIGXt%2BQ0qSeQm7e0Wv7am0pCYhPt2t1kVsPBxJA2jN4J17YdD875Wn22W%2FvcsuzDkJep%2BzGUzXNx2nWtM2UAmYwCpHfHBHdOGfCke9WfHCMnTNf4j5Ir3chTtSYYqGArOzFPVKSa3cm9lucKzHS509c4V4oUT%2FsYdIpvGAwtZ2zrQY6swKAj2p70OTYifsnkPe62%2FE8CYRsRBQCWxH2f%2FKthXmiWdGL3O%2FZqM%2BA27%2BesqAbFaX4fosa44SfglKZ6IvOzRhvQHhtd6D7TQzNrvqjpRwusJiS5%2Bvt7gfp7BqacURq2zO8ts25MDbhEtKGWApyMJcpzEEcu9fcxgIGaQsNe%2BQE%2BeEQM%2B9CJxGcUOseRYtALNlhaW5c8d1TlG14engYA2CjG1yn7Ne5GrjDYIymCGzIcJ0aoIzTJO9fVA1LaSD1qdejY%2FtfNdOT8X%2FVAYNgfnAiLndy29E%2FDd4Nd%2BPKQ%2FKV6CDQPa83aZwXTEDuGqIHf54RsCAEsSNex0fTuq%2BwQQcJMvFH8fX8M9jOG4wdxFHeUSyCXGr9gLjbQDfnQn%2FBhO36a7aWY1aqE9jriBK0YuAvzZZV&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240121T120401Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAWHWID6MXVUWBZFEY%2F20240121%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=617608ef8e30762ad9a5aba64398337fb535415436d01b6f21f846367526c529"
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

import React from "react";

function Creative() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div>
        <h1 className="animate-pulse">Coming Soon!</h1>
        <div className="grid place-content-center mt-5 transition-all duration-500 hover:bg-white group hover:m-8">
          <a href="/">
            <svg
              className="transition-all duration-300 fill-white group-hover:fill-black"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H7C6.73478 17 6.48043 16.8946 6.29289 16.7071C6.10536 16.5196 6 16.2652 6 16C6 15.7348 6.10536 15.4804 6.29289 15.2929C6.48043 15.1054 6.73478 15 7 15Z" />
              <path d="M7.41402 16L15.708 24.292C15.8958 24.4798 16.0013 24.7344 16.0013 25C16.0013 25.2656 15.8958 25.5202 15.708 25.708C15.5202 25.8958 15.2656 26.0013 15 26.0013C14.7345 26.0013 14.4798 25.8958 14.292 25.708L5.29202 16.708C5.19889 16.6151 5.12501 16.5048 5.07459 16.3833C5.02418 16.2618 4.99823 16.1315 4.99823 16C4.99823 15.8685 5.02418 15.7382 5.07459 15.6167C5.12501 15.4952 5.19889 15.3849 5.29202 15.292L14.292 6.292C14.4798 6.10423 14.7345 5.99874 15 5.99874C15.2656 5.99874 15.5202 6.10423 15.708 6.292C15.8958 6.47977 16.0013 6.73445 16.0013 7C16.0013 7.26555 15.8958 7.52023 15.708 7.708L7.41402 16Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Creative;

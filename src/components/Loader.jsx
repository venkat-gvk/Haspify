import { RevolvingDot } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="absolute inset-0 bg-gray-50 bg-opacity-70 w-full h-full grid items-center">
      <div className="mx-auto w-[80%] rounded-lg bg-white opacity-100 h-52 shadow md:w-1/3 md:h-1/3 p-2 flex flex-col justify-center items-center space-y-10">
        <div>
          <RevolvingDot
            height={100}
            width={100}
            color="#E04DB0"
            ariaLabel="loading"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;

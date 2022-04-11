const Error_404 = () => {
  return (
    <>
      <h3 className="text-5xl text-center mt-10 tracking-widest text-gray-800">
        HASPIFY
      </h3>

      <div className="flex flex-col items-center mt-20 space-y-3 justify-center w-full">
        <h3 className="text-2xl text-center md:text-3xl text-gray-700 -tracking-wider">
          The link might have expired
        </h3>
        <h3 className="text-2xl text-center md:text-xl text-gray-700 -tracking-wider">
          or
        </h3>
        <h3 className="text-2xl text-center md:text-3xl text-gray-700 -tracking-wider">
          you are in a wrong address
        </h3>
      </div>
    </>
  );
};

export default Error_404;

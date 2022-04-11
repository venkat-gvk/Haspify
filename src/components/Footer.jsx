const Footer = () => {
  return (
    <div
      className="flex justify-center sm:justify-evenly items-center mx-auto space-x-4 
        max-w-xs sm:max-w-xl lg:text-2xl p-2 text-gray-600"
    >
      <div className="w-9/12 text-center p-2 shadow-sm">
        <p>Built with React js, Tailwind CSS and Firebase</p>
      </div>

      <div className=" w-9/12 text-center p-2 shadow-sm">
        <p>Fast and Reliable</p>
      </div>

      <div className="w-9/12 text-center p-2 shadow-sm">
        <p>100% Free and Open Source</p>
      </div>
    </div>
  );
};

export default Footer;

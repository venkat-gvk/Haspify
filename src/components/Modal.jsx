import { useRef, useState } from "react";

const Modal = ({ finishedUrl, setFinishedUrl }) => {
  const [copied, setCopied] = useState(false);
  const button_focus = useRef(null);

  const closeModal = (e) => {
    const id = e.target.id;

    if (id === "modal-outer-layer") setFinishedUrl("");
  };

  const copy_to_clipboard = (e) => {
    navigator.clipboard.writeText(finishedUrl);
    button_focus.current.focus();

    if (!copied) setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main
      id="modal-outer-layer"
      className="absolute  inset-0 bg-gray-50 bg-opacity-70 z-100 min-h-screen grid place-items-center"
      onClick={closeModal}
    >
      <div className="w-[80%] rounded-lg bg-white opacity-100 h-52 shadow md:w-1/3 md:h-1/3 p-2 flex flex-col justify-center items-center space-y-10">
        <input
          className="bg-gray-50 border border-pink-300 text-gray-800 text-sm rounded-lg w-5/6 p-2.5 focus:ring focus:ring-pink-400 focus:border-none"
          type="text"
          readOnly
          value={finishedUrl}
          ref={button_focus}
        />

        <div className="space-x-10">
          <button
            className="text-white bg-gradient-to-r tracking-wide from-pink-400 via-pink-500 to-pink-500 hover:bg-gradient-to-br focus:ring-2 focus:ring-pink-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 hover:bg-pink-500 hover:cursor-pointer"
            onClick={copy_to_clipboard}
          >
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            className="text-white bg-gradient-to-r tracking-wide from-red-400 via-red-500 to-red-500 hover:bg-gradient-to-br focus:ring-2 focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 hover:bg-red-500 hover:cursor-pointer"
            onClick={() => setFinishedUrl("")}
          >
            Close
          </button>
        </div>
      </div>
    </main>
  );
};

export default Modal;

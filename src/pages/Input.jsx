import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { hash as hashed } from "../components/hash";
import moment from "moment";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Input = () => {
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [timer, setTimer] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkTimer, setCheckTimer] = useState(false);

  const [loading, setLoading] = useState(false);

  const [finishedUrl, setFinishedUrl] = useState("");

  const handleInputUrl = (e) => {
    const link = e.target.value;
    setUrl(link);
  };

  const handlePassword = (e) => {
    const pass = e.target.value;
    setPassword(pass);
  };

  const handleTimer = (e) => {
    const time = e.target.value;

    if (time === "0") alert("Minute must not be 0");
    else if (time < 0 || time > 1440) alert("Minutes range exceeded");
    else {
      setTimer(e.target.value);
    }
  };

  const handlecheckPassword = () => {
    setCheckPassword(!checkPassword);
    setPassword("");
  };

  const handleCheckTimer = () => {
    setCheckTimer(!checkTimer);
    setTimer("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formUrl = e.target.url.value.trim();

    let formPass = null;
    let formTimer = null;

    if (checkPassword && password) formPass = e.target.password.value;

    if (checkTimer && timer) {
      formTimer = Number(e.target.timer.value);
      formTimer = String(moment().add({ minutes: formTimer })._d);
    }

    const hash = hashed();

    const link = {
      url: formUrl,
      password: formPass,
      m_currentTime: formTimer,
      hash,
    };

    const location = window.location.href;
    let antified = `${location}h/${hash}`;

    console.log(antified);

    try {
      await setDoc(doc(db, "links", hash), link);

      setFinishedUrl(antified);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setLoading(false);
  };

  return (
    <div>
      <Header />

      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white/10 shadow-sm p-4 min-h-[23rem] sm:max-w-lg mx-auto"
      >
        <div>
          <label
            htmlFor="urllink"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Enter an URL
          </label>
          <input
            type="url"
            id="urllink"
            name="url"
            className="bg-gray-50 border border-pink-300 text-gray-800 text-sm rounded-lg w-full p-2.5 focus:ring focus:ring-pink-400 focus:border-none"
            placeholder="https://example.com"
            required
            value={url}
            onChange={handleInputUrl}
          />
        </div>

        <div className="flex justify-around items-center">
          <div className="flex space-x-3 items-center">
            <input
              id="checkPassword"
              name="checkPassword"
              type="checkbox"
              className="w-4 h-4 bg-gray-50 rounded-md border border-gray-300 focus:ring focus:ring-pink-300 "
              checked={checkPassword}
              onChange={handlecheckPassword}
            />

            <div className="text-sm">
              <label
                htmlFor="checkPassword"
                className="font-medium text-gray-600 "
              >
                Password
              </label>
            </div>
          </div>

          <div className="flex space-x-3 items-center">
            <input
              id="checkTimer"
              name="checkTimer"
              type="checkbox"
              className="w-4 h-4 bg-gray-50 rounded-lg border border-gray-300 focus:ring focus:ring-pink-300 "
              checked={checkTimer}
              onChange={handleCheckTimer}
            />

            <div className="text-sm">
              <label
                htmlFor="checkTimer"
                className="font-medium text-gray-600 "
              >
                Timer
              </label>
            </div>
          </div>
        </div>

        {checkPassword && (
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Password with 5 chars min
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-pink-300 text-gray-800 text-sm rounded-lg w-full p-2.5 focus:ring focus:ring-pink-400 focus:border-none"
              required
              value={password}
              onChange={handlePassword}
            />
          </div>
        )}

        {checkTimer && (
          <div>
            <label
              htmlFor="checkTimer"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Time in minutes range (0 - 1440)
            </label>
            <input
              type="number"
              id="checkTimer"
              name="timer"
              className="bg-gray-50 border border-pink-300 text-gray-800 text-sm rounded-lg w-full p-2.5 focus:ring focus:ring-pink-400 focus:border-none"
              required
              placeholder={10}
              value={timer}
              onChange={handleTimer}
              min={0}
              max={1440}
            />
          </div>
        )}

        {url && checkPassword && password && password.length >= 5 && (
          <div className="text-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-r tracking-wide from-pink-400 via-pink-500 to-pink-500 hover:bg-gradient-to-br focus:ring-2 focus:ring-pink-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-3/6 transition-all hover:bg-pink-500 hover:cursor-pointer"
            >
              Haspify
            </button>
          </div>
        )}

        {url && !checkPassword && (
          <div className="text-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-r tracking-wide from-pink-400 via-pink-500 to-pink-500 hover:bg-gradient-to-br focus:ring-2 focus:ring-pink-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2 w-3/6 transition-all hover:bg-pink-500 hover:cursor-pointer"
            >
              Haspify
            </button>
          </div>
        )}
      </form>

      <Footer />

      {loading && <Loader />}

      {finishedUrl && (
        <Modal finishedUrl={finishedUrl} setFinishedUrl={setFinishedUrl} />
      )}
    </div>
  );
};

export default Input;

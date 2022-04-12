import { useLocation, useNavigate } from "react-router-dom";
import { getData, deleteData } from "../components/firebase_ops";
import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { RevolvingDot } from "react-loader-spinner";
import Header from "../components/Header";

const ValidateUrl = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const hash = pathname.slice(3);

  const [password, setPassword] = useState("");
  const [hasPassword, setHasPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(null);
  const [isLinkExpired, setIsLinkExpired] = useState(false);

  const moment_ref = useRef(null);
  const interval_ref = useRef(null);
  const password_ref = useRef(null);
  const path = useRef(null);

  useLayoutEffect(() => {
    setLoading(true);

    getData(hash).then((obj) => {
      if (obj) {
        if (!obj.password) {
          window.location = obj.url;
          return;
        }

        path.current = obj.url;

        setHasPassword(true);

        password_ref.current = obj.password;

        if (obj.time) {
          moment_ref.current = obj.time;

          setTimer({
            hr: obj.time.hours(),
            min: obj.time.minutes(),
            sec: obj.time.seconds(),
          });
        }
      } else {
        navigate("/stop", { replace: true });
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    interval_ref.current = setInterval(() => {
      if (moment_ref.current) {
        moment_ref.current.subtract(1, "seconds");

        const hr = moment_ref.current.hours();
        const min = moment_ref.current.minutes();
        const sec = moment_ref.current.seconds();

        if (hr === 0 && min === 0 && sec === 0) {
          deleteData(hash);

          setTimer(null);
          setHasPassword(false);
          setIsLinkExpired(true);

          clearInterval(interval_ref.current);
        } else {
          setTimer({
            hr,
            min,
            sec,
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval_ref.current);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (password !== password_ref.current) {
      setError(true);

      setLoading(false);
    } else {
      setTimeout(() => {
        window.location = path.current;
      }, 1000);
    }
  };

  return (
    <>
      <Header />

      {loading ? (
        <div className="mx-auto w-[80%] h-52 md:w-1/3 md:h-1/3 p-2 flex flex-col justify-center items-center space-y-10">
          <div className="mt-20">
            <RevolvingDot
              height={100}
              width={100}
              color="#E04DB0"
              ariaLabel="loading"
            />
          </div>
        </div>
      ) : (
        <div>
          {hasPassword && (
            <form
              className="max-w-xs space-y-4 mt-10 sm:max-w-lg mx-auto"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Enter password to unlock
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-pink-300 text-gray-800 text-sm rounded-lg w-full p-2.5 focus:ring-1 focus:ring-pink-400 focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => {
                    setError(false);
                    setPassword(e.target.value);
                  }}
                />
              </div>

              {error && (
                <p className="text-red-600 text-md p-2 text-center w-full">
                  Password doesn't match. Try again
                </p>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-500 hover:bg-gradient-to-br focus:ring-2 focus:ring-pink-400 font-medium rounded-lg text-sm px-5 py-2.5 
                    text-center mr-2 mb-2 mt-2 w-3/6 transition-all focus:outline-none"
                >
                  Unlock
                </button>
              </div>
            </form>
          )}

          {isLinkExpired && (
            <div className="my-auto mt-10">
              <p className="text-pink-600 text-2xl p-2 text-center w-full">
                Sorry, The Link has expired..
              </p>
            </div>
          )}

          {timer && (
            <div className="mx-auto  text-center mt-10">
              <span className="text-gray-600 sm:text-xl text-md p-2">
                The Link will expire in
              </span>

              <span
                className="text-gray-800 text-xl p-2 font-semibold"
                style={{
                  color: !timer.hr && !timer.min && timer.sec < 10 && "red",
                }}
              >
                {timer.hr} : {timer.min} : {timer.sec}
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ValidateUrl;

import { useRef, useState } from "react";
import { usePinInput, PinInputActions } from "react-pin-input-hook";
import { verifyPin } from "./services/otp";

const App = () => {
  const defaultValue = ["1", "2", "3", "4"];

  const [values, setValues] = useState(defaultValue);
  const [error, setError] = useState(false);
  const [mask, setMask] = useState(false);
  const [lengthPin, setLengthPin] = useState(4);
  const [loading, setLoading] = useState(false);

  const actionRef = useRef<PinInputActions>(null);

  const { fields } = usePinInput({
    values,
    onChange: setValues,
    error,
    actionRef,
    type: "numeric",
    mask: mask,
    autoFocus: true,
  });

  const onSubmit = async () => {
    if (values.includes("")) {
      setError(true);
      actionRef.current?.focus();
    } else {
      setLoading(true);
      let result = "";
      values.forEach(function (x) {
        result = result + x;
      });
      const res = await verifyPin(+result);
      if (res) {
        alert("Success");
        setError(false);
        setValues(Array(lengthPin).fill(""));
      } else {
        setError(true);
        actionRef.current?.focus();
      }
      setLoading(false);
    }
  };

  const onReset = () => {
    setValues(defaultValue);
  };

  const onMask = () => {
    setMask((prev) => !prev);
  };

  const onChangeLengthPin = (value: number) => {
    setLengthPin(value);
    setValues((prev) => {
      if (prev.length === value) {
        return prev;
      } else {
        return Array(value).fill("");
      }
    });
  };

  return (
    <div className="flex justify-center h-[100vh]">
      <div className="w-[300px] m-auto">
        <div className="text-center mb-4">
          <span> Length Pin: </span>
          <input
            className="w-[100px] placeholder:text-base leading-14 text-center items-center text-2xl font-bold text-white w-full h-full bg-[#FAFAFA] dark:bg-[#11131F]  focus:ring-2 focus:outline-none z"
            type="number"
            min={0}
            value={lengthPin}
            onChange={(e) => onChangeLengthPin(+e.target.value)}
          />
        </div>

        <div className="otp-input-com flex sm:space-x-5 space-x-3 justify-center ">
          {fields.map((propsField, index) => (
            <input
              key={index}
              className="rounded-[50%] w-[50px] h-[50px] placeholder:text-base leading-14 text-center items-center text-2xl font-bold text-white w-full h-full bg-[#FAFAFA] dark:bg-[#11131F]  focus:ring-2 focus:outline-none z"
              {...propsField}
            />
          ))}
        </div>
        <div className="mb-8 text-center text-red-700 text-[14px]">
          {error && "Pin incorrect!"}
        </div>

        <div className="text-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onReset}
          >
            Reset
          </button>
          <button
            className="mx-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onMask}
          >
            Mask
          </button>
          <button
            disabled={loading}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onSubmit}
          >
            {loading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Submit
          </button>
        </div>
        <div className="text-center">Note: Enter 1111 to access</div>
      </div>
    </div>
  );
};

export default App;

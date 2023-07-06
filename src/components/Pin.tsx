import { useEffect, useRef } from "react";
import { removeValueFromArray } from "../utils";

type IProps = {
  mask: boolean;
  pin: Array<string>;
  lengthPin: number;
  setPin: (pin: Array<string>) => void;
};

const Pin = ({ mask, pin, lengthPin, setPin }: IProps) => {
  const BACKSPACE_KEY = "Backspace";

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    changePinFocus(0);
  }, [lengthPin]);

  const changePinFocus = (pinIndex: number) => {
    const ref = inputRefs.current[pinIndex];
    if (ref) {
      ref.focus();
    }
  };

  const onPinChange = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const keyboardKeyCode = event.nativeEvent.code;
    if (keyboardKeyCode !== BACKSPACE_KEY) {
      return;
    }
    if (pin[index] === "") {
      changePinFocus(index - 1);
    } else {
      onPinChange("", index);
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const previousValue = event.target.defaultValue;
    const valuesArray = event.target.value.split("");
    removeValueFromArray(valuesArray, previousValue);
    const value = valuesArray.pop();
    if (!value) {
      return;
    }
    const pinNumber = Number(value.trim());
    if (isNaN(pinNumber) || value.length === 0) {
      return;
    }

    if (pinNumber >= 0 && pinNumber <= 9) {
      onPinChange(`${pinNumber}`, index);
      if (index < lengthPin - 1) {
        changePinFocus(index + 1);
      }
    }
  };

  return (
    <div className="otp-input-com flex sm:space-x-5 space-x-3 justify-center">
      {pin.map((value, index) => (
        <input
          type={mask ? "password" : "text"}
          key={index}
          value={value}
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          style={{
            width: "56px",
            height: "56px",
          }}
          onChange={(e) => onChange(e, index)}
          onKeyDown={(e) => onKeyDown(e, index)}
          className="rounded-[50%] placeholder:text-base leading-14 text-center items-center text-2xl font-bold text-white w-full h-full bg-[#FAFAFA] dark:bg-[#11131F]  focus:ring-2 focus:outline-none z"
        />
      ))}
    </div>
  );
};

export default Pin;

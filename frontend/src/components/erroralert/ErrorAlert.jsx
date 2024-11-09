import { memo, useRef, useState } from "react";
import CloseIcon from "../../assets/close.svg?react";

// incomplete
function ErrorAlert(props) {
  const { className, message } = props;
  const [showError, setShowError] = useState(null);
  const timerRef = useRef(null);

  return (
    <div
      className={`flex items-center justify-between bg-red-200 md:text-[16px] text-[12px] rounded ${
        showError
          ? "animate-[expanddown_0.3s_ease-out]"
          : showError !== null
          ? "animate-[collapse_0.3s_ease-out] opacity-0"
          : "hidden"
      } ${className}`}
    >
      {message}
      <button
        className="cursor-pointer"
        onClick={() => {
          clearTimeout(timerRef.current);
          setShowError((error) => false);

          // to avoid animate-collapse to be visible, when opening the modal again.
          setTimeout(() => {
            setShowError((error) => null);
          }, 300);
        }}
      >
        <CloseIcon className="w-[24px]" />
      </button>
    </div>
  );
}

export default memo(ErrorAlert);

// /**
//    * Renders an error message component with animation and close button.
//    *
//    * @param {Object} props - The properties passed to the component.
//    * @param {string} props.message - The error message to be displayed.
//    * @returns {JSX.Element} A div element containing the error message and close button.
//    */
//   const ErrorMessage = (props) => {
//     return (
//       <div
//         className={`flex items-center justify-between bg-red-200 md:text-[16px] text-[12px] rounded ${
//           showError
//             ? "animate-[expanddown_0.3s_ease-out]"
//             : showError !== null
//             ? "animate-[collapse_0.3s_ease-out] opacity-0"
//             : "hidden"
//         } ${props.className}`}
//       >
//         {props.message}
//         <button
//           className="cursor-pointer"
//           onClick={() => {
//             clearTimeout(timerRef.current);
//             setShowError((error) => false);

//             // to avoid animate-collapse to be visible, when opening the modal again.
//             setTimeout(() => {
//               setShowError((error) => null);
//             }, 300);
//           }}
//         >
//           <CloseIcon className="w-[24px]" />
//         </button>
//       </div>
//     );
//   };

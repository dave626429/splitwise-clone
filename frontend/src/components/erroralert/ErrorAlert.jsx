import React from "react";
import CloseIcon from "../../assets/close.svg?react";

/**
 * @Component
 * @description Displays a list of error messages in an alert box.
 *
 * @param {Object} props - The component properties.
 * @param {string[]} [props.messages=[]] - An array of error messages to display. Defaults to an empty array if no messages are provided.
 * @param {Object} [props.rest] - Additional props are passed to the component's root element, allowing for flexible styling and additional attributes.
 *
 * @returns {JSX.Element} Alert component displaying error messages.
 *
 * @example
 * // Basic usage of ErrorAlert component
 * <ErrorAlert messages={['Error 1', 'Error 2']} className="custom-class" />
 */
export default function ErrorAlert({ messages = [], ...props }) {
  return (
    <div
      id="error-dropdown"
      className={`fixed m-5 flex justify-between items-center place-content-center max-md:text-[12px] bg-red-500 text-white rounded ${props.className}`}
    >
      <ul className="list-disc pl-[30px]">
        {messages?.map((message, i) => (
          <li key={`error-message-${i}`}>
            <p className="my-[14px]">{message}</p>
          </li>
        ))}
      </ul>

      <CloseIcon
        className="min-w-[20px] w-[20px] m-[10px] fill-white cursor-pointer"
        onClick={() => {
          console.log("click");
          props.onClose();
        }}
      />
    </div>
  );
}

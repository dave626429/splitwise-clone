import { forwardRef, memo, useImperativeHandle, useState } from "react";

/**
 * Modal Component
 *
 * @param {ReactNode} header - Content to be displayed in the modal header.
 * @param {ReactNode} body - Content to be displayed in the modal body.
 * @param {ReactNode} footer - Content to be displayed in the modal footer.
 * @param {function}  onBlurAreaClick - Callback function triggered when clicking
 *   outside the modal container, typically used to close the modal.
 *
 * @returns {JSX.Element} A modal overlay component.
 */
const Modal = forwardRef((props, ref) => {
  const { footer, body, header, onBlurAreaClick } = props;

  // useImperativeHandle((ref) => ({}));

  return (
    <div
      id="modal-blur-area"
      className="absolute inset-0 w-screen h-screen backdrop-blur-md flex justify-center items-center drop-shadow-1 z-0"
      onClick={onBlurAreaClick}
    >
      <div
        id="modal-container"
        className="m-[40px] lg:w-[500px] sm:w-[470px] w-full h-2/3 flex flex-col border rounded relative z-10"
        onClick={(e) => {
          // to avoid propagating click to the blur-area
          e.stopPropagation();
        }}
      >
        <header className="h-[40px] bg-red-500 text-white flex items-center px-[14px] rounded-t-2 relative">
          {header}
        </header>

        <section
          className="relative flex-1 overflow-hidden overflow-y-auto bg-white"
          ref={ref}
        >
          {body}
        </section>

        <footer className="bg-white flex items-center p-[14px] justify-end gap-[14px] rounded-b-2 drop-shadow-2">
          {footer}
        </footer>
      </div>
    </div>
  );
});

export default memo(Modal);

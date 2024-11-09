import React, { useCallback, useEffect, useRef, useState } from "react";
import CloseIcon from "../../assets/close.svg?react";
import XIcon from "../../assets/closeX.svg?react";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import Table from "../../components/table/Table";
import { friends } from "../../data/friends";
import { generateElementKey } from "../../ultils/generateUUID";

export default function Friends() {
  const [closeModal, setCloseModal] = useState(false);
  const [data, setData] = useState(friends);
  const [filteredData, setFilteredData] = useState(null);
  const [showError, setShowError] = useState(null);
  const [search, setSearch] = useState("");

  const resetModal = {
    index: null,
    header: null,
    body: {
      id: null,
      name: null,
      email: null,
      contact: null,
    },
  };
  const [modalData, setModalData] = useState(resetModal);

  const formRef = useRef(null);
  const timerRef = useRef(null);

  const handleModalClose = useCallback((e) => {
    console.log(e?.current?.id);
    e && e.stopPropagation();

    setModalData(resetModal);
    setCloseModal((isClose) => !isClose);
  }, []);

  const handleSave = (e) => {
    e.stopPropagation();

    const name = formRef.current[`friends-add-btn-modal-name`].value;
    const email = formRef.current[`friends-add-btn-modal-email`].value;
    const contact = formRef.current[`friends-add-btn-modal-phone`].value;
    console.log({ name, contact, email, modalData });

    if (modalData.index) {
      setData(
        data.toSpliced(modalData.index, 1, {
          ...modalData.body,
          name,
          contact,
          email,
        })
      );
    } else {
      const id = generateElementKey();
      if (!email || !name) {
        setShowError((error) => true);
        clearInterval(timerRef.current);
        timerRef.current = setTimeout(() => {
          setShowError((error) => false);
          // to avoid animate-collapse to be visible, when opening the modal again.
          setTimeout(() => {
            setShowError((error) => null);
          }, 300);
        }, 6000);
        return;
      }
      setData([{ id, name, email, contact }, ...data]);
    }
    setModalData(resetModal);
    handleModalClose();
  };

  const handleSearchFriend = useCallback(
    (e) => {
      const searchTerm = e.target.value;
      setSearch(searchTerm);

      // Clears the previous search timer for debounce
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setFilteredData(
          data.filter((item) =>
            item.name.toUpperCase().startsWith(searchTerm.toUpperCase())
          )
        );
      }, 300); // 300ms debounce delay
    },
    [data, search]
  );

  /**
   * Renders an error message component with animation and close button.
   *
   * @param {Object} props - The properties passed to the component.
   * @param {string} props.message - The error message to be displayed.
   * @returns {JSX.Element} A div element containing the error message and close button.
   */
  const ErrorMessage = (props) => {
    return (
      <div
        className={`flex items-center justify-between ease-in duration-300 absolute bg-red-200 top-[-10px] inset-x-[-10px] p-[10px] md:text-[16px] text-[12px] rounded ${
          showError
            ? "animate-[expanddown_0.3s_ease-in]"
            : showError !== null
            ? "animate-[collapse_0.3s_ease-in] opacity-0"
            : "hidden"
        }`}
      >
        {props.message}
        <button
          className="w-[24px] cursor-pointer"
          onClick={() => {
            clearTimeout(timerRef.current);
            setShowError((error) => false);

            // to avoid animate-collapse to be visible, when opening the modal again.
            setTimeout(() => {
              setShowError((error) => null);
            }, 300);
          }}
        >
          <CloseIcon />
        </button>
      </div>
    );
  };

  const modalHeader = (
    <h5 className="max-md:text-[14px]">{modalData.header || "Add a friend"}</h5>
  );

  const modalBody = (
    <form
      id="app-friends-modal-body"
      className="flex items-center flex-col gap-[14px] relative "
      ref={formRef}
    >
      <ErrorMessage message="name and email cannot be empty" />
      <img
        className="w-[150px] rounded-full"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
        alt=""
      />
      <input
        id="friends-add-btn-modal-name"
        className=""
        type="text"
        placeholder="Name..."
        defaultValue={modalData.body.name || ""}
        onSelect={(e) => {
          e.stopPropagation();
        }}
      />
      <input
        id="friends-add-btn-modal-email"
        className=""
        type="email"
        placeholder="Email address..."
        defaultValue={modalData.body.email || ""}
        onSelect={(e) => {
          e.stopPropagation();
        }}
      />
      <input
        id="friends-add-btn-modal-phone"
        className=""
        type="phone"
        placeholder="Phone number..."
        defaultValue={modalData.body.contact || ""}
        onSelect={(e) => {
          e.stopPropagation();
        }}
      />
    </form>
  );

  const modalFooter = (
    <>
      <Button
        label="Cancel"
        className="bg-white drop-shadow-1 text-red-500 border"
        onClick={handleModalClose}
      />
      <Button
        label="Save"
        className="bg-red-500 text-white active:bg-red-400"
        onClick={handleSave}
      />
    </>
  );

  return (
    <div
      id="app-friends-page"
      className="w-full h-full overflow-hidden overflow-y-auto sm:p-[40px] p-[18px]"
    >
      {/* friends page header */}
      <div className="flex justify-between gap-[14px] items-center md:flex-nowrap flex-wrap">
        <h1 className="flex items-center text-b-1 max-md:text-[16px]">
          Friends
        </h1>
        <div className="w-full max-w-[500px] flex items-center relative justify-end">
          <input
            className="rounded-2 p-2 ps-4 md:h-[46px] h-[30px]"
            type="text"
            placeholder="Find friend..."
            onInput={handleSearchFriend}
            onChange={(e) => {
              console.log(e.target);
            }}
            value={search}
          />
          {search && (
            <span
              className="absolute md:w-[30px] w-[20px] md:p-[2%] p-[1.5%] -translate-x-[26%] cursor-pointer stroke-red-500 duration-300 hover:bg-red-100 rounded-[10px]"
              onClick={() => {
                setSearch("");
                setFilteredData(null);
              }}
            >
              <XIcon />
            </span>
          )}
        </div>
        <div className="flex items-center gap-[20px]">
          <Button
            label="Add a friend"
            className="bg-red-500 text-white active:bg-red-400 text-nowrap"
            onClick={handleModalClose}
          />
        </div>
      </div>

      <Table
        data={filteredData || data}
        className="sm:mt-[40px] mt-[18px]"
        noDataMessage="No friends available..."
        onRowClick={(rowData, i) => {
          // const name = formRef?.current[`friends-add-btn-modal-name`].value;
          // const email = formRef?.current[`friends-add-btn-modal-email`].value;
          // const contact = formRef?.current[`friends-add-btn-modal-phone`].value;
          handleModalClose();
          console.log(rowData, i, formRef.current);
          setModalData((preData) => ({
            ...preData,
            header: "Edit Friend",
            body: { ...rowData },
            index: i,
          }));
        }}
      />

      {closeModal && (
        <Modal
          header={modalHeader}
          body={modalBody}
          footer={modalFooter}
          onBlurAreaClick={handleModalClose}
        />
      )}
    </div>
  );
}

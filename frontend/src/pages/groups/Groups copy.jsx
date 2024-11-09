import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import CloseIcon from "../../assets/close.svg?react";
import AddIcon from "../../assets/add.svg?react";
import GroupImgUploadIcon from "../../assets/groupuploadplaceholder.svg?react";
import XIcon from "../../assets/closeX.svg?react";
import Delete from "../../assets/bin.svg?react";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import Table from "../../components/table/Table";
import { friends } from "../../data/friends";
import { generateElementKey, generateId } from "../../ultils/generateUUID";

export default function Groups() {
  const [closeModal, setCloseModal] = useState(false);
  const [data, setData] = useState(friends);
  const [filteredData, setFilteredData] = useState(null);
  const [showError, setShowError] = useState(null);
  const [search, setSearch] = useState("");

  const [groupMembers, setGroupMembers] = useState([
    {
      name: "",
      email: "",
      id: generateId(),
    },
  ]);

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
  const modalSectionRef = useRef(null);

  const addMember = () => {
    if (!groupMembers[0].name && !groupMembers[0].email) {
      setShowError(true);
      return;
    }
    setGroupMembers((members) => [
      {
        name: "",
        email: "",
        id: generateId(),
      },
      ...members,
    ]);
  };

  const handleMemberChange = (id, field, value) => {
    let flag = true;
    const temp = groupMembers.map((member) => {
      if (member.id === id && member[field] === value) flag = false;
      return member.id === id ? { ...member, [field]: value } : member;
    });
    flag && setGroupMembers(temp);
  };

  const handleModalClose = useCallback((e) => {
    e && e.stopPropagation();

    setModalData(resetModal);
    setCloseModal((isClose) => !isClose);
  }, []);

  const handleSave = (e) => {
    e.stopPropagation();

    console.log(formRef.current[`groups-modal-group-name`].value, groupMembers);

    setModalData(resetModal);
    // handleModalClose();
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

  const tableRowClick = useCallback(
    (rowData, i) => {
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
    },
    [modalData]
  );

  const InputGroup = memo((props) => {
    return (
      <div
        id="groups-modal-add-members-inputs-wrapper"
        className="flex flex-col gap-[8px]"
      >
        {groupMembers.map((member, i) => (
          <div
            key={generateElementKey(`group-member`)}
            className="flex sm:flex-row flex-col gap-[8px]"
          >
            <input
              className="sm:w-[50%] w-full"
              type="text"
              placeholder="name..."
              onBlur={(e) => {
                handleMemberChange(member.id, "name", e.target.value);
              }}
              defaultValue={member.name || ""}
            />

            <div className="flex-1 flex gap-[8px]">
              <input
                key={generateElementKey()}
                type="text"
                placeholder="email..."
                onBlur={(e) => {
                  handleMemberChange(member.id, "email", e.target.value);
                }}
                defaultValue={member.email || ""}
              />
              <div
                key={generateElementKey()}
                className="w-[24px] fill-red-500 cursor-pointer flex items-center"
                onClick={() => {
                  setGroupMembers((members) => members.toSpliced(i, 1));
                }}
              >
                <Delete className="w-[24px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  });

  const modalHeader = (
    <div className="w-full flex justify-start">
      <ErrorMessage
        message="Fill all fields, before adding new member."
        className="absolute z-10 inset-x-[14px] p-[10px] top-[46px]"
      />

      <h5 className="max-md:text-[14px]">
        {modalData.header || "Create group"}
      </h5>
    </div>
  );

  const modalBody = (
    <form
      id="app-friends-modal-body"
      className="flex items-center flex-col gap-[14px] p-[14px] w-full"
      ref={formRef}
    >
      <div
        id="app-groups-modal-img-wrapper"
        className="w-full fill-red-300 border-4 border-dashed border-red-300 rounded-1 flex p-[14px] items-center cursor-pointer"
      >
        <div className="w-[40%] ">
          <GroupImgUploadIcon />
        </div>
        <h2 className="flex-1 text-red-300 max-md:text-[16px]">
          Click to upload image
        </h2>
      </div>
      <input
        id="groups-modal-group-name"
        className=""
        type="text"
        placeholder="Group name..."
        defaultValue={modalData.body.name || ""}
      />
      <div
        id="groups-modal-add-members"
        className="w-full flex flex-col gap-[10px]"
      >
        <div className="w-full">
          <div className="flex justify-between items-center w-full">
            <p className="">Group members</p>

            <button
              id={`modal-add-icon`}
              className={`flex justify-center items-center w-[24px] aspect-square`}
              type="button"
              onClick={(e) => {
                // e.preventDefault();
                addMember();

                // on add member, sets the section scroll position to bottom, for UX
                if (modalSectionRef.current.scrollHeight <= 469)
                  setTimeout(() => {
                    console.log();
                    modalSectionRef.current.style.scrollBehavior = "smooth";
                    modalSectionRef.current.scrollTop =
                      modalSectionRef.current.scrollHeight;
                  }, 200);
              }}
            >
              <AddIcon className="fill-red-500 w-[24px] cursor-pointer active:fill-red-300" />
            </button>
          </div>
          <p className="flex sm:text-[12px] text-[10px] w-full mt-[10px] text-p">
            Note : Professional wrestlers and their signature moves.
          </p>
        </div>
      </div>
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
          Groups
        </h1>
        <div className="w-full max-w-[500px] flex items-center relative justify-end">
          <input
            className="rounded-2 p-2 ps-4 md:h-[46px] h-[30px]"
            type="text"
            placeholder="Find group..."
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
            label="Add a group"
            className="bg-red-500 text-white active:bg-red-400 text-nowrap"
            onClick={handleModalClose}
          />
        </div>
      </div>

      <Table
        data={filteredData || data}
        className="sm:mt-[40px] mt-[18px]"
        noDataMessage="No friends available..."
        onRowClick={tableRowClick}
      />

      {closeModal && (
        <Modal
          header={modalHeader}
          body={modalBody}
          footer={modalFooter}
          onBlurAreaClick={handleModalClose}
          ref={modalSectionRef}
        />
      )}
    </div>
  );
}

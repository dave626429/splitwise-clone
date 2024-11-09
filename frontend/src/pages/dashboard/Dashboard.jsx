import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import DirectionArrowIcon from "../../assets/directionarrow.svg?react";
import Modal from "../../components/modal/Modal";
import ChipInput from "../../components/chipInput/ChipInput";
import AddIcon from "../../assets/add.svg?react";
import DeleteIcon from "../../assets/bin.svg?react";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const [closeModal, setCloseModal] = useState(false);

  const [paidBy, setPaidBy] = useState([]);

  const handleModalClose = () => {
    setCloseModal((pre) => !pre);
  };

  const modalHeader = <h5 className="max-md:text-[14px]">Add an Expense</h5>;

  const modalBody = (
    <div className="max-md:text-[14px]">
      <div className="flex justify-between">
        <h6>Paid by : </h6>
        <div
          id={`modal-add-icon`}
          className={`flex justify-center items-center w-[24px] aspect-square`}
        >
          <AddIcon
            className="fill-red-500 w-[24px] cursor-pointer active:fill-red-300"
            onClick={() => {
              setPaidBy((pre) => [...pre, { index: pre.length }]);
            }}
          />
        </div>
      </div>

      {!!paidBy.length && (
        <table className="border rounded overflow-hidden w-full max-md:text-[12px] truncated mt-[5px] shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-[5px] text-left w-full text-[14px]">Name</th>
              <th className="px-[5px] text-right md:min-w-[100px] text-[14px]">
                Amount
              </th>
              {/* dummy placeholder */}
              <th className="px-[5px] text-center"></th>
            </tr>
          </thead>
          <tbody>
            {paidBy.map((x, i) => (
              <tr key={`${uuidv4()}-paidby`}>
                <td className="p-[5px] w-1/2">
                  <input type="text" className="" placeholder="name..." />
                </td>
                <td className="p-[5px] text-right">
                  <input
                    type="text"
                    className="text-right"
                    placeholder="amount..."
                  />
                </td>
                <td className="p-[5px] text-center">
                  <div
                    id="modal-bin-icon"
                    className="flex justify-center items-center w-[24px] h-[24px]"
                  >
                    <DeleteIcon
                      className="fill-red-500 w-[20px] h-[20px] cursor-pointer active:fill-red-300"
                      onClick={() => {
                        setPaidBy((pre) => pre.filter((x, j) => j !== i));
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h6 className="mt-[10px]">Shared with : </h6>
      <div className="flex gap-[5px] mt-[5px]">
        <ChipInput />
      </div>
    </div>
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
      />
    </>
  );

  // useEffect(() => {
  //   return () => {
  //     console.log("I am unmounted");
  //     setPaidBy([]);
  //   };
  // }, []);

  return (
    <div id="app-dashboard-page" className="w-full sm:p-[40px] p-[18px]">
      {/* dashboard header */}
      <div className="flex justify-between flex-wrap gap-[20px]">
        <h1 className="flex items-center text-b-1 max-md:text-[16px]">
          Dashboard
        </h1>
        <div className="flex items-center gap-[20px]">
          <Button
            label="Add Expenses"
            className="bg-white drop-shadow-1 text-red-500"
            onClick={handleModalClose}
          />
          <Button
            label="Settle"
            className="bg-red-500 text-white active:bg-red-400"
          />
        </div>
      </div>
      {/* expense-summary */}
      <div
        id="expense-summary"
        className="flex bg-yellow-500 max-w-[500px] m-auto rounded-2 p-[3px] mt-[20px]"
      >
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="max-md:text-[12px]">Total</p>
          <p className="text-center">+ &#x20B9;251</p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center border-x-[1px]">
          <p className="max-md:text-[12px]">To give</p>
          <p className="text-center">+ &#x20B9;251</p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="max-md:text-[12px] truncate">Take from</p>
          <p className="text-center">+ &#x20B9;251</p>
        </div>
      </div>

      <table className="w-full bg-white border border-gray-200 mt-[20px]">
        <thead className="bg-gray-100">
          <tr className="w-full">
            <th className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              To give
            </th>
            <th className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              {/* Empty space for alignment */}
            </th>
            <th className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              Take from
            </th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="w-full">
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              x
            </td>
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              z
            </td>
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              y
            </td>
          </tr>
          <tr className="w-full">
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              x
            </td>
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              <div className="flex justify-center">
                <DirectionArrowIcon className="w-[24px] h-[24px] stroke-green-500 rotate-180	" />
              </div>
            </td>
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              y
            </td>
          </tr>
          <tr className="w-full">
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              x
            </td>
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              <div className="flex justify-center">
                <DirectionArrowIcon className="w-[24px] h-[24px] stroke-red-500" />
              </div>
            </td>
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              y
            </td>
          </tr>
          <tr className="w-full">
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              x
            </td>
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              z
            </td>
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              y
            </td>
          </tr>
          <tr className="w-full">
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              x
            </td>
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              z
            </td>
            <td className="w-1/3 px-4 py-2 text-center text-gray-600 font-medium border-b uppercase max-md:text-[12px]">
              y
            </td>
          </tr>
        </tbody>
      </table>
      {closeModal && (
        <Modal header={modalHeader} body={modalBody} footer={modalFooter} />
      )}
    </div>
  );
}

import React, { memo } from "react";
import { generateElementKey } from "../../ultils/generateUUID";

function Table(props) {
  const { data, className, noDataMessage, onRowClick, ...rest } = props;

  return (
    <>
      {data.length ? (
        <div
          className={`w-full relative overflow-auto h-[80%] drop-shadow-md rounded-2 border-[1px] ${className}`}
        >
          <table
            className={`md:text-[16px] text-[12px] absolute text-nowrap w-full text-left`}
            {...rest}
          >
            <thead className="backdrop-blur-xl bg-white sticky top-0">
              <tr>
                {Object.keys(data[0]).map(
                  (columnName, i) =>
                    columnName !== "id" && (
                      <th key={generateElementKey(i)} className="p-[10px]">
                        <p>{columnName}</p>
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr
                  key={generateElementKey(i)}
                  className="hover:bg-slate-200 cursor-pointer"
                  onClick={() => onRowClick(item, i)}
                >
                  {Object.keys(data[0]).map(
                    (key, i) =>
                      key !== "id" && (
                        <td key={generateElementKey(i)} className="p-[10px]">
                          <p>{item[key]}</p>
                        </td>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full mt-[40px] h-full max-h-[80%] drop-shadow-md rounded-2 border-[1px] flex items-center justify-center">
          <h3 className="">{noDataMessage}</h3>
        </div>
      )}
    </>
  );
}

export default memo(Table);

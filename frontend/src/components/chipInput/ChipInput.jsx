import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ChipInput() {
  const inputRef = useRef(null);

  const [chips, setChips] = useState([]);

  const [names] = useState([
    { id: 1, name: "Morgan" },
    { id: 2, name: "Alex" },
    { id: 3, name: "Jordan" },
    { id: 4, name: "Charlie" },
    { id: 5, name: "Quinn" },
    { id: 6, name: "Cameron" },
    { id: 7, name: "Taylor" },
    { id: 8, name: "Avery" },
    { id: 9, name: "Riley" },
    { id: 10, name: "Harper" },
    { id: 11, name: "Adam" },
    { id: 12, name: "Aaron" },
    { id: 13, name: "Amelia" },
    { id: 14, name: "Andrew" },
    { id: 15, name: "Abigail" },
    { id: 16, name: "Anthony" },
    { id: 17, name: "Aiden" },
    { id: 18, name: "Alicia" },
    { id: 19, name: "Arthur" },
    { id: 20, name: "Alyssa" },
    { id: 21, name: "Arianna" },
    { id: 22, name: "Ashley" },
    { id: 23, name: "Alfred" },
    { id: 24, name: "Alana" },
    { id: 25, name: "Adrian" },
  ]);

  const [input, setInput] = useState("");

  // Handle chip removal
  const handleRemoveChip = (chipToRemove) => {
    setChips(chips.filter((chip) => chip !== chipToRemove));
  };

  // Handle adding a name as a chip
  const handleAddChip = (name) => {
    if (!chips.includes(name)) {
      setChips((prevChips) => [...prevChips, name]);
    }
    setInput("");
  };

  useEffect(() => {
    if (chips.length) inputRef.current.focus();
  }, [chips]);

  return (
    <div className="text-[12px] w-full relative">
      {/* input with chips */}
      <div
        className="border p-[5px] flex gap-[5px] flex-wrap rounded overflow-hidden overflow-y-auto max-h-[75px] min-h-[40px]"
        onClick={() => {
          inputRef.current.style.display = "inline";
          inputRef.current.focus();
        }}
      >
        {/* chip */}
        <div id="chip-area" className={`flex flex-wrap gap-[5px] w-full`}>
          {chips.map((chip, index) => (
            <div
              key={`chip-${uuidv4()}`}
              className={`flex px-[5px] items-center bg-blue-200 rounded ${
                chips?.length ? "" : "hidden"
              }`}
            >
              {chip}
              <span
                className="px-[7px] p-[5px] cursor-pointer "
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveChip(chip);
                  inputRef.current.focus();
                }}
              >
                x
              </span>
            </div>
          ))}

          {/* dropdown */}
          <div className="rounded-t-1 bg-slate-200 absolute w-full -translate-y-[calc(100%+6px)] -translate-x-[6px] max-h-[130px] overflow-hidden overflow-y-auto">
            {names
              .filter(
                ({ name }) =>
                  input && name.toUpperCase().startsWith(input.toUpperCase())
              )
              .map(({ id, name }) => (
                <div
                  key={uuidv4()}
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    handleAddChip(name);
                  }}
                >
                  {name}
                </div>
              ))}
          </div>

          {/* input */}
          <input
            className="p-[5px] outline-none flex-1 min-w-[50px] border-none"
            type="text"
            placeholder="name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setInput("");
              }, [150]);
            }}
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
}

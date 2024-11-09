import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  format,
  addMonths,
  subMonths,
  getMonth,
  getYear,
  set,
  startOfMonth,
  endOfMonth,
  isToday,
} from "date-fns";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [showMonthYearSelector, setShowMonthYearSelector] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth((prevMonth) =>
      direction === "prev" ? subMonths(prevMonth, 1) : addMonths(prevMonth, 1)
    );
  };

  const handleYearMonthChange = (event) => {
    const date = new Date(event.target.value);
    setCurrentMonth(startOfMonth(date));
    setSelectedDate(date);
    setShowMonthYearSelector(false);
  };

  const calendarDays = generateCalendarDays(currentMonth);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {format(selectedDate, "MMM d, yyyy")}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <button onClick={() => handleMonthChange("prev")}>&lt;</button>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setShowMonthYearSelector(!showMonthYearSelector)}
            >
              {format(currentMonth, "MMMM yyyy")}
            </div>
            <button onClick={() => handleMonthChange("next")}>&gt;</button>
          </div>
          {showMonthYearSelector && (
            <div style={{ marginBottom: "10px" }}>
              <input
                type="month"
                value={format(currentMonth, "yyyy-MM")}
                onChange={handleYearMonthChange}
              />
            </div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "5px",
            }}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <div
                key={day}
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  cursor: day ? "pointer" : "default",
                  background: day ? "#f0f0f0" : "transparent",
                  borderRadius: "4px",
                  padding: "5px",
                  color: day && isToday(day) ? "blue" : "black",
                }}
                onClick={() => day && handleDateClick(day)}
              >
                {day ? day.getDate() : ""}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const generateCalendarDays = (currentMonth) => {
  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const days = [];

  for (let i = startOfMonth.getDay(); i > 0; i--) {
    days.push(null);
  }

  for (let day = 1; day <= endOfMonth.getDate(); day++) {
    days.push(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
  }

  return days;
};

export default DatePicker;

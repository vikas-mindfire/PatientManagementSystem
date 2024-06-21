
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  InputGroup,
  InputLeftAddon,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DatePickerField = ({ value, handleDateChange, inputProps={}, label, datePickerProps={} }) => {

  const [showCalender, setShowCalender] = useState();
  const ref = useRef();

  
  useOutsideClick({
    ref: ref,
    handler: () => setShowCalender(false),
  });
  
  const handleChange = (date) => {
    if (handleDateChange) handleDateChange(date)
      setShowCalender(false);
  }


  return (<FormControl isRequired className="relative" ref={ref}>
  <FormLabel>{ label }</FormLabel>
  <InputGroup
    onClick={() => setShowCalender(true)}
    className="cursor-pointer"
  >
    <InputLeftAddon>
      <FaCalendarAlt />
    </InputLeftAddon>
    <Input
      type="date"
      value={value}
      isReadOnly
      { ...inputProps }
    />
  </InputGroup>
  {showCalender && (
    <Box
      className="absolute top-20 right-0 z-[1] flex w-full items-center justify-center"
      as="div"
    >
      <Calendar
        date={new Date()}
        onChange={handleChange}
        { ...datePickerProps }
      />
    </Box>
  )}
</FormControl>)
}

export default DatePickerField;
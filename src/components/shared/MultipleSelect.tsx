import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

type SelectProps = {
  onChange?: (value: string) => void;
};

export default function SelectSmall({ onChange = () => {} }: SelectProps) {
  const [summery, setSummery] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSummery(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Summery</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={summery}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"this-week"}>This week</MenuItem>
        <MenuItem value={"prev-week"}>Prev-week</MenuItem>
      </Select>
    </FormControl>
  );
}

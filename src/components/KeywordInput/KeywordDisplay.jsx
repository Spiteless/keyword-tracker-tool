import { Theme } from "@mui/material/styles";
import {
  TextField,
  Typography,
  Stack,
  Chip,
  Autocomplete,
  Checkbox,
} from "@mui/material";

import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import { useAppState } from "@context/AppContext";

const looksIcons = {
  0: <LooksOneIcon fontSize="small" />,
  1: <LooksTwoIcon fontSize="small" />,
  2: <Looks3Icon fontSize="small" />,
  3: <Looks4Icon fontSize="small" />,
};

const visibilityIcon = <VisibilityOffIcon fontSize="small" />;
const xIcon = <ClearRoundedIcon fontSize="small" />;

export default function KeywordInput({}) {
  const { keywords, setKeywords, getColor } = useAppState();

  const changeHidden = (e, index) => {
    const newKeywords = [...keywords];
    newKeywords[index].hidden = !newKeywords[index].hidden;
    setKeywords(newKeywords);
  };

  const changeGroup = (e, index) => {
    const newKeywords = [...keywords];
    newKeywords[index].group = (newKeywords[index].group + 1) % 4;
    newKeywords[index].color = getColor(newKeywords[index]);
    setKeywords(newKeywords);
  };

  const deleteEntry = (e, index) => {
    const newKeywords = [...keywords];

    if (index > -1) {
      newKeywords.splice(index, 1);
    } else {
      return;
    }
    setKeywords(newKeywords);
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      freeSolo
      id="tags-filled"
      options={keywords}
      getOptionLabel={(option) => option.name}
      value={keywords}
      renderOption={(props, option, { selected }) => (
        <li
          {...props}
          key={option.name}
          sx={{ display: "inline-flex", flexDirection: "column" }}
        >
          <Checkbox
            icon={xIcon}
            checkedIcon={xIcon}
            style={{ marginRight: -4 }}
            onClick={(e) => deleteEntry(e, props["data-option-index"])}
          />
          <Checkbox
            icon={looksIcons[option.group]}
            checkedIcon={looksIcons[option.group]}
            onClick={(e) => changeGroup(e, props["data-option-index"], option)}
            color={option.color}
            style={{ marginRight: -4 }}
            checked={true}
          />
          <Checkbox
            icon={visibilityIcon}
            checkedIcon={visibilityIcon}
            onClick={(e) => changeHidden(e, props["data-option-index"])}
            style={{ marginRight: 16 }}
            checked={option.hidden}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ minWidth: 300 }}
          >
            <Typography>{option.name}</Typography>
          </Stack>
        </li>
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={
              option.count > 0 ? `${option.name}: ${option.count}` : option.name
            }
            {...getTagProps({ index })}
            color={option.count > 0 ? "success" : option.color}
            onClick={(e) => {
              changeGroup(e, index, option);
            }}
            onDelete={(e) => changeHidden(e, index)}
            deleteIcon={visibilityIcon}
            sx={{
              display: option.hidden ? "none" : "flex",
              boxSizing: "border-box",
              borderWidth: 3,
              borderStyle: "solid",
              borderColor: `${option.color}.light`
            }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={`${keywords.filter((k) => k.count > 0).length}/${
            keywords.length
          } used`}
        />
      )}
    />
  );
}

import {
  Dialog,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  DialogContent,
  TextField,
  IconButton,

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useState, useMemo, useEffect, useRef} from "react"
import { getCommands } from "../../const/commands";
import { muiThemeStyles } from "../../../../shared/const/muiThemeStyles";
import { normalizeText } from "../../../../shared/helper-functions/normalizedText/normalizeText";
import {X} from "lucide-react";


export type CommandPalleteComponentProps = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalleteComponent({
  open,
  onClose,
}: CommandPalleteComponentProps) {
  const navigate = useNavigate();

  const commandPalletes = useMemo(
  () => getCommands(navigate),
  [navigate]
);

  const commandRefs =
  useRef<(HTMLDivElement | null)[]>([]);

  const [searchPallete, setSeachPallate] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeachPallate(e.target.value);
    setSelectedIndex(0);
  };

  const searchInput = normalizeText(searchPallete);

 useEffect(() => {
  commandRefs.current[selectedIndex]
    ?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
}, [selectedIndex]);


  const filteredCommandPalletes = useMemo(
  () =>
    commandPalletes
      .map((group) => ({
        ...group,
        commands: group.commands.filter(
          (c) =>
            normalizeText(c.label).includes(searchInput) ||
            normalizeText(c.description).includes(searchInput)
        ),
      }))
      .filter((group) => group.commands.length > 0),
  [commandPalletes, searchInput]
);

  const flatCommands = useMemo(
  () =>
    filteredCommandPalletes.flatMap(
      (group) => group.commands
    ),
  [filteredCommandPalletes]
  );

  useEffect(() => {
  commandRefs.current[selectedIndex]
    ?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
}, [selectedIndex]);

  useEffect(() => {
  if (!open) {
    return;
  }


  const handleKeyDown = (
    e: KeyboardEvent
  ) => {
    

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        Math.min(
          prev + 1,
          flatCommands.length - 1
        )
      );

      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        Math.max(prev - 1, 0)
      );
    

      return;
    }

    if (
      e.key === "Enter" &&
      flatCommands.length > 0
    ) {
      e.preventDefault();

      flatCommands[
        selectedIndex
      ]?.action?.();

      onClose();
      setSelectedIndex(0);
      return;
    };

    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      setSelectedIndex(0);
    }
  };

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, [
  open,
  flatCommands,
  selectedIndex,
  onClose,
]);


let currentIndex = -1;


  return (
   <Dialog
  open={open}
  onClose={onClose}
  fullWidth
  maxWidth="md"
  slotProps={{
    paper: {
      sx: {
        ...muiThemeStyles.card,
        overflow: "hidden",
        maxHeight: "80vh",
      },
    },
  }}
>
  <DialogContent
    sx={{
      p: 0,
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField
        value={searchPallete}
        onChange={handleChange}
        fullWidth
        autoFocus
        autoComplete="off"
        placeholder="Search commands..."
        sx={{
    "& .MuiInputBase-input": {
      color: "var(--text-primary)",
    },

    "& .MuiInputBase-input::placeholder": {
      color: "var(--text-muted)",
      opacity: 1,
    },

    "& .MuiOutlinedInput-root": {
      backgroundColor: "var(--card-bg)",

      "& fieldset": {
        borderColor: "var(--border-color)",
      },

      "&:hover fieldset": {
        borderColor: "var(--primary)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "var(--primary)",
      },
    },
  }}
      />

      <IconButton
        onClick={() => {
          setSeachPallate("");
          setSelectedIndex(0);
          onClose();
        }}
        sx={muiThemeStyles.actionButton}
      >
        <X size={18} />
      </IconButton>
    </Box>

    {filteredCommandPalletes.length === 0 ? (
      <Typography
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...muiThemeStyles.muted,
        }}
      >
        No commands found.
      </Typography>
    ) : (
      <List
        disablePadding
        sx={{
          overflowY: "auto",
          flex: 1,
          py: 1,
        }}
      >
        {filteredCommandPalletes.map((group) => (
          <Box
            key={group.groupTitle}
            sx={{
              mb: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                ...muiThemeStyles.muted,
                px: 2,
                py: 1,
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 700,
              }}
            >
              {group.groupTitle}
            </Typography>

            {group.commands.map((c) => {
              currentIndex++;

              const itemIndex = currentIndex;

              const isSelected =
                currentIndex === selectedIndex;

              return (
                <ListItemButton
                  key={c.label}
                  selected={isSelected}
                  onClick={() => {
                    c.action?.();
                    setSeachPallate("");
                    setSelectedIndex(0);
                    onClose();
                  }}
                  ref={(el) => {
                    commandRefs.current[itemIndex] = el
                  }}
                  sx={{
                    mx: 1,
                    borderRadius: "0.75rem",

                    ...(isSelected && {
                      backgroundColor:
                        "var(--bg-secondary)",
                      border:
                        "1px solid var(--border-color)",
                    }),

                    "&:hover": {
                      backgroundColor:
                        "var(--bg-secondary)",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={muiThemeStyles.heading}
                      >
                        {c.label}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={muiThemeStyles.muted}
                      >
                        {c.description}
                      </Typography>
                    }
                  />
                </ListItemButton>
              );
            })}
          </Box>
        ))}
      </List>
    )}
  </DialogContent>
</Dialog>
  );
}
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import type { Task } from "../../../../shared/types/tasks/tasks";

type DeleteModalComponentProps = {
  task: Pick<Task, "id" | "title">;

  open: boolean;

  onClose: () => void;

  onConfirm: () => void;
};

export default function DeleteModalComponent({
  task,
  open,
  onClose,
  onConfirm,
}: DeleteModalComponentProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            p: 1,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.4rem",
          pb: 1,
        }}
      >
        Delete Task
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography
            sx={{
              color: "text.secondary",
            }}
          >
            Are you sure you want to permanently delete:
          </Typography>

          <Typography
            component="p"
            sx={{
              fontWeight: 600,
              bgcolor: "#f5f5f5",
              p: 1.5,
              borderRadius: 2,
            }}
          >
            {task.title}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

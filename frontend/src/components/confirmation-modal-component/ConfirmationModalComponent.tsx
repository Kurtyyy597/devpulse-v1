import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import "./ConfirmationModalComponent.css";
import type { Session } from "../../../../shared/types/sessions";
import CircularProgress from "@mui/material/CircularProgress";
export type ConfirmationModalComponentProps = {
  session: Session | null;

  open: boolean;

  onClose: () => void;

  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;

  dialogTitleText: string;
  dialogContentText: string;
  confirmButtonText: string;
  confirmButtonColor: "primary" | "error" | "warning";
};

export default function ConfirmationModalComponent({
  session,
  open,
  onClose,
  onConfirm,
  isLoading,
  dialogContentText,
  dialogTitleText,
  confirmButtonText,
  confirmButtonColor,
}: ConfirmationModalComponentProps) {
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
        {dialogTitleText}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography color="text.secondary">{dialogContentText}</Typography>

          <Typography
            component="p"
            sx={{
              fontWeight: 600,
              bgcolor: "#f5f5f5",
              p: 1.5,
              borderRadius: 2,
            }}
          >
            {session?.title}
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
          color={confirmButtonColor}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            confirmButtonText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

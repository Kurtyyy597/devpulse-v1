
import type { CommandGroup} from "../../../shared/types/CommandPellete";
import type { NavigateFunction } from "react-router-dom";

export const getCommands = (
  navigate: NavigateFunction
): CommandGroup[] => [
  {
    groupTitle: "Navigate pages",
    commands: [
      {
        label: "Create sessions",
        description: "Create a new session",
        action: () => navigate("/sessions/create")
      },
      {
        label: "Dashboard",
        description: "Go to dashboard",
        action: () => navigate("/")
      },
      {
        label: "Sessions",
        description: "Go to sessions",
        action: () => navigate("/sessions")
      },
      {
        label: "Trash Bin",
        description: "Go to trash bin",
        action: () => navigate("/sessions/trash")
      }
    ]
  },
  {
    groupTitle: "Keyboard shortcuts",
    commands: [
      {
        label: "shift + n",
        description: "Go to create sessions page. (This will only work if you're in sessions page)"
      },
      {
        label: "shift + a",
        description: "All selected sessions will get archived"
      },
      {
        label: "shift + r",
        description: "All selected sessions will get restored"
      },
      {
        label: "ESC",
        description: "All selected boxes will be cleared"
      },
      {
        label: "shift + f",
        description: "Focus search input"
      }
    ]
  }
];
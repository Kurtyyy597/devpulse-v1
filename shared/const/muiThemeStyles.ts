export const muiThemeStyles = {
  card: {
    bgcolor: "var(--card-bg)",
    border: "1px solid var(--border-color)",
    borderRadius: "1rem",
    boxShadow: "var(--shadow-md)",
  },

  paper: {
    p: 2,
    height: "100%",
    bgcolor: "var(--card-bg)",
    border: "1px solid var(--border-color)",
    borderRadius: "1rem",
    boxShadow: "var(--shadow-sm)",
    transition: "all 0.2s ease",

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "var(--shadow-md)",
    },
  },

  /* ========================================
     TYPOGRAPHY
  ======================================== */

  title: {
    color: "var(--text-primary)",
    fontWeight: 700,
  },

  heading: {
    color: "var(--text-primary)",
    fontWeight: 600,
  },

  body: {
    color: "var(--text-secondary)",
  },

  muted: {
    color: "var(--text-muted)",
  },

  /* ========================================
     CHIPS
  ======================================== */

  statusChip: {
    backgroundColor: "var(--bg-secondary)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-color)",
    fontWeight: 600,
  },

  successChip: {
    backgroundColor: "rgb(34 197 94 / 0.12)",
    color: "var(--success)",
    border: "1px solid rgb(34 197 94 / 0.25)",
    fontWeight: 600,
  },

  warningChip: {
    backgroundColor: "rgb(245 158 11 / 0.12)",
    color: "var(--warning)",
    border: "1px solid rgb(245 158 11 / 0.25)",
    fontWeight: 600,
  },

  /* ========================================
     BUTTONS
  ======================================== */

  archiveButton: {
    borderRadius: "0.75rem",
    borderColor: "var(--warning)",
    color: "var(--warning)",

    "&:hover": {
      borderColor: "var(--warning)",
      backgroundColor: "rgb(245 158 11 / 0.08)",
    },
  },

  deleteButton: {
    borderRadius: "0.75rem",
    backgroundColor: "var(--danger)",

    "&:hover": {
      backgroundColor: "var(--danger)",
      opacity: 0.9,
    },
  },

  /* ========================================
     PROGRESS
  ======================================== */

  progress: {
    mt: 2,
    height: 10,
    borderRadius: 999,
    backgroundColor: "var(--bg-secondary)",

    "& .MuiLinearProgress-bar": {
      backgroundColor: "var(--primary)",
      borderRadius: 999,
    },
  },

  tooltip: {
    backgroundColor: "var(--card-bg)",
    border: "1px solid var(--border-color)",
    borderRadius: "12px",
    color: "var(--text-primary)",
  },

  tooltipLabel: {
    color: "var(--text-primary)",
    fontWeight: 700,
  },

  tooltipItem: {
    color: "var(--primary)",
    fontWeight: 600,
  },
  // Existing styles...

 tableContainer: {
    borderRadius: "1rem",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--card-bg)",
    boxShadow: "var(--shadow-md)",
  },

  tableHeader: {
    backgroundColor: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontWeight: 700,
    textTransform: "uppercase",
    fontSize: "0.85rem",
    borderBottom: "2px solid var(--border-color)",
  },

  tableRow: {
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "var(--bg-secondary)",
    },

    "& td": {
      borderColor: "var(--border-color)",
      color: "var(--text-primary)",
    },
  },

  titleCell: {
    color: "var(--text-primary)",
    fontWeight: 600,
  },

  skillChip: {
    borderColor: "var(--border-color)",
    color: "var(--text-primary)",
    backgroundColor: "var(--bg-secondary)",
  },

  actionButton: {
    color: "var(--text-secondary)",
    transition: "all 0.2s ease",

    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: "var(--bg-secondary)",
    },
  },
};












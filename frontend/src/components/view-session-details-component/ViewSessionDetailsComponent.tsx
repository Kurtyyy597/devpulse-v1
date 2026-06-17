import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { Session } from "../../../../shared/types/sessions";
import { muiThemeStyles } from "../../../../shared/const/muiThemeStyles";
import { Link } from "react-router-dom";
import "./ViewSessionDetailsComponent.css"
type Props = {
  session: Session;
  onArchive: (id: Session["id"]) => void;
  onDelete: (id: Session["id"]) => void;
};

export default function ViewSessionDetailsComponent({
  session,
  onArchive,
  onDelete,
}: Props) {
  const formatDate = (value?: number | string | null) => {
    if (!value) return "N/A";

    return new Date(value).toLocaleString();
  };

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Card sx={muiThemeStyles.card}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 3,
            }}
          >

            <Box>
              <Link to="/sessions" className="close-link">  ← Back to Sessions </Link>
              <Typography variant="h4" sx={muiThemeStyles.title}>
                Title: <strong> {session.title} </strong>
              </Typography>

              
                <Typography sx={muiThemeStyles.heading}>
                  {session.description ? session.description : "No description"}
                </Typography>
             
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                gap: 2,
                justifyContent: "space-between",
              }}
            >
              <Chip
                label={session.status}
                color="primary"
                variant="outlined"
                sx={muiThemeStyles.statusChip}
              />

              {session.activityPercentage !== undefined && (
                <Chip
                  label={`${session.activityPercentage}%`}
                  color="success"
                  variant="outlined"
                  sx={muiThemeStyles.statusChip}
                />
              )}

              <Chip
                label={String(session.mood)}
                color="warning"
                variant="outlined"
                sx={muiThemeStyles.statusChip}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              color="warning"
              onClick={() => onArchive(session.id)}
              sx={muiThemeStyles.archiveButton}
              disabled={session.archivedAt !== null}
            >
              <span style={muiThemeStyles.heading}> {session.archivedAt !== null ? `${session.title} is already archived` : "Archived"} </span>
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={muiThemeStyles.deleteButton}
              onClick={() => onDelete(session.id)}
              disabled={session.deletedAt !== null}
             >
              <span style={muiThemeStyles.heading}>  {session.deletedAt !== null ? `${session.title} is already in trash bin` : "Delete"} </span> 
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Progress */}
      {session.activityPercentage !== undefined && (
        <Card
          sx={{
            bgcolor: "var(--card-bg)",
            border: "1px solid var(--border-color)",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                gap: 2,
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                color="var(--text-primary)"
                sx={muiThemeStyles.progress}
              >
                Progress
              </Typography>

              <Typography color="var(--text-secondary)">
                {session.activityPercentage}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={session.activityPercentage}
              sx={muiThemeStyles.progress}
            />
          </CardContent>
        </Card>
      )}

      {/* Overview */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={muiThemeStyles.paper}>
            <Typography
              variant="body2"
              color="var(--text-muted)"
              sx={muiThemeStyles.body}
            >
              Duration
            </Typography>

            <Typography
              variant="h6"
              color="var(--text-primary)"
              sx={muiThemeStyles.heading}
            >
              {session.duration} mins
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={muiThemeStyles.paper}>
            <Typography
              variant="body2"
              color="var(--text-muted)"
              sx={muiThemeStyles.body}
            >
              Due Date
            </Typography>

            <Typography
              variant="h6"
              color="var(--text-primary)"
              sx={muiThemeStyles.heading}
            >
              {session.dueDate
                ? new Date(session.dueDate).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={muiThemeStyles.paper}>
            <Typography
              variant="body2"
              color="var(--text-muted)"
              sx={muiThemeStyles.body}
            >
              Created
            </Typography>

            <Typography
              variant="h6"
              color="var(--text-primary)"
              sx={muiThemeStyles.heading}
            >
              {formatDate(session.createdAt)}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={muiThemeStyles.paper}>
            <Typography
              variant="body2"
              color="var(--text-muted)"
              sx={muiThemeStyles.body}
            >
              Updated
            </Typography>

            <Typography
              variant="h6"
              color="var(--text-primary)"
              sx={muiThemeStyles.heading}
            >
              {formatDate(session.updatedAt)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Skills */}
      <Card
        sx={{
          bgcolor: "var(--card-bg)",
          border: "1px solid var(--border-color)",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            color="var(--text-primary)"
            sx={muiThemeStyles.heading}
          >
            Skills
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            {session.skills.length > 0 ? (
              session.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={`${skill} • ${skill}`}
                  variant="outlined"
                  sx={muiThemeStyles.statusChip}
                />
              ))
            ) : (
              <Typography color="var(--text-muted)" sx={muiThemeStyles.muted}>
                No skills assigned.
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Productivity */}
      <Card
        sx={{
          bgcolor: "var(--card-bg)",
          border: "1px solid var(--border-color)",
        }}
      >
        <CardContent>
          <Typography variant="h6" color="var(--text-primary)" sx={muiThemeStyles.heading}>
            Productivity
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="body2"
                color="var(--text-muted)"
                sx={muiThemeStyles.body}
              >
                Mood
              </Typography>

              <Typography
                variant="h6"
                color="var(--text-primary)"
                sx={muiThemeStyles.heading}
              >
                {String(session.mood)}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="body2"
                color="var(--text-muted)"
                sx={muiThemeStyles.body}
              >
                Productivity Score
              </Typography>

              <Typography
                variant="h6"
                color="var(--text-primary)"
                sx={muiThemeStyles.heading}
              >
                {session.productivityScore
                  ? String(session.productivityScore)
                  : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card
        sx={{
          bgcolor: "var(--card-bg)",
          border: "1px solid var(--border-color)",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            color="var(--text-primary)"
            sx={muiThemeStyles.heading}
          >
            Activity Timeline
          </Typography>

          {session.activities?.length ? (
            <Stack spacing={2}>
              {session.activities.map((activity) => (
                <Box key={activity.activityId}>
                  <Typography
                    color="var(--text-primary)"
                    sx={muiThemeStyles.muted}
                  >
                    {activity.field}
                  </Typography>

                  <Typography
                    color="var(--text-secondary)"
                    sx={muiThemeStyles.muted}
                  >
                    {activity.from} → {activity.to}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="var(--text-muted)"
                    sx={muiThemeStyles.muted}
                  >
                    {new Date(activity.createdAt).toLocaleString()}
                  </Typography>

                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography color="var(--text-muted)" sx={muiThemeStyles.heading}>
              No activity history found.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card
        sx={{
          bgcolor: "var(--card-bg)",
          border: "1px solid var(--border-color)",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            color="var(--text-primary)"
            sx={muiThemeStyles.heading}
          >
            Session Metadata
          </Typography>

          <Stack spacing={2}>
            <Box>
              <Typography
                variant="body2"
                color="var(--text-muted)"
                sx={muiThemeStyles.body}
              >
                Session ID
              </Typography>

              <Typography color="var(--text-primary)" sx={muiThemeStyles.muted}>
                {session.id}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="var(--text-muted)"
                sx={muiThemeStyles.body}
              >
                Archived At
              </Typography>

              <Typography color="var(--text-primary)" sx={muiThemeStyles.muted}>
                {formatDate(session.archivedAt)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="var(--text-muted)" sx={muiThemeStyles.heading}>
                Deleted At
              </Typography>

              <Typography color="var(--text-primary)" sx={muiThemeStyles.muted}>
                {formatDate(session.deletedAt)}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

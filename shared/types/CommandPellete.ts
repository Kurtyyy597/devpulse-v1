export type Command = {
  label: string;
  description: string;
  action?: () => void;
};

export type CommandGroup = {
  groupTitle: string;
  commands: Command[];
};
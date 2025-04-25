export interface IActionProps<T> {
  entityType: "user" | "room" | "booking" | "other"; // Define entity types
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>, entity: T) => void;
  anchorEl?: null | HTMLElement;
  handleOpenModal?: () => void; // For 'View'
  handleOpenEdit?: () => void;
  handleOpenDelete?: () => void;
  handleMenuClose?: () => void;
  selectedEntity?: T | null;
  entity?: T;
}
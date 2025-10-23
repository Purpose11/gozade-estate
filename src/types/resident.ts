export type AccessType = "Resident" | "Visitor" | "Staff";

export interface Resident {
  id: string;
  name: string;
  houseNumber: string;
  accessType: AccessType;
  lastVisit: string;
}

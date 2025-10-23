import { Resident } from "@/types/resident";

//mock api data
let mockResidents: Resident[] = [
  {
    id: "1",
    name: "Adebayo Fatai",
    houseNumber: "A-101",
    accessType: "Resident",
    lastVisit: new Date("2025-01-15T14:30:00").toISOString(),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    houseNumber: "B-205",
    accessType: "Resident",
    lastVisit: new Date("2025-01-14T09:15:00").toISOString(),
  },
  {
    id: "3",
    name: "Michael Chukwudi",
    houseNumber: "C-310",
    accessType: "Staff",
    lastVisit: new Date("2025-01-15T16:45:00").toISOString(),
  },
  {
    id: "4",
    name: "Lateef Olawale",
    houseNumber: "A-102",
    accessType: "Visitor",
    lastVisit: new Date("2025-01-13T11:20:00").toISOString(),
  },
  {
    id: "5",
    name: "Robert Wilson",
    houseNumber: "D-408",
    accessType: "Resident",
    lastVisit: new Date("2025-01-15T18:00:00").toISOString(),
  },
  {
    id: "6",
    name: "Deborah Smith",
    houseNumber: "B-203",
    accessType: "Visitor",
    lastVisit: new Date("2025-01-12T15:30:00").toISOString(),
  },
  {
    id: "7",
    name: "Abubakar Musa",
    houseNumber: "C-315",
    accessType: "Staff",
    lastVisit: new Date("2025-01-15T08:00:00").toISOString(),
  },
  {
    id: "8",
    name: "Jennifer Davis",
    houseNumber: "A-105",
    accessType: "Resident",
    lastVisit: new Date("2025-01-14T20:15:00").toISOString(),
  },
];


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const residentApi = {
  getAll: async (): Promise<Resident[]> => {
    await delay(300);
    return [...mockResidents];
  },

  getById: async (id: string): Promise<Resident | undefined> => {
    await delay(200);
    return mockResidents.find((r) => r.id === id);
  },

  create: async (resident: Omit<Resident, "id">): Promise<Resident> => {
    await delay(300);
    const newResident: Resident = {
      ...resident,
      id: Date.now().toString(),
    };
    mockResidents.push(newResident);
    return newResident;
  },

  update: async (id: string, updates: Partial<Resident>): Promise<Resident> => {
    await delay(300);
    const index = mockResidents.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error("Resident not found");
    }
    mockResidents[index] = { ...mockResidents[index], ...updates };
    return mockResidents[index];
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    mockResidents = mockResidents.filter((r) => r.id !== id);
  },
};

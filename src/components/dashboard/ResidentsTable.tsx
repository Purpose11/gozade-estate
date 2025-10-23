import { useState } from "react";
import { format } from "date-fns";
import { Resident, AccessType } from "@/types/resident";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2, ArrowUpDown, UserPlus } from "lucide-react";

interface ResidentsTableProps {
  residents: Resident[];
  onEdit: (resident: Resident) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  filter: AccessType | "All";
  onFilterChange: (filter: AccessType | "All") => void;
}

type SortField = "name" | "houseNumber" | "accessType" | "lastVisit";

export const ResidentsTable = ({
  residents,
  onEdit,
  onDelete,
  onAdd,
  filter,
  onFilterChange,
}: ResidentsTableProps) => {
  const [sortField, setSortField] = useState<SortField>("lastVisit");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedResidents = [...residents].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortDirection === "asc" ? 1 : -1;

    if (sortField === "lastVisit") {
      return (new Date(aValue).getTime() - new Date(bValue).getTime()) * modifier;
    }

    return aValue.localeCompare(bValue) * modifier;
  });

  const getAccessTypeBadgeVariant = (type: AccessType) => {
    switch (type) {
      case "Resident":
        return "default";
      case "Visitor":
        return "secondary";
      case "Staff":
        return "outline";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={filter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Resident">Residents</SelectItem>
              <SelectItem value="Visitor">Visitors</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground hidden sm:inline-block">
            {residents.length} {residents.length === 1 ? "entry" : "entries"}
          </span>
        </div>
        <Button onClick={onAdd} className="w-full sm:w-auto">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Resident
        </Button>
      </div>

      {/* Responsive Table Container */}
      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        <div className="min-w-[700px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("name")}
                    className="font-semibold"
                  >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("houseNumber")}
                    className="font-semibold"
                  >
                    House Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("accessType")}
                    className="font-semibold"
                  >
                    Access Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("lastVisit")}
                    className="font-semibold"
                  >
                    Last Visit
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedResidents.map((resident) => (
                <TableRow
                  key={resident.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{resident.name}</TableCell>
                  <TableCell>{resident.houseNumber}</TableCell>
                  <TableCell>
                    <Badge variant={getAccessTypeBadgeVariant(resident.accessType)}>
                      {resident.accessType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(resident.lastVisit), "MMM dd, yyyy HH:mm")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(resident)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(resident.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {sortedResidents.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No residents found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

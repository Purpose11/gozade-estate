import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Resident, AccessType } from "@/types/resident";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const residentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  houseNumber: z.string().min(1, "House number is required"),
  accessType: z.enum(["Resident", "Visitor", "Staff"]),
});

type ResidentFormData = z.infer<typeof residentSchema>;

interface ResidentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ResidentFormData) => void;
  resident?: Resident;
}

export const ResidentModal = ({
  open,
  onClose,
  onSubmit,
  resident,
}: ResidentModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResidentFormData>({
    resolver: zodResolver(residentSchema),
    defaultValues: {
      name: "",
      houseNumber: "",
      accessType: "Resident",
    },
  });

  const accessType = watch("accessType");

  useEffect(() => {
    if (resident) {
      setValue("name", resident.name);
      setValue("houseNumber", resident.houseNumber);
      setValue("accessType", resident.accessType);
    } else {
      reset();
    }
  }, [resident, setValue, reset]);

  const handleFormSubmit = (data: ResidentFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {resident ? "Edit Resident" : "Add New Resident"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} placeholder="Enter Resident Name" />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="houseNumber">House Number</Label>
            <Input
              id="houseNumber"
              {...register("houseNumber")}
              placeholder="e.g. A-101"
            />
            {errors.houseNumber && (
              <p className="text-sm text-destructive">
                {errors.houseNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessType">Access Type</Label>
            <Select
              value={accessType}
              onValueChange={(value) =>
                setValue("accessType", value as AccessType)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select access type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Resident">Resident</SelectItem>
                <SelectItem value="Visitor">Visitor</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>
            {errors.accessType && (
              <p className="text-sm text-destructive">
                {errors.accessType.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {resident ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { ResidentsTable } from "@/components/dashboard/ResidentsTable";
import { ResidentModal } from "@/components/dashboard/ResidentModal";
import { Resident, AccessType } from "@/types/resident";
import { residentApi } from "@/lib/mockApi";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarContent } from "@/components/dashboard/Sidebar";


const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [filteredResidents, setFilteredResidents] = useState<Resident[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<AccessType | "All">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState<Resident | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadResidents();
  }, []);

  useEffect(() => {
    let filtered = residents;
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.houseNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter !== "All") filtered = filtered.filter((r) => r.accessType === filter);
    setFilteredResidents(filtered);
  }, [residents, searchQuery, filter]);

  const loadResidents = async () => {
    try {
      const data = await residentApi.getAll();
      setResidents(data);
    } catch {
      toast.error("Failed to load residents");
    }
  };

  const handleAdd = () => {
    setSelectedResident(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (resident: Resident) => {
    setSelectedResident(resident);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await residentApi.delete(id);
      toast.success("Resident deleted successfully");
      loadResidents();
    } catch {
      toast.error("Failed to delete resident");
    }
  };

  const handleSubmit = async (data: Omit<Resident, "id" | "lastVisit">) => {
    try {
      if (selectedResident) {
        await residentApi.update(selectedResident.id, data);
        toast.success("Resident updated successfully");
      } else {
        await residentApi.create({
          ...data,
          lastVisit: new Date().toISOString(),
        });
        toast.success("Resident added successfully");
      }
      setIsModalOpen(false);
      loadResidents();
    } catch {
      toast.error("Failed to save resident");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <motion.div
      className="flex h-screen w-full bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar for desktop */}
      <motion.div
        className="hidden md:block w-64 flex-shrink-0"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Sidebar />
      </motion.div>

      {/* Sidebar Drawer for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="relative w-64 bg-sidebar border-r border-sidebar-border"
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <SidebarContent logout={logout}/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center justify-between px-4 border-b border-border bg-card h-16"
        >
          <div className="flex items-center gap-2">
            {/* Menu Button for mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold md:hidden">Dashboard</h1>
          </div>
          <div className="flex-1">
            <Topbar onSearchChange={setSearchQuery} />
          </div>
        </motion.div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Residents Management
              </h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Manage access for residents, visitors, and staff
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <ResidentsTable
                residents={filteredResidents}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
                filter={filter}
                onFilterChange={setFilter}
              />
            </motion.div>
          </div>
        </main>
      </div>

      <ResidentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        resident={selectedResident}
      />
    </motion.div>
  );
};

export default Dashboard;

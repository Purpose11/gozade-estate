import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { Menu } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion, AnimatePresence} from "framer-motion";
import { Building2, Bell, User, Shield, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { SidebarContent } from "@/components/dashboard/Sidebar";


const Settings = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const [profileData, setProfileData] = useState({
    name: "Admin",
    email: "admin@gozadeestate.com",
    phone: "+2348087858857",
  });

  const [estateData, setEstateData] = useState({
    estateName: "Gozade Estate",
    address: "12 Gozade Estate Road",
    maxResidents: "500",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newResidentAlert: true,
    accessAlert: true,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false); 
  

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleProfileUpdate = () => toast.success("Profile updated successfully");
  const handleEstateUpdate = () => toast.success("Estate settings updated successfully");
  const handleNotificationUpdate = () => toast.success("Notification preferences updated");

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
      

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
               <Topbar onSearchChange={ () => {}} />
             </div>
           </motion.div>

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-10">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Settings
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Manage your account and application preferences
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <TabsTrigger value="profile" className="flex items-center gap-2 text-xs sm:text-sm">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="estate" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Building2 className="w-4 h-4" />
                  Estate
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Bell className="w-4 h-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Palette className="w-4 h-4" />
                  Appearance
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({ ...profileData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({ ...profileData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Shield className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <Button onClick={handleProfileUpdate} className="w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Estate Tab */}
              <TabsContent value="estate">
                <Card>
                  <CardHeader>
                    <CardTitle>Estate Settings</CardTitle>
                    <CardDescription>Configure your estate information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="estateName">Estate Name</Label>
                      <Input
                        id="estateName"
                        value={estateData.estateName}
                        onChange={(e) =>
                          setEstateData({ ...estateData, estateName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={estateData.address}
                        onChange={(e) =>
                          setEstateData({ ...estateData, address: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxResidents">Maximum Residents</Label>
                      <Input
                        id="maxResidents"
                        type="number"
                        value={estateData.maxResidents}
                        onChange={(e) =>
                          setEstateData({ ...estateData, maxResidents: e.target.value })
                        }
                      />
                    </div>
                    <Button onClick={handleEstateUpdate} className="w-full sm:w-auto">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        label: "Email Notifications",
                        desc: "Receive updates via email",
                        key: "emailNotifications",
                      },
                      {
                        label: "SMS Notifications",
                        desc: "Receive alerts via text message",
                        key: "smsNotifications",
                      },
                      {
                        label: "New Resident Alert",
                        desc: "Get notified when new residents are added",
                        key: "newResidentAlert",
                      },
                      {
                        label: "Access Alert",
                        desc: "Notify on unauthorized access attempts",
                        key: "accessAlert",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div>
                          <Label>{item.label}</Label>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              [item.key]: checked,
                            })
                          }
                        />
                      </div>
                    ))}
                    <Button
                      onClick={handleNotificationUpdate}
                      className="w-full sm:w-auto"
                    >
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how the application looks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {["light", "dark", "system"].map((mode) => (
                          <Button
                            key={mode}
                            variant={theme === mode ? "default" : "outline"}
                            onClick={() => setTheme(mode)}
                            className="w-full capitalize"
                          >
                            {mode}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Display Density</Label>
                      <p className="text-sm text-muted-foreground">
                        Adjust spacing and element sizing
                      </p>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <Button variant="outline" className="w-full">
                          Comfortable
                        </Button>
                        <Button variant="outline" className="w-full">
                          Compact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default Settings;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Building2, Bell, User, Shield, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocation } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleProfileUpdate = () => {
    toast.success("Profile updated successfully");
  };

  const handleEstateUpdate = () => {
    toast.success("Estate settings updated successfully");
  };

  const handleNotificationUpdate = () => {
    toast.success("Notification preferences updated");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <motion.div
      className="flex h-screen w-full bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-64 flex-shrink-0"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Sidebar />
      </motion.div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Topbar onSearchChange={() => {}} />
        </motion.div>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">
                Manage your account and application preferences
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="estate" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Estate
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Appearance
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>
                        Update your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Shield className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <Button onClick={handleProfileUpdate} className="w-full">
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="estate">
                  <Card>
                    <CardHeader>
                      <CardTitle>Estate Settings</CardTitle>
                      <CardDescription>
                        Configure your estate information
                      </CardDescription>
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
                      <Button onClick={handleEstateUpdate} className="w-full">
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Choose how you want to be notified
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates via email
                          </p>
                        </div>
                        <Switch
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, emailNotifications: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts via text message
                          </p>
                        </div>
                        <Switch
                          checked={notifications.smsNotifications}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, smsNotifications: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Resident Alert</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when new residents are added
                          </p>
                        </div>
                        <Switch
                          checked={notifications.newResidentAlert}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, newResidentAlert: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Access Alert</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify on unauthorized access attempts
                          </p>
                        </div>
                        <Switch
                          checked={notifications.accessAlert}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, accessAlert: checked })
                          }
                        />
                      </div>
                      <Button onClick={handleNotificationUpdate} className="w-full">
                        Save Preferences
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

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
                          <Button
                            variant={theme === "light" ? "default" : "outline"}
                            onClick={() => setTheme("light")}
                            className="w-full"
                          >
                            Light
                          </Button>
                          <Button
                            variant={theme === "dark" ? "default" : "outline"}
                            onClick={() => setTheme("dark")}
                            className="w-full"
                          >
                            Dark
                          </Button>
                          <Button
                            variant={theme === "system" ? "default" : "outline"}
                            onClick={() => setTheme("system")}
                            className="w-full"
                          >
                            System
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Display Density</Label>
                        <p className="text-sm text-muted-foreground">
                          Adjust the spacing and sizing of interface elements
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
            </motion.div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default Settings;

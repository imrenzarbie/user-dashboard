import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router";

export const RootLayout = () => {
    return (
        <div className="flex h-screen flex-col">
            {/* Sticky Navbar */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
                <div className="flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold">
                            User Management
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                            Sign out
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <main className="flex flex-1 overflow-hidden">
                    <ScrollArea className="h-full w-full">
                        <Outlet />
                    </ScrollArea>
                </main>
            </div>
        </div>
    );
};

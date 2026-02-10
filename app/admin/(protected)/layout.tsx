"use client";

import { getIKAuthenticationParameters } from "@/app/actions/imagekit.actions";
import { Sidebar } from "@/components/admin/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { ImageKitProvider } from "imagekitio-next";

const layout = ({ children }: { children: React.ReactNode }) => {
  const authenticator = async () => {
    const auth = await getIKAuthenticationParameters();
    if (!auth) throw new Error("Authentication failed");
    return {
      signature: auth.signature,
      expire: auth.expire,
      token: auth.token,
    };
  };

  return (
    <ImageKitProvider
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <SidebarProvider>
        <div className="flex h-screen bg-background">
          <Sidebar />

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ImageKitProvider>
  );
};

export default layout;

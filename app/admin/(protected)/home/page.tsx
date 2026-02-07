import { getHomeSettings } from "@/app/actions/home.actions";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeSettingsForm from "@/components/admin/HomeSettingsForm";

const page = async () => {
  const { success, data } = await getHomeSettings();

  // 1. Handle Critical Error (Database down, Network error)
  if (!success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Failed to load settings
        </h2>
        <p className="text-slate-500 max-w-xs mb-6 text-sm">
          {"We encountered a problem while connecting to the database."}
        </p>
        <Link href="/admin/settings/home">
          <Button variant="outline" className="gap-2">
            <RefreshCcw size={16} /> Try Reconnecting
          </Button>
        </Link>
      </div>
    );
  }

  // 2. Success state (data will be typed via HomeSettingsValues)
  return <HomeSettingsForm initialData={data} />;
};

export default page;

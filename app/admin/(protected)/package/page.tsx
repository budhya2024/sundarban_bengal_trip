import { SidebarTrigger } from "@/components/admin/SidebarTrigger";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getPackages } from "../../../actions/package.actions";
import { Button } from "@/components/ui/button";
import { PackageRow } from "@/components/admin/PackageRow";

export default async function PackageListingPage() {
  const { success, data: packages } = await getPackages();

  if (!success) return <div className="p-10">Failed to load packages.</div>;

  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-bold text-slate-800">
              Tour Packages
            </h1>
            <p className="text-[11px] text-slate-500">
              Create and curate your Sundarban travel packages
            </p>
          </div>
        </div>
        <Button
          asChild
          className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg h-9 shadow-sm"
        >
          <Link href="/admin/package/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Package
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="text-[11px] uppercase font-bold tracking-wider text-slate-400 py-4 px-8 w-[45%]">
                  Package
                </TableHead>
                <TableHead className="text-[11px] uppercase font-bold tracking-wider text-slate-400 py-4">
                  Price
                </TableHead>
                <TableHead className="text-[11px] uppercase font-bold tracking-wider text-slate-400 py-4">
                  Status
                </TableHead>
                <TableHead className="text-[11px] uppercase font-bold tracking-wider text-slate-400 py-4 text-right px-8">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <PackageRow key={pkg.id} pkg={pkg} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

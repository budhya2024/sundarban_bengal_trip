import { Plus } from "lucide-react";
import Link from "next/link";
import { getAllBlogs } from "../../actions/blogs.actions";
import BlogRows from "@/components/admin/BlogRows";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/admin/SidebarTrigger";

export default async function BlogList() {
  const result = await getAllBlogs();

  if (!result.success) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          <strong>Error:</strong> {result.message}. Please try refreshing.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur-md px-4 py-3 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Manage Blogs
              </h1>
              <p className="hidden text-xs text-slate-500 md:block">
                Create, edit, and curate your Sundarban travel stories
              </p>
            </div>
          </div>
          <Link href="/admin/blogs/new">
            <Button className="bg-emerald-700 hover:bg-emerald-800 h-10 px-6 shadow-sm transition-all active:scale-95">
              <Plus className="mr-2 h-4 w-4" /> Add New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-6">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Post
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <BlogRows blogs={result.data || []} />
          </tbody>
        </table>
      </div>

      {/* Pagination Footer (Same as before) */}
      <div className="flex items-center justify-between p-6 border-t border-gray-100">
        {/* ... (Footer content remains unchanged) */}
      </div>
    </div>
  );
}

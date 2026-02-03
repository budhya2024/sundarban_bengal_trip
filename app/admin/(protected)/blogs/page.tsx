import { Plus } from "lucide-react";
import Link from "next/link";
import { getAllBlogs } from "../../actions/blogs.actions";
import BlogRows from "@/components/admin/BlogRows";

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">
            Manage Blogs
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your travel articles
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 bg-[#4a6741] hover:bg-[#3a5233] text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add New Post
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
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

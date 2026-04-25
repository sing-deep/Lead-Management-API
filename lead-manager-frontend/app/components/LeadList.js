"use client";

export default function LeadList({ leads }) {
  return (
    <div className="text-[#282828]">
      <h2 className="font-semibold text-lg mb-3">All Leads</h2>

      <div className="p-5 border border-[#e4e4e4] rounded-2xl shadow-sm bg-white overflow-x-auto">
        <table className="w-full border-collapse">
          
          {/* Table Head */}
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b border-[#e4e4e4]">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Status</th>
              <th className="py-2">Created At</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-b border-[#e4e4e4] last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-3 font-medium">{lead.name}</td>
                <td className="py-3">{lead.email}</td>

                {/* Status Badge */}
                <td className="py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                    {lead.status}
                  </span>
                </td>

                {/* Created At */}
                <td className="py-3 text-sm text-gray-500">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {leads.length === 0 && (
          <p className="text-center text-gray-500 py-5">
            No leads found
          </p>
        )}
      </div>
    </div>
  );
}
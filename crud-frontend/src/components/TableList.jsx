export default function TableList({ clients = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto mt-10 px-8">
      <table className="table table-hover w-full bg-base-200 rounded-box shadow">
        <thead>
          <tr className="text-base text-primary">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Rate ($/hr)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id} className="hover">
              <th>{index + 1}</th>
              <td className="font-semibold">{client.name}</td>
              <td>{client.email}</td>
              <td>{client.job}</td>
              <td>${client.rate}</td>
              <td>
                <button
                  className={`btn btn-xs rounded-full ${
                    client.isactive ? "btn-primary" : "btn-outline btn-secondary"
                  }`}
                >
                  {client.isactive ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-outline btn-info"
                  onClick={() => onEdit && onEdit(client)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => onDelete && onDelete(client.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {clients.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-400">
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
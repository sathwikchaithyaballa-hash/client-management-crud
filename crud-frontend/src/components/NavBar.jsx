
export default function NavBar({ onOpen, onSearch }) {
  return (
    <div className="navbar bg-base-300 p-4 shadow-lg flex justify-between items-center">
      <a className="btn btn-ghost text-2xl font-bold">Clients</a>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-48 md:w-64"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={onOpen}>
          Add Client
        </button>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";

const API_BASE_URL = "http://localhost:5000/api/clients";

export default function App() {
  const [clients, setClients] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchClients = async (query = "") => {
    try {
      const url = query ? `${API_BASE_URL}?q=${encodeURIComponent(query)}` : API_BASE_URL;
      const res = await axios.get(url);
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  useEffect(() => {
    fetchClients(searchTerm);
  }, [searchTerm]);

  const handleOpenAdd = () => {
    setSelectedClient(null);
    setModalMode("add");
    setIsOpen(true);
  };

  const handleOpenEdit = (client) => {
    setSelectedClient(client);
    setModalMode("edit");
    setIsOpen(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (modalMode === "edit") {
        const res = await axios.put(`${API_BASE_URL}/${selectedClient.id}`, data);
        setClients((prev) =>
          prev.map((c) => (c.id === selectedClient.id ? res.data : c))
        );
      } else {
        const res = await axios.post(API_BASE_URL, data);
        setClients((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Error submitting client data:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting client:", err);
    }
  };

  return (
    <div data-theme="night" className="min-h-screen bg-base-100 text-base-content pb-10">
      <NavBar onOpen={handleOpenAdd} onSearch={setSearchTerm} />

      <div className="container mx-auto">
        <TableList
          clients={clients}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </div>

      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        clientData={selectedClient}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
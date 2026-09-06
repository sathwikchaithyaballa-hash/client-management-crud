import { useState, useEffect } from "react";

export default function ModalForm({ isOpen, onClose, mode, onSubmit, clientData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [rate, setRate] = useState("");
  const [isactive, setIsactive] = useState(false);

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setIsactive(clientData.isactive);
    } else {
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setIsactive(false);
    }
  }, [mode, clientData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      job,
      rate: Number(rate),
      isactive,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {mode === "edit" ? "Edit Client" : "Client Details"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Job"
            className="input input-bordered w-full"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Rate"
            className="input input-bordered w-full"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />

          <label className="cursor-pointer label justify-start gap-4">
            <span className="label-text">Status</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={isactive}
              onChange={(e) => setIsactive(e.target.checked)}
            />
          </label>

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === "edit" ? "Save Changes" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { db } from "../db.js";

// GET ALL CLIENTS / SEARCH
export const getClients = async (req, res) => {
  try {
    const { q } = req.query;
    let queryText = "SELECT * FROM clients_tb ORDER BY id ASC";
    let values = [];

    if (q) {
      queryText = `
        SELECT * FROM clients_tb 
        WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1 
        ORDER BY id ASC
      `;
      values = [`%${q}%`];
    }

    const { rows } = await db.query(queryText, values);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE CLIENT
export const createClient = async (req, res) => {
  try {
    const { name, email, job, rate, isactive } = req.body;
    const { rows } = await db.query(
      `INSERT INTO clients_tb (name, email, job, rate, isactive) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, job, rate, isactive]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE CLIENT
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, job, rate, isactive } = req.body;
    const { rows } = await db.query(
      `UPDATE clients_tb 
       SET name = $1, email = $2, job = $3, rate = $4, isactive = $5 
       WHERE id = $6 RETURNING *`,
      [name, email, job, rate, isactive, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE CLIENT
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query(
      "DELETE FROM clients_tb WHERE id = $1",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
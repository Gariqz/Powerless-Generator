import mysql from 'mysql2/promise';

/**
 * Wasmer Edge MySQL Integration
 * Ensure you have your DATABASE_URL or specific connection variables 
 * set in your Wasmer App secrets.
 */
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL, // e.g., mysql://user:pass@host:port/dbname
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function ensureTable() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS powerless_results (
        id INT AUTO_VALUE_ON_ZERO PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE,
        percentage INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } finally {
    connection.release();
  }
}

export async function getPowerless(name: string): Promise<number | null> {
  const normalized = name.toLowerCase().trim();
  await ensureTable();
  
  const [rows]: any = await pool.execute(
    'SELECT percentage FROM powerless_results WHERE name = ?',
    [normalized]
  );
  
  if (rows.length > 0) {
    return rows[0].percentage;
  }
  return null;
}

export async function savePowerless(name: string, percentage: number): Promise<void> {
  const normalized = name.toLowerCase().trim();
  await ensureTable();
  
  await pool.execute(
    'INSERT INTO powerless_results (name, percentage) VALUES (?, ?) ON DUPLICATE KEY UPDATE percentage = ?',
    [normalized, percentage, percentage]
  );
}

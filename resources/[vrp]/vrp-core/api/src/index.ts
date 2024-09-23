import express from 'express';
import cors from 'cors';
import { MdtApi } from './controlers/mdt/main';
import { FinancialsApi } from './controlers/financials';
export const app = express();
const port = 80;

//Examples

// const [rows, fields] = await db.query('SELECT * FROM your_table'); // Replace 'your_table' with your actual table name
//     res.json(rows);

// const [result] = await db.query('INSERT INTO your_table (column1, column2) VALUES (?, ?)', [column1, column2]);
// res.status(201).json({ id: result.insertId, column1, column2 });

// const [result] = await db.query('DELETE FROM your_table WHERE id = ?', [id]);
//     if (result.affectedRows > 0) {
//       res.status(200).send(`Record with id ${id} deleted`);
//     } else {
//       res.status(404).send('Record not found');
//     }

app.use(cors());
app.use(express.json());
app.use(MdtApi)
app.use(FinancialsApi)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

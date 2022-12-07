import { pool } from '../db.js';

export const ping = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT "CONNECTED to DB" as result');
        res.json(result[0]);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

export const getInvernaderos = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM invs_data');
    res.json(rows);
}

export const getDataByUserId = async (req,res) => {
    try {
        const { user_id } = req.params;
        const [rows] = await pool.query('SELECT * FROM invs_data WHERE user_id = ?', [user_id]);
        
        if (rows.length <= 0 ) {
            return res.status(404).json({message: "User Not found or has no data"});
        }

        res.json(rows);

    } catch(err) {
        res.status(500).json({message: err.message});
    }

} 

export const getDataByIdAndinv = async (req,res) => {
    try {
        const { user_id, inv } = req.params;
        const [rows] = await pool.query('SELECT * FROM invs_data WHERE user_id = ? && inv = ?', [user_id, inv]);
        
        if (rows.length <= 0 ) {
            return res.status(404).json({message: "User Not found or Inv has no data"});
        }

        res.json(rows);

    } catch(err) {
        res.status(500).json({message: err.message});
    }

} 

export const getDataByMins = async (req,res) => {
    try {
        const { user_id, inv, mins } = req.params;

        const [rows] = await pool.query('SELECT * FROM invs_data WHERE user_id = ? && inv = ? && measured_at >= NOW() - INTERVAL ? MINUTE', [user_id, inv, mins]);
        
        if (rows.length <= 0 ) {
            return res.status(404).json({message: "User Not found or Inv has no data"});
        }

        res.json(rows);

    } catch(err) {
        res.status(500).json({message: err.message});
    }

} 


export const postInvernaderos = async (req, res) => {
    try {
        const {
            temp,
            hum,
            ldr,
            lum,
            shum,
            pH,
            inv,
        } = req.body;

        const newData = {
            temp,
            hum,
            ldr,
            lum,
            shum,
            pH,
            inv,
            user_id: 1 //req.user[0].id
        }

        const [result] = await pool.query('INSERT INTO invs_data set ?' , [newData]);
        res.json(result);

    } catch(err) {
        return res.status(500).json({message: "Somenthing went wrong", error: err.message});
    }

    
}
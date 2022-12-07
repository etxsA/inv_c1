import { query } from 'express';
import { pool } from '../db.js';


// "/"
export const index = (req, res) => {
    res.render('index');
};

export const profile = async (req, res) => {
    const [ rows ]= await pool.query("SELECT * FROM users WHERE id = ?", [req.user[0].id]);

    res.render('profile', rows[0]);
}

// "/monitor"
export const monitor = async (req, res) => {
    try {
        // Rendering Page
        const params = await renderParams(req);
        res.render('monitor', params);
    } catch (err) {
        return res.status(500).json({message: "Somenthing went wrong", error: err.message});
    }

    
};

// "/monitor/indv/"
export const monitorIndv =  async (req, res) => {
    try {
        const params = await renderParams(req);
        res.render('monitorIndv', params);
    } catch (err) { 
        return res.status(500).json({message: "Somenthing went wrong", error: err.message});

    }
};





// Data Query Function
const renderParams= async (req) => {
        const id = req.user[0].id;
        const inv = 'inv1';

        // Selecting chart by data
        const { action } = req.params;
        let rows = {};
        let title = '';
        let title2 = '';
        let labels = [];
        let btnStatus = {btn1: '', btn2: '', btn3: '', btn4: ''};

        if ( action === 'w') {
            // Ultimos 7 Dias
            [rows] = await pool.query('SELECT DAY(measured_at) as unit, CONCAT(DAY(MAX(measured_at)),"/",MONTH(MAX(measured_at))) as Date, AVG(temp) as temp, AVG(hum) as hum, AVG(ldr) as ldr, AVG(lum) as lum, AVG(shum) as shum, AVG(pH) as pH, ANY_VALUE(inv) as inv, MAX(measured_at) as measured_at FROM invs_data WHERE user_id = ? AND inv = ? AND measured_at >= NOW() - INTERVAL 7 DAY GROUP BY unit ORDER BY measured_at ASC;', [id, inv]);
            title = 'Dia';
            title2 = 'Ultimos 7 dias';
            btnStatus.btn1 = 'active';

        } else if (action === 'm') {
            // Ultimos 12 meses
            [rows] = await pool.query('SELECT MONTH(measured_at) as unit, CONCAT(MONTH(MAX(measured_at)),"/",YEAR(MAX(measured_at))) as Date, AVG(temp) as temp, AVG(hum) as hum, AVG(ldr) as ldr, AVG(lum) as lum, AVG(shum) as shum, AVG(pH) as pH, ANY_VALUE(inv) as inv, MAX(measured_at) as measured_at FROM invs_data WHERE user_id = ? AND inv = ? AND measured_at >= NOW() - INTERVAL 12 MONTH GROUP BY unit ORDER BY measured_at ASC;', [id, inv]);
            title = 'Mes';
            title2 = 'Ultimos 12 meses';
            btnStatus.btn2 = 'active';
        } else if ( action == 'h') {
            // Ultimas 24 horas por Horas
            [rows] = await pool.query('SELECT HOUR(measured_at) as hour, TIME(MAX(measured_at)) as Date, AVG(temp) as temp, AVG(hum) as hum, AVG(ldr) as ldr, AVG(lum) as lum, AVG(shum) as shum, AVG(pH) as pH, ANY_VALUE(inv) as inv, MAX(measured_at) as measured_at FROM invs_data WHERE user_id =? AND inv = ? AND measured_at >= NOW() - INTERVAL 24 HOUR GROUP BY hour ORDER BY measured_at ASC', [id, inv]);
            title = 'Ultima Medida';
            title2 = 'Ultimas 24 horas';
            btnStatus.btn3 = 'active';
        } else if (action == 'mn') {
            // Ultimas 24 horas por minutos
            [rows] = await pool.query('SELECT TIME(measured_at) as Date, temp, hum, ldr, lum, shum, pH, ANY_VALUE(inv) as inv, measured_at FROM invs_data WHERE user_id =? AND inv = ? AND measured_at >= NOW() - INTERVAL 24 HOUR ORDER BY measured_at ASC;', [id, inv]);
            title = 'Ultima Medida';
            title2 = 'Ultimas 24 horas Por Minuto';
            btnStatus.btn4 = 'active';

        } else {
            throw Error('Not Defined Monitor Route');
        }
        
        // Preparing Data for Chart JS

        let temp = [];
        let hum = [];
        let ldr = [];
        let lum = [];
        let shum = [];
        let pH =  [];

        rows.forEach(element => {
            labels.push(element.Date.toString());
            temp.push(element.temp);
            hum.push(element.hum);
            ldr.push(element.ldr);
            lum.push(element.lum);
            shum.push(element.shum);
            pH.push(element.pH);
        });

        const renderParams = {rows, title, title2, labels, temp, hum, ldr, lum, shum, pH, btnStatus};

        return renderParams;
};
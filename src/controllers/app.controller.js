import { pool } from '../db.js';

// "/"
export const index = (req, res) => {
    res.render('index');
};

// "/monitor"
export const monitor = async (req, res) => {
    try {
        // Selecting chart by data
        const { action } = req.params;
        let rows = {};
        let title = '';
        let title2 = '';
        let labels = [];
        let btnStatus = {btn1: '', btn2: '', btn3: '', btn4: ''};

        if ( action === 'w') {
            // Ultimos 7 Dias
            [rows] = await pool.query('SELECT DAY(measured_at) as unit, CONCAT(DAY(MAX(measured_at)),"/",MONTH(MAX(measured_at))) as Date, AVG(temp) as temp, AVG(hum) as hum, AVG(lum) as lum, AVG(pH) as pH, ANY_VALUE(inv) as inv, MAX(measured_at) as measured_at FROM invs_data WHERE user_id = ? AND inv = ? AND measured_at >= NOW() - INTERVAL 7 DAY GROUP BY unit ORDER BY measured_at ASC;', [1, 'inv1']);
            title = 'Dia';
            title2 = 'Ultimos 7 dias';
            btnStatus.btn1 = 'active';

        } else if (action === 'm') {
            // Ultimos 12 meses
            [rows] = await pool.query('SELECT MONTH(measured_at) as unit, CONCAT(MONTH(MAX(measured_at)),"/",YEAR(MAX(measured_at))) as Date, AVG(temp) as temp, AVG(hum) as hum, AVG(lum) as lum, AVG(pH) as pH, ANY_VALUE(inv) as inv, MAX(measured_at) as measured_at FROM invs_data WHERE user_id = ? AND inv = ? AND measured_at >= NOW() - INTERVAL 12 MONTH GROUP BY unit ORDER BY measured_at ASC;', [1, 'inv1']);
            title = 'Mes';
            title2 = 'Ultimos 12 meses';
            btnStatus.btn2 = 'active';
        } else if ( action == 'h') {
            // Ultimas 24 horas por Horas
            [rows] = await pool.query('SELECT HOUR(measured_at) as hour, TIME(MAX(measured_at)) as Date, AVG(temp) as temp, AVG(hum) as hum, AVG(lum) as lum, AVG(pH) as pH, ANY_VALUE(inv) as inv, MAX(measured_at) as measured_at FROM invs_data WHERE user_id =? AND inv = ? AND measured_at >= NOW() - INTERVAL 24 HOUR GROUP BY hour ORDER BY measured_at ASC', [1, 'inv1']);
            title = 'Ultima Medida';
            title2 = 'Ultimas 24 horas';
            btnStatus.btn3 = 'active';
        } else if (action == 'mn') {
            // Ultimas 24 horas por minutos
            [rows] = await pool.query('SELECT TIME(measured_at) as Date, temp, hum, lum, pH, ANY_VALUE(inv) as inv, measured_at FROM invs_data WHERE user_id =? AND inv = ? AND measured_at >= NOW() - INTERVAL 24 HOUR ORDER BY measured_at ASC;', [1, 'inv1']);
            title = 'Ultima Medida';
            title2 = 'Ultimas 24 horas Por Minuto';
            btnStatus.btn4 = 'active';

        } else {
            throw Error('Not Defined Monitor Route');
        }
        
        // Preparing Data for Chart JS

        let temp = [];
        let hum = [];
        let lum = [];
        let pH =  [];

        rows.forEach(element => {
            labels.push(element.Date.toString());
            temp.push(element.temp);
            hum.push(element.hum);
            lum.push(element.lum);
            pH.push(element.pH);
        });

        const renderParams = {rows, title, title2, labels, temp, hum, lum, pH, btnStatus};

        // Rendering Page
        res.render('monitor', renderParams);
    } catch (err) {
        return res.status(500).json({message: "Somenthing went wrong", error: err.message});
    }

    
};
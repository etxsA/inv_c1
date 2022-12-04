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

        if ( action === 'w') {
            [rows] = await pool.query('SELECT DAY(measured_at) as unit, CONCAT(DAY(MAX(measured_at)),"/",MONTH(MAX(measured_at))) as Date, AVG(temp) as temp, AVG(hum) as hum, AVG(lum) as lum, AVG(pH) as pH, ANY_VALUE(inv) as inv, MAX(measured_at) as measured_at FROM invs_data WHERE user_id = ? AND inv = ? AND measured_at >= NOW() - INTERVAL 7 DAY GROUP BY unit;', [1, 'inv1']);
            title = 'Dia'
            title2 = 'Ultimos 7 dias'

        } else if (action === 'd') {
            
        } 
        else {
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

        const renderParams = {rows, title, title2, labels, temp, hum, lum, pH};

        // Rendering Page
        res.render('monitor', renderParams);
        console.log(renderParams);

    } catch (err) {
        return res.status(500).json({message: "Somenthing went wrong", error: err.message});
    }

    
}
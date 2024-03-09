import express from "express";
import client from "../DB.js";
import authorize from "../middleware/authorize.js";



const   router = express.Router();

router.get('/get-stats', async (req, res) => {
    try {

        console.log("Getting all stats");

        const monthlyOrders = await client.query(`
        SELECT COUNT(*) AS "Monthly Orders", DATE_TRUNC('month', ORDER_DATE) AS "Month Start Date"
        FROM order_history
        WHERE STATUS = TRUE AND (CURRENT_DATE - ORDER_DATE) <= 30
        GROUP BY DATE_TRUNC('month', ORDER_DATE)
        ORDER BY "Month Start Date" DESC;
        `);

        // console.log(monthlyOrders.rows);



        const weeklyOrders = await client.query(`
        SELECT COUNT(*) AS "WEEKLY ORDERS", DATE_TRUNC('week', ORDER_DATE) AS "Week Start Date"
        FROM order_history
        WHERE
        STATUS = TRUE
        GROUP BY DATE_TRUNC('week', ORDER_DATE)
        ORDER BY "Week Start Date" DESC;
        `);

        // const totalRevenue = await client.query(`
        // SELECT SUM(O.PRICE) AS "Total Revenue"
        // FROM order_history O 
        // WHERE
        // STATUS = TRUE;
        // `);

        const totalMedREvenue = await client.query(`
        SELECT SUM(m.PRICE*I.sold_amount) AS "Total MED Revenue"
        FROM inventory I
        JOIN medicine M ON I.medicine_id = M.medicine_id
        WHERE I.sold_amount != 0;
        `);    
        
        const totalChemRevenue = await client.query(`
        SELECT SUM(C.price * I.sold_amount) AS "Total CHEM Revenue"
        FROM inventory I
        JOIN chemical C ON I.chemical_id = C.chemical_id
        WHERE I.sold_amount != 0;
        `);


        const monthlyRevenue = await client.query(`
        SELECT SUM(PRICE) AS "Monthly Revenue", DATE_TRUNC('month', ORDER_DATE) AS "Month Start Date"
        FROM order_history
        WHERE STATUS = TRUE AND (CURRENT_DATE - ORDER_DATE) <= 30
        GROUP BY DATE_TRUNC('month', ORDER_DATE)
        ORDER BY "Month Start Date" DESC;
        `);

        const weeklyRevenue = await client.query(`
        SELECT SUM(PRICE) AS "Weekly Revenue", DATE_TRUNC('week', ORDER_DATE) AS "Week Start Date"
        FROM order_history
        WHERE STATUS = TRUE AND (CURRENT_DATE - ORDER_DATE) <= 7
        GROUP BY DATE_TRUNC('week', ORDER_DATE)
        ORDER BY "Week Start Date" DESC;
        `);


        const mostOrderingCustomers = await client.query(`
        SELECT customer_name AS "Most ORDERING Customers", COUNT(*) AS "Total Orders"
        FROM order_history O JOIN customer C ON O.user_id = C.customer_id
        WHERE
        STATUS = TRUE
        GROUP BY customer_name
        ORDER BY COUNT(*) DESC;
        `);


        const mostOrderingResearchers = await client.query(`
        SELECT researcher_name AS "Most ORDERING Researchers", COUNT(*) AS "Total Orders"
        FROM order_history O JOIN researcher R ON O.user_id = R.researcher_id
        WHERE
        STATUS = TRUE
        GROUP BY researcher_name
        ORDER BY COUNT(*) DESC;
        `);

        const mostSpendingCustomers = await client.query(`
        SELECT (SELECT CUSTOMER_NAME FROM customer WHERE customer_id = O.user_id) AS "MOST SPENDING CUSTOMERS", SUM(O.price) AS "Spent Amount"
        FROM order_history O
        JOIN cart C ON O.cart_id = C.cart_id
        WHERE (C.customer_id = O.USER_id)
            AND O.status = TRUE
        GROUP BY O.USER_id
        ORDER BY "Spent Amount" DESC;
        `);

        
        const mostSpendingResearchers = await client.query(`
        SELECT (SELECT RESEARCHER_NAME FROM researcher WHERE researcher_id = O.user_id) AS "MOST SPENDING RESEARCHERS", SUM(O.price) AS "Spent Amount"
        FROM order_history O
        JOIN cart C ON O.cart_id = C.cart_id
        WHERE (C.researcher_id = O.USER_id)
            AND O.status = TRUE
        GROUP BY O.USER_id
        ORDER BY "Spent Amount" DESC;
        `);

        const mostActiveCustomers = await client.query(`
        SELECT CUSTOMER_NAME AS "Most Active Customers"
        FROM LOGIN_LOG L JOIN CUSTOMER C ON L.user_id = C.customer_id
        WHERE
        LOGIN_TIME >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY CUSTOMER_NAME
        ORDER BY COUNT(*) DESC;
        `);

        const mostActiveResearchers = await client.query(`
        SELECT RESEARCHER_NAME AS "Most Active Researchers"
        FROM LOGIN_LOG L JOIN RESEARCHER R ON L.user_id = R.researcher_id
        WHERE
        LOGIN_TIME >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY RESEARCHER_NAME
        ORDER BY COUNT(*) DESC;
        `);


        const customersPastMonth = await client.query(`
        SELECT COUNT(*) AS "Monthly Customers"
        FROM LOGIN_LOG L JOIN CUSTOMER C ON L.user_id = C.customer_id
        WHERE
        LOGIN_TIME >= CURRENT_DATE - INTERVAL '30 days';
        `);



        const customersPastWeek = await client.query(`
        SELECT COUNT(*) AS "Weekly Customers"
        FROM LOGIN_LOG L JOIN CUSTOMER C ON L.user_id = C.customer_id
        WHERE
        LOGIN_TIME >= CURRENT_DATE - INTERVAL '7 days';
        `);


        const researchersPastMonth = await client.query(`
        SELECT COUNT(*) AS "Monthly Researchers"
        FROM LOGIN_LOG L JOIN RESEARCHER R ON L.user_id = R.researcher_id
        WHERE
        LOGIN_TIME >= CURRENT_DATE - INTERVAL '30 days';
        `);


        const researchersPastWeek = await client.query(`
        SELECT COUNT(*) AS "Weekly Researchers"
        FROM LOGIN_LOG L JOIN RESEARCHER R ON L.user_id = R.researcher_id
        WHERE
        LOGIN_TIME >= CURRENT_DATE - INTERVAL '7 days';
        `);


        const mostSoldMedicines = await client.query(`
        SELECT (SELECT MED_NAME FROM medicine WHERE medicine_id = I.medicine_id) AS "Most Sold Medicine", sold_amount AS "Total Sold AMOUNT", (SELECT PRICE FROM medicine WHERE medicine_id = I.medicine_id) AS "Price", (SELECT PRICE*sold_amount FROM medicine WHERE medicine_id = i.medicine_id) AS "Total Revenue"
        FROM inventory I
        WHERE
        I.medicine_id IS NOT NULL and sold_amount != 0
        GROUP BY I.medicine_id, sold_amount
        ORDER BY "Total Sold AMOUNT" DESC;
        `);


        const mostSoldChemicals = await client.query(`
        SELECT (SELECT chem_name FROM chemical WHERE chemical_id = I.chemical_id) AS "Most Sold Chemical", sold_amount AS "Total Sold AMOUNT", (SELECT PRICE FROM chemical WHERE chemical_id = I.chemical_id) AS "Price", (SELECT PRICE*sold_amount FROM chemical WHERE chemical_id = I.chemical_id) AS "Total Revenue"
        FROM inventory I
        WHERE
        I.CHEMICAL_ID IS NOT NULL and sold_amount != 0
        GROUP BY I.CHEMICAL_ID, sold_amount
        ORDER BY "Total Sold AMOUNT" DESC;
        `);


        const inStockMedCount = await client.query(`
        SELECT COUNT(*) AS "IN STOCK MEDS"
        FROM inventory
        WHERE
        medicine_id IS NOT NULL AND stockED_amount > 0;
        `);



        const outOfStockMedCount = await client.query(`
        SELECT COUNT(*) AS "OUT OF STOCK MEDS"
        FROM inventory
        WHERE
        medicine_id IS NOT NULL AND stockED_amount <= 0;
        `);

            
        const inStockChemCount = await client.query(`
        SELECT COUNT(*) AS "IN STOCK CHEMICALS"
        FROM inventory
        WHERE
        CHEMICAL_ID IS NOT NULL AND stockED_amount > 0;
        `);

        const outOfStockChemCount = await client.query(`
        SELECT COUNT(*) AS "OUT OF STOCK CHEMICALS"
        FROM inventory
        WHERE
        CHEMICAL_ID IS NOT NULL AND stockED_amount <= 0;
        `);

        
        const allStats = {
            monthlyOrders: monthlyOrders.rows,
            weeklyOrders: weeklyOrders.rows,
            // totalRevenue: totalRevenue.rows[0],
            totalMedREvenue: totalMedREvenue.rows[0],
            totalChemRevenue: totalChemRevenue.rows[0],
            monthlyRevenue: monthlyRevenue.rows,
            weeklyRevenue: weeklyRevenue.rows,
            mostOrderingCustomers: mostOrderingCustomers.rows,
            mostOrderingResearchers: mostOrderingResearchers.rows,
            mostSpendingCustomers: mostSpendingCustomers.rows,
            mostSpendingResearchers: mostSpendingResearchers.rows,
            mostActiveCustomers: mostActiveCustomers.rows,
            mostActiveResearchers: mostActiveResearchers.rows,
            customersPastMonth: customersPastMonth.rows[0],
            customersPastWeek: customersPastWeek.rows[0],
            researchersPastMonth: researchersPastMonth.rows[0],
            researchersPastWeek: researchersPastWeek.rows[0],
            mostSoldMedicines: mostSoldMedicines.rows,
            mostSoldChemicals: mostSoldChemicals.rows,
            inStockMedCount: inStockMedCount.rows[0],
            outOfStockMedCount: outOfStockMedCount.rows[0],
            inStockChemCount: inStockChemCount.rows[0],
            outOfStockChemCount: outOfStockChemCount.rows[0]
        };

        console.log(allStats);


        res.status(200).json(allStats);









    } catch (error) {

        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});

router.post('/', authorize, async (req, res) => {
    try {
        // console.log(req.user);  
        if (Number.isInteger(req.user.id)) {
            const user = await client.query("SELECT admin_id, email from admins WHERE admin_id = $1",
                [req.user.id]);

            res.json(user.rows[0]);
            console.log(user.rows[0]);
        } else {
            res.json("No admin found");

        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});

router.post('/get', authorize, async (req, res) => {
    try {
        const user = await client.query("SELECT admin_id, email from admins WHERE admin_id = $1",
            [req.user.id]);

        res.json(user.rows[0]);
        console.log(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});



export default router;
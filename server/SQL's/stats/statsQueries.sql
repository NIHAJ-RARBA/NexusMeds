SELECT COUNT(*) AS "MONTHLY ORDERS", DATE_TRUNC('month', ORDER_DATE) AS "Month Start Date"
FROM order_history
WHERE 
STATUS = TRUE AND (CURRENT_DATE - ORDER_DATE) <= 30
GROUP BY DATE_TRUNC('month', ORDER_DATE)
ORDER BY "Month Start Date" DESC;



SELECT COUNT(*) AS "WEEKLY ORDERS", DATE_TRUNC('week', ORDER_DATE) AS "Week Start Date"
FROM order_history
WHERE
STATUS = TRUE AND (CURRENT_DATE - ORDER_DATE) <= 7
GROUP BY DATE_TRUNC('week', ORDER_DATE)
ORDER BY "Week Start Date" DESC;

SELECT SUM(PRICE) AS "Monthly Revenue", DATE_TRUNC('month', ORDER_DATE) AS "Month Start Date"
FROM order_history
WHERE STATUS = TRUE AND (CURRENT_DATE - ORDER_DATE) <= 30
GROUP BY DATE_TRUNC('month', ORDER_DATE)
ORDER BY "Month Start Date" DESC;
   

SELECT SUM(PRICE) AS "Weekly Revenue", DATE_TRUNC('week', ORDER_DATE) AS "Week Start Date"
FROM order_history
WHERE STATUS = TRUE AND (CURRENT_DATE - ORDER_DATE) <= 7
GROUP BY DATE_TRUNC('week', ORDER_DATE)
ORDER BY "Week Start Date" DESC;




SELECT user_id AS "Most ORDERING Users", COUNT(*) AS "Total Orders"
FROM order_history  
WHERE
STATUS = TRUE 
GROUP BY user_id
ORDER BY "Most ORDERING Users" DESC;



SELECT customer_name AS "Most ORDERING Customers", COUNT(*) AS "Total Orders"
FROM order_history O JOIN customer C ON O.user_id = C.customer_id
WHERE
STATUS = TRUE
GROUP BY customer_name
ORDER BY COUNT(*) DESC;



SELECT (SELECT CUSTOMER_NAME FROM customer WHERE customer_id = O.user_id) AS "MOST SPENDING CUSTOMERS", SUM(O.price) AS "Spent Amount"
FROM order_history O
JOIN cart C ON O.cart_id = C.cart_id
WHERE (C.customer_id = O.USER_id)
    AND O.status = TRUE
GROUP BY O.USER_id
ORDER BY "Spent Amount" DESC;






SELECT researcher_name AS "Most ORDERING Researchers", COUNT(*) AS "Total Orders"
FROM order_history O JOIN researcher R ON O.user_id = R.researcher_id
WHERE
STATUS = TRUE
GROUP BY researcher_name
ORDER BY COUNT(*) DESC;


SELECT (SELECT RESEARCHER_NAME FROM researcher WHERE researcher_id = O.user_id) AS "MOST SPENDING RESEARCHERS", SUM(O.price) AS "Spent Amount"
FROM order_history O
JOIN cart C ON O.cart_id = C.cart_id
WHERE (C.researcher_id = O.USER_id)
    AND O.status = TRUE
GROUP BY O.USER_id
ORDER BY "Spent Amount" DESC;





SELECT USER_ID AS "Most Active Users"
FROM LOGIN_LOG
WHERE
LOGIN_TIME >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY USER_ID
ORDER BY COUNT(*) DESC;


SELECT CUSTOMER_NAME AS "Most Active Customers"
FROM LOGIN_LOG L JOIN CUSTOMER C ON L.user_id = C.customer_id
WHERE
LOGIN_TIME >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY CUSTOMER_NAME
ORDER BY COUNT(*) DESC;


SELECT RESEARCHER_NAME AS "Most Active Researchers"
FROM LOGIN_LOG L JOIN RESEARCHER R ON L.user_id = R.researcher_id
WHERE
LOGIN_TIME >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY RESEARCHER_NAME
ORDER BY COUNT(*) DESC;
















SELECT COUNT(*) AS "Monthly Customers"
FROM LOGIN_LOG L JOIN CUSTOMER C ON L.user_id = C.customer_id
WHERE
LOGIN_TIME >= CURRENT_DATE - INTERVAL '30 days';

SELECT COUNT(*) AS "Weekly Customers"
FROM LOGIN_LOG L JOIN CUSTOMER C ON L.user_id = C.customer_id
WHERE
LOGIN_TIME >= CURRENT_DATE - INTERVAL '7 days';


SELECT COUNT(*) AS "Monthly Researchers"
FROM LOGIN_LOG L JOIN RESEARCHER R ON L.user_id = R.researcher_id
WHERE
LOGIN_TIME >= CURRENT_DATE - INTERVAL '30 days';

SELECT COUNT(*) AS "Weekly Researchers"
FROM LOGIN_LOG L JOIN RESEARCHER R ON L.user_id = R.researcher_id
WHERE
LOGIN_TIME >= CURRENT_DATE - INTERVAL '7 days';




SELECT (SELECT MED_NAME FROM medicine WHERE medicine_id = I.medicine_id) AS "Most Sold Medicine", sold_amount AS "Total Sold AMOUNT", (SELECT PRICE FROM medicine WHERE medicine_id = I.medicine_id) AS "Price", (SELECT PRICE*sold_amount FROM medicine WHERE medicine_id = i.medicine_id) AS "Total Revenue"
FROM inventory I
WHERE
I.medicine_id IS NOT NULL and sold_amount != 0
GROUP BY I.medicine_id, sold_amount
ORDER BY "Total Sold AMOUNT" DESC;



SELECT (SELECT chem_name FROM chemical WHERE chemical_id = I.chemical_id) AS "Most Sold Chemical", sold_amount AS "Total Sold AMOUNT", (SELECT PRICE FROM chemical WHERE chemical_id = I.chemical_id) AS "Price", (SELECT PRICE*sold_amount FROM chemical WHERE chemical_id = I.chemical_id) AS "Total Revenue"
FROM inventory I
WHERE
I.CHEMICAL_ID IS NOT NULL and sold_amount != 0
GROUP BY I.CHEMICAL_ID, sold_amount
ORDER BY "Total Sold AMOUNT" DESC;






SELECT COUNT(*) AS "IN STOCK MEDS"
FROM inventory
WHERE
medicine_id IS NOT NULL AND stockED_amount > 0;

SELECT COUNT(*) AS "OUT OF STOCK MEDS"
FROM inventory
WHERE
medicine_id IS NOT NULL AND stockED_amount <= 0;



SELECT COUNT(*) AS "IN STOCK CHEMICALS"
FROM inventory
WHERE
CHEMICAL_ID IS NOT NULL AND stockED_amount > 0;

SELECT COUNT(*) AS "OUT OF STOCK CHEMICALS"
FROM inventory
WHERE
CHEMICAL_ID IS NOT NULL AND stockED_amount <= 0;



SELECT SUM(O.PRICE) AS "Total Revenue"
FROM order_history O 
WHERE
STATUS = TRUE;


SELECT SUM(m.PRICE*I.sold_amount) AS "Total MED Revenue"
FROM inventory I
JOIN medicine M ON I.medicine_id = M.medicine_id
WHERE I.sold_amount != 0;

SELECT SUM(C.price * I.sold_amount) AS "Total CHEM Revenue"
FROM inventory I
JOIN chemical C ON I.chemical_id = C.chemical_id
WHERE I.sold_amount != 0;

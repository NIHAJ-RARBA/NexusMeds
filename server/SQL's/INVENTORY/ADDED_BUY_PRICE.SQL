UPDATE inventory SET stocked_amount = 0 WHERE medicine_id IS NOT NULL AND stocked_amount IS NULL;


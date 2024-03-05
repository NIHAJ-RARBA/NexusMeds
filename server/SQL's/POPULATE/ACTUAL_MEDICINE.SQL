UPDATE medicine
SET
    med_name = 'Napa Extend',
    price = 18.950,
    image = 'https://www.lazzpharma.com/Content/ImageData/Product/Orginal/303a1105-cc5d-48b3-9147-fe4082dba820/NAPA%20EXTEND%20NAPA%20EXTEND%20665%20665%20Tab.webp',
    generic_name = 'Paracetamol',
    package_type = 'Blister Pack',
    med_form = 'Tablet',
    isOTC = true,
    indication = 'Pain,Fever',
    dosage = '1 tablet every 6 hours as needed, do not exceed 4 tablets in 24 hours.',
    dosageStrength = 665,
    cautions = 'Do not take more than the recommended dose. Avoid alcohol while taking this medication.'
WHERE
    medicine_id = 1;


UPDATE medicine
SET
    med_name = 'Ace',
    price = 12.750,
    image = 'https://cdn.osudpotro.com/medicine/ace-500-1631364310354.webp',
    generic_name = 'Paracetamol',
    package_type = 'Tablet',
    med_form = 'Tablet',
    isOTC = true,
    indication = 'Pain,Fever',
    dosage = '1 tablet every 4-6 hours as needed, do not exceed 8 tablets in 24 hours.',
    dosageStrength = 500,
    cautions = 'Do not take more than the recommended dose. Avoid alcohol while taking this medication.'
WHERE
    medicine_id = 2;

UPDATE medicine
SET
    med_name = 'Fluclox',
    price = 12.990,
    image = 'https://cdn.osudpotro.com/medicine/fluclox-500-1631442367478.webp',
    generic_name = 'Amoxicillin',
    package_type = 'Blister Pack',
    med_form = 'Capsule',
    isOTC = false,
    indication = 'Infection',
    dosage = '1 capsule every 8 hours for 7-10 days.',
    dosageStrength = 500,
    cautions = 'Finish the full course of medication as prescribed.'
WHERE
    medicine_id = 3;

UPDATE medicine
SET
    med_name = 'Systear',
    price = 9.990,
    image = 'https://cdn.osudpotro.com/medicine/1598208238036-removebg-preview-1-1629960495476.webp',
    generic_name = 'Carboxymethylcellulose Sodium',
    package_type = 'Bottle',
    med_form = 'Eye Drop',
    isOTC = true,
    indication = 'Dry eyes, Eye irritation',
    dosage = '1-2 drops in the affected eye(s) as needed.',
    dosageStrength = 10,
    cautions = 'Avoid touching the tip of the dropper to prevent contamination.'
WHERE
    medicine_id = 4;


UPDATE medicine
SET
    med_name = 'Optimox',
    price = 12.500,
    image = 'https://medex.com.bd/storage/images/packaging/optimox-05-eye-drop-67689554078-i1-MfzCHmUTHa7TdlHCgQIL.webp',
    generic_name = 'Povidone-Iodine',
    package_type = 'Bottle',
    med_form = 'Eye Drop',
    isOTC = true,
    indication = 'Eye infections, Conjunctivitis',
    dosage = '1-2 drops in the affected eye(s) 3-4 times a day.',
    dosageStrength = 5,
    cautions = 'Avoid contact with eyes, nose, mouth, or other mucous membranes.'
WHERE
    medicine_id = 5;

UPDATE medicine
SET
    med_name = 'Orsaline-N',
    price = 7.500,
    image = 'https://cdn.osudpotro.com/products/orsaline-n-1630135256786.webp',
    generic_name = 'ORS',
    package_type = 'Packet',
    med_form = 'Powder',
    isOTC = true,
    indication = 'Dehydration, Electrolyte imbalance',
    dosage = 'Dissolve the contents of one packet in 200ml of clean water and drink.',
    cautions = 'Consult doctor for severe dehydration cases.'
WHERE
    medicine_id = 6;

UPDATE medicine
SET
    med_name = 'Savlon',
    price = 35.000,
    image = 'https://cdn.osudpotro.com/products/savlon-cream-100gm-1607508072621-removebg-preview-1630485091171.webp',
    generic_name = 'Cetrimide, Chlorhexidine Gluconate',
    package_type = 'Tube',
    med_form = 'Cream',
    isOTC = true,
    indication = 'Antiseptic, Disinfectant',
    dosage = 'Apply to the affected area 2-3 times daily.',
    dosageStrength = NULL,
    cautions = 'For external use only. Avoid contact with eyes.'
WHERE
    medicine_id = 7;


UPDATE medicine
SET
    med_name = 'Viodin 1% Mouth Wash',
    price = 120.000,
    image = 'https://www.squarepharma.com.bd/products/Viodin%2010%20100ml.jpg',
    generic_name = 'Povidone Iodine',
    package_type = 'Bottle',
    med_form = 'Mouth Wash',
    isOTC = false,
    indication = 'Oral hygiene, Dental procedures',
    dosage = 'Use undiluted mouthwash for gargling. Do not swallow.',
    dosageStrength = NULL,
    cautions = 'Not for internal use. Avoid contact with eyes.'
WHERE
    medicine_id = 8;


UPDATE medicine
SET
    med_name = 'Methyphen',
    price = 250.000,
    image = 'https://epharma.com.bd/storage/app/public/YnIlDuMS3XEZZz25aEX10JgWoX4YhgjZk7WpBQml.jpg',
    generic_name = 'Methylphenidate',
    package_type = 'Blister Pack',
    med_form = 'Tablet',
    isOTC = false,
    indication = 'Attention deficit hyperactivity disorder (ADHD)',
    dosage = 'Take as directed by the physician.',
    dosageStrength = 10,
    cautions = 'May cause dizziness or blurred vision. Use caution while driving or performing other tasks requiring alertness.'
WHERE
    medicine_id = 9;

UPDATE medicine
SET
    med_name = 'Riboson',
    price = 100.000,
    image = 'https://cdn.osudpotro.com/medicine/untitled-1-1631763159106.webp',
    generic_name = 'Ribavirin',
    package_type = 'Blister Pack',
    med_form = 'Tablet',
    isOTC = false,
    indication = 'Antiviral',
    dosage = 'Take as directed by the physician.',
    dosageStrength = 5,
    cautions = 'Consult doctor before use, especially in pregnancy.'
WHERE
    medicine_id = 10;


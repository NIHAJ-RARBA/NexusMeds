

DELETE from chemical;
SELECT setval('chemical_chemical_id_seq', 1, false);

INSERT INTO Chemical (chem_name, image, iupac_name, manufacturer_id, parent_chemical_id, chemical_formula, description, molecular_weight, price)
VALUES
    ('Paracetamol', 'https://cdn.osudpotro.com/medicine/ace-500-1631364310354.webp', 'N-Acetyl-p-aminophenol', 1, NULL, 'C8H9NO2', 'Paracetamol, also known as acetaminophen, is a medication used to treat pain and fever. It is commonly used for mild to moderate pain relief.', 151.165, 12.750),
    ('Amoxicillin', 'https://cdn.osudpotro.com/medicine/fluclox-500-1631442367478.webp', '6-(D-Amino-phenylacetamido)-penicillanic acid', 2, NULL, 'C16H19N3O5S', 'Amoxicillin is a penicillin antibiotic used to treat bacterial infections. It is effective against a wide range of bacteria.', 365.404, 12.990),
    ('Carboxymethylcellulose Sodium', 'https://cdn.osudpotro.com/medicine/1598208238036-removebg-preview-1-1629960495476.webp', NULL, 3, NULL, 'C8H16NaO8', 'Carboxymethylcellulose Sodium is used as an eye lubricant to relieve dry eyes and eye irritation. It forms a protective layer over the eye surface.', 262.198, 9.990),
    ('Povidone-Iodine', 'https://medex.com.bd/storage/images/packaging/optimox-05-eye-drop-67689554078-i1-MfzCHmUTHa7TdlHCgQIL.webp', 'Povidone-Iodine', 4, NULL, 'C10H12N2O', 'Povidone-Iodine is an antiseptic used to treat and prevent infections in wounds. It is also used in eye drops for infections and eye surgery preparation.', 264.216, 12.500),
    ('ORS', 'https://cdn.osudpotro.com/products/orsaline-n-1630135256786.webp', 'Oral Rehydration Salts', 5, NULL, 'NA', 'ORS (Oral Rehydration Salts) are a combination of electrolytes used to treat dehydration caused by diarrhea, vomiting, or excessive sweating.', NULL, 7.500),
    ('Cetrimide', NULL, 'Cetrimide', 1, 4, 'C17H38BrN', 'Cetrimide is a quaternary ammonium compound used as an antiseptic agent in creams and ointments.', 336.309, 35.000),
    ('Chlorhexidine Gluconate', NULL, 'Chlorhexidine Gluconate', 1, 7, 'C22H30Cl2N10·2C6H12O7', 'Chlorhexidine Gluconate is an antiseptic agent used in creams and oral rinses for its antibacterial properties.', 897.767, 35.000),
    ('Methylphenidate', 'https://epharma.com.bd/storage/app/public/YnIlDuMS3XEZZz25aEX10JgWoX4YhgjZk7WpBQml.jpg', 'Methylphenidate', 4, NULL, 'C14H19NO2', 'Methylphenidate is a central nervous system stimulant used in the treatment of attention deficit hyperactivity disorder (ADHD) and narcolepsy.', 233.310, 250.000),
    ('Ribavirin', 'https://cdn.osudpotro.com/medicine/untitled-1-1631763159106.webp', '1-[(2R,3R,4S,5R)-3,4-dihydroxy-5-(hydroxymethyl)oxolan-2-yl]-1H-1,2,4-triazole-3-carboxamide', 3, NULL, 'C8H12N4O5', 'Ribavirin is an antiviral medication used to treat hepatitis C and certain viral respiratory infections.', 244.205, 100.000);

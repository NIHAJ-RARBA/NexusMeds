CREATE OR REPLACE FUNCTION rank_searched_medicines(search_text TEXT)
RETURNS TABLE (
    medicine_id INT,
    image TEXT,
    med_name TEXT,
    generic_name TEXT,
    rank DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
        SELECT 
            Medicine.medicine_id,
            Medicine.image,
            Medicine.med_name,
            Medicine.generic_name,
            CASE 
                WHEN Medicine.med_name ILIKE search_text THEN 1 -- Exact match
                ELSE (
                    char_length(Medicine.med_name) - char_length(regexp_replace(lower(Medicine.med_name), lower(search_text), '', 'g'))
                )::double precision / char_length(Medicine.med_name) -- Partial match
            END AS rank
        FROM 
            Medicine 
        WHERE 
            lower(Medicine.med_name) LIKE '%' || search_text || '%' OR Medicine.generic_name LIKE '%' || search_text || '%'
        ORDER BY 
            CASE 
                WHEN Medicine.med_name ILIKE search_text THEN 0 -- Exact match first
                ELSE 1 -- Partial match second
            END, rank DESC, Medicine.med_name; -- Sort by exact match, then by rank, then by med_name
END;
$$ LANGUAGE plpgsql;


-- for chemical SEARCH
CREATE OR REPLACE FUNCTION rank_searched_chemicals(search_text TEXT)
RETURNS TABLE (
    chemical_id INT,
    chem_name TEXT,
    image TEXT,
    rank DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
        SELECT 
            chemical.chemical_id,
            chemical.chem_name,
            chemical.image,
            CASE 
                WHEN chemical.chem_name ILIKE search_text THEN 1 -- Exact match
                ELSE (
                    char_length(chemical.chem_name) - char_length(regexp_replace(lower(chemical.chem_name), lower(search_text), '', 'g'))
                )::double precision / char_length(chemical.chem_name) -- Partial match
            END AS rank
        FROM 
            chemical 
        WHERE 
            lower(chemical.chem_name) LIKE '%' || search_text || '%'
        ORDER BY 
            CASE 
                WHEN chemical.chem_name ILIKE search_text THEN 0 -- Exact match first
                ELSE 1 -- Partial match second
            END, rank DESC, chemical.chem_name; -- Sort by exact match, then by rank, then by chem_name
END;
$$ LANGUAGE plpgsql;


    import client from '../DB.js';

    export const getSearchedMedicines = async (req, res) => {

        
        try {

            let { search } = req.body;
            search = search.toLowerCase();

            //console.log(search);

            let charArr = [];

            for(let i = 0; i < search.length; i++){
                charArr.push(search[i]);
            }

            let searchStr = '%' + charArr.join('%') + '%';


            // const result = await client.query('SELECT * FROM Medicine WHERE lower(med_name) LIKE $1 or generic_name LIKE $1', [searchStr]);
            const result = await client.query('SELECT * FROM rank_searched_medicines($1)', [searchStr]);

            if(result.rows.length === 0){
                res.status(404).json({ message: "No medicine found" });
                console.log("No medicine found");
                return ;
            }

            res.status(200).json(result.rows);
            console.log(result.rows);
            
        }
        catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }


        
    }


    export const getSearchedChemicals = async (req, res) => {

        
        try {


            let { search } = req.body;
            search = search.toLowerCase();

            //console.log(search);

            let charArr = [];

            for(let i = 0; i < search.length; i++){
                charArr.push(search[i]);
            }

            let searchStr = '%' + charArr.join('%') + '%';

            // const result = await client.query('SELECT * FROM chemical WHERE lower(chem_name) LIKE $1', [searchStr]);
            const result = await client.query('SELECT * FROM rank_searched_chemicals($1)', [searchStr]);

            if(result.rows.length === 0){
                res.status(404).json({ message: "No chemical found" });
                console.log("No chemical found");
                return ;
            }

            res.status(200).json(result.rows);
            console.log(result.rows);
            
        }
        catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error.message);
        }


        
    }



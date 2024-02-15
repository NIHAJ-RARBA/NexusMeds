import express from 'express';
const router = express.Router();

import {
  getAllMedicines,
  createMedicine,
  getMedicineById,
  updateMedicineById,
  deleteMedicineById,
  getMedicineManufacturerById,
  getChemicalByMedicineId,
  getMedicineByIsOTC,
  getAllIndications,
  getMedicineByIndication
} from '../Controllers/medicineController.js';


router.get('/getAll', getAllMedicines);
router.post('/create', createMedicine);
router.get('/get/:id', getMedicineById);
router.put('/update/:id', updateMedicineById);
router.delete('/delete/:id', deleteMedicineById);
router.get('/manufacturer/:id', getMedicineManufacturerById);
router.get('/chemical/:id', getChemicalByMedicineId);
router.get('/isOTC/:isOTC', getMedicineByIsOTC);
router.get('/isOTC/:isOTC/indications', getAllIndications);
router.get('/isOTC/:isOTC/indications/:indication', getMedicineByIndication);


export default router;

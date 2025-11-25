const express = require('express');
const router = express.Router();
const multer = require('multer');
const komikController = require('./controllers/komikController');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/komik', upload.single('image'), komikController.createKomik);
router.get('/komik', komikController.getAllKomik);
router.get('/komik/:id', komikController.getKomikById);
router.put('/komik/:id', upload.single('image'), komikController.updateKomik);
router.delete('/komik/:id', komikController.deleteKomik);

module.exports = router;
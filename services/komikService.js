class ValidationError extends Error {
    constructor(errors) {
        super('Validation failed');
        this.name = 'ValidationError';
        this.errors = errors; // { field: message }
    }
}

function validateKomikData(komikData) {
    const requiredFields = ['title', 'description', 'author'];
    const errors = {};

    requiredFields.forEach(field => {
        if (!komikData[field] || komikData[field].toString().trim() === '') {
            errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} wajib diisi`;
        }
    });

    if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
    }
}

async function createKomik(database, komikData) {
    const { imageType, imageName, imageData } = komikData;

    validateKomikData(komikData);

    const newKomik = await database.Komik.create({
        title: komikData.title,
        description: komikData.description,
        author: komikData.author,
        imageType: imageType || null,
        imageName: imageName || null,
        imageData: imageData || null,
    });

    return newKomik;
}

async function getAllKomik(database) {
    const komiks = await database.Komik.findAll();

    return komiks.map(k => {
        if (k.imageData) {
            k.imageData = k.imageData.toString('base64');
        }
        return k;
    });
}

async function getKomikById(database, id) {
    const komik = await database.Komik.findByPk(id);

    if (!komik) throw new Error('Komik tidak ditemukan');

    if (komik.imageData) {
        komik.imageData = komik.imageData.toString('base64');
    }

    return komik;
}

async function updateKomik(database, id, komikData) {
    const komik = await database.Komik.findByPk(id);

    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    }

    validateKomikData(komikData);

    await komik.update(komikData);
    return komik;
}

async function deleteKomik(database, id) {
    const komik = await database.Komik.findByPk(id);

    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    }

    await komik.destroy();
    return { message: `Komik dengan ID ${id} berhasil dihapus` };
}

module.exports = {
    ValidationError,
    createKomik,
    getAllKomik,
    getKomikById,
    updateKomik,
    deleteKomik,
};

async function createKomik(database, komikData) {
    const { title, description, author, imageType, imageName, imageData } = komikData;

    if (!title || !description || !author) {
        throw new Error('Title, description, dan author wajib diisi');
    }

    const newKomik = await database.Komik.create({
        title,
        description,
        author,
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
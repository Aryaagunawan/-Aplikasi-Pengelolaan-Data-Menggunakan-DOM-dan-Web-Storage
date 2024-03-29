const STORAGE_KEY = "READING_LIST";

let list = [];

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    if (data !== null)
        list = data;
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function buatObjekBuku(judul, penulis, tahun, selesai) {
    return {

        id: +new Date(),
        title: judul,       // judul maps to title
        author: penulis,    // penulis maps to author
        year: tahun,        // tahun maps to year
        isComplete: selesai // selesai maps to isComplete

    };
}


function cariBuku(idBuku) {
    for (book of list) {
        if (book.id === idBuku)
            return book;
    }
    return null;
}

function cariIndeksBuku(idBuku) {
    let index = 0
    for (book of list) {
        if (book.id === idBuku)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromList() {
    const listBelumSelesai = document.getElementById(ID_LIST_BELUM);
    let listSelesai = document.getElementById(ID_LIST_SUDAH);
    for (book of list) {
        const bukuBaru = buatListBaca(book.judul, book.penulis, book.tahun, book.selesai);
        bukuBaru[ID_BUKU] = book.id;
        if (book.selesai) {
            listSelesai.append(bukuBaru);
        } else {
            listBelumSelesai.append(bukuBaru);
        }
    }
}
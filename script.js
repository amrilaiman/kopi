let keranjang = [];

function tambahKeranjang(nama, harga) {
    let produk = keranjang.find(item => item.nama === nama);

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    updateKeranjang();
    alert(nama + " berhasil ditambahkan!");
}

function updateKeranjang() {
    let jumlah = keranjang.reduce(
        (total, item) => total + item.jumlah, 0
    );

    document.getElementById("jumlah").innerText = jumlah;
}

function lihatKeranjang() {
    document.getElementById("keranjang").style.display = "flex";
    tampilkanIsi();
}

function tutupKeranjang() {
    document.getElementById("keranjang").style.display = "none";
}

function tampilkanIsi() {
    let isi = document.getElementById("isi-keranjang");
    let total = 0;

    isi.innerHTML = "";

    if (keranjang.length === 0) {
        isi.innerHTML = "<p>Keranjang masih kosong.</p>";
    }

    keranjang.forEach((item, index) => {
        let subtotal = item.harga * item.jumlah;
        total += subtotal;

        isi.innerHTML += `
            <div class="item-keranjang">
                <div>
                    <b>${item.nama}</b><br>
                    ${item.jumlah} x Rp${item.harga.toLocaleString("id-ID")}
                    <br>
                    Subtotal: Rp${subtotal.toLocaleString("id-ID")}
                </div>
                <button class="hapus"
                    onclick="hapusProduk(${index})">
                    Hapus
                </button>
            </div>
        `;
    });

    document.getElementById("total").innerText =
        "Total: Rp" + total.toLocaleString("id-ID");
}

function hapusProduk(index) {
    keranjang.splice(index, 1);
    updateKeranjang();
    tampilkanIsi();
}

function checkout() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    alert("Pesanan berhasil dibuat! Terima kasih telah membeli kopi di KopiKita.");

    keranjang = [];
    updateKeranjang();
    tampilkanIsi();
    tutupKeranjang();
}
"use strict";
console.log("P09 JavaScript aktif: Memuat data dari app.js...");

const produkUmkm = [
  { nama: "Java Tea Script", kategori: "Teh Spesial", harga: 10000, stok: 15, unggulan: true },
  { nama: "Error 404 Tea (Sugar Not Found)", kategori: "Teh Segar", harga: 5000, stok: 3, unggulan: false },
  { nama: "Localhost Tea", kategori: "Teh Reguler", harga: 7500, stok: 20, unggulan: true },
  { nama: "Python Peach Tea", kategori: "Teh Spesial", harga: 8000, stok: 0, unggulan: false },
];

produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});
console.table(produkUmkm);

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  } 
  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  } 
  return { label: "Tersedia", className: "success" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Teh Spesial": return "Racikan spesial andalan";
    case "Teh Reguler": return "Pilihan basic mahasiswa";
    case "Teh Segar": return "Varian segar tanpa gula";
    default: return "Produk Teh Saha";
  }
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const kategori = labelKategori(produk.kategori);
  
  let badgeUnggulan = "";
  if (produk.unggulan === true) {
    badgeUnggulan = `<span class="product-badge" style="background: var(--color-accent); color: #fff; margin-left: 0.5rem;">⭐ Pilihan</span>`;
  }

  const labelAksi = produk.stok > 0 ? "Pesan sekarang" : "Hubungi admin";
  const hargaTampil = formatRupiah(produk.harga).replace(/\s/g, '');

  return `
    <article class="product-card">
      <div style="display: flex; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
          <span class="product-badge ${status.className}">${status.label}</span>
          ${badgeUnggulan}
      </div>
      <h3 style="margin-top: 0;">${produk.nama}</h3>
      <p>${kategori}</p>
      <p class="price">${hargaTampil}</p>
      <div class="card-actions">
        <a class="button" href="kontak.html">${labelAksi}</a>
        <a href="#harga-title">Lihat tabel harga</a>
      </div>
    </article>
  `;
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan"); 
  
  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }
  
  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");
  
  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan 
    ? `Produk unggulan: ${produkUnggulan.nama}` 
    : "Belum ada produk unggulan.";
}

document.addEventListener("DOMContentLoaded", renderProduk);
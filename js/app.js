"use strict";
console.log("P11 JavaScript aktif: Memuat data dari app.js...");

const produkUmkm = [
  { nama: "Java Tea Script", kategori: "Teh Spesial", harga: 10000, stok: 15, unggulan: true },
  { nama: "Error 404 Tea (Sugar Not Found)", kategori: "Teh Segar", harga: 5000, stok: 3, unggulan: false },
  { nama: "Localhost Tea", kategori: "Teh Reguler", harga: 7500, stok: 20, unggulan: true },
  { nama: "Python Peach Tea", kategori: "Teh Spesial", harga: 8000, stok: 0, unggulan: false },
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function statusStok(stok) {
  if (stok === 0) return { label: "Habis", className: "empty" };
  if (stok <= 5) return { label: "Stok terbatas", className: "warning" };
  return { label: "Tersedia", className: "success" };
}

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const badgeContainer = document.createElement("div");
  badgeContainer.style.display = "flex";
  badgeContainer.style.marginBottom = "0.5rem";
  
  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("product-badge");
  if (status.className) stock.classList.add(status.className);
  stock.textContent = status.label;
  badgeContainer.append(stock);

  const title = document.createElement("h3");
  title.style.marginTop = "0";
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.textContent = `Kategori: ${produk.kategori}`;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga).replace(/\s/g, '');

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.style.marginTop = "auto"; 
  removeButton.addEventListener("click", () => {
    card.remove();
    produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
  });

  card.append(badgeContainer, title, category, price, removeButton);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk Teh Saha pada kategori ${kategori}.`;
  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

document.addEventListener("DOMContentLoaded", () => {
    renderProduk("Semua");
});
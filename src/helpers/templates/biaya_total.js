import { numberWithCommas } from "../../utils/helper";

const prepareData = (tahun, data) => {
  const total_dinas = data.allAnggaranDinas;
  const pemeliharaan = data.allAnggaranKegiatan.kategori.find(
    (k) => k.nama === "Pemeliharaan",
  );
  const kendaraan = pemeliharaan.sub_kategori.find(
    (k) => k.nama === "Kendaraan",
  ).amount;
  const mesin = pemeliharaan.sub_kategori.find(
    (k) => k.nama === "Mesin",
  ).amount;
  const inventaris = pemeliharaan.sub_kategori.find(
    (k) => k.nama === "Inventaris",
  ).amount;
  const total_pemeliharaan = Number(kendaraan) + Number(mesin) + Number(inventaris);

  const barangJasa = data.allAnggaranKegiatan.kategori.find(
    (k) => k.nama === "Barang & Jasa",
  );
  const porto = barangJasa.sub_kategori.find((k) => k.nama === "Porto").amount;
  const percetakan = barangJasa.sub_kategori.find(
    (k) => k.nama === "Percetakan",
  ).amount;
  const atk = barangJasa.sub_kategori.find((k) => k.nama === "ATK").amount;
  const komputer = barangJasa.sub_kategori.find(
    (k) => k.nama === "Supply Komputer",
  ).amount;
  const total_barang_jasa = Number(porto) + Number(percetakan) + Number(atk) + Number(komputer);

  const umumLainnya = data.allAnggaranKegiatan.kategori.find(
    (k) => k.nama === "Umum lainnya",
  );
  const representasi = umumLainnya.sub_kategori.find(
    (k) => k.nama === "Representasi",
  ).amount;
  const rapat = umumLainnya.sub_kategori.find((k) => k.nama === "Rapat").amount;
  const total_umum_lainnya = Number(representasi) + Number(rapat);

  const total =
    Number(total_barang_jasa) + Number(total_pemeliharaan) + Number(total_umum_lainnya) + Number(total_dinas);

  return {
    tahun,
    total_dinas,
    total_pemeliharaan,
    kendaraan,
    mesin,
    inventaris,
    total_barang_jasa,
    porto,
    percetakan,
    atk,
    komputer,
    total_umum_lainnya,
    representasi,
    rapat,
    total,
  };
};

const biaya_total = ({
  tahun,
  total_pemeliharaan,
  kendaraan,
  mesin,
  inventaris,
  total_dinas,
  total_barang_jasa,
  porto,
  percetakan,
  atk,
  komputer,
  total_umum_lainnya,
  representasi,
  rapat,
  total,
}) => `
<p>Rencana anggaran dalam rangka pelaksanaan audit untuk tahun ${tahun}, adalah sbb</p>
<div>
  <div class="biaya_anggaran">
    <p>1.</p>
    <div class="leader">
      <span>Biaya Pemeliharaan</span>
      <span>Rp ${numberWithCommas(total_pemeliharaan)}</span>
    </div>
  </div>
  <div class="sub_biaya_anggaran">
    <p>a.</p>
    <div class="leader">
      <span>Pemeliharaan dan Perbaikan AT kendaraan</span>
      <span>Rp ${numberWithCommas(kendaraan)}</span>
    </div>
  </div>
  <div class="sub_biaya_anggaran">
    <p>b.</p>
    <div class="leader">
      <span>Pemeliharaan dan Perbaikan AT mesin-mesin</span>
      <span>Rp ${numberWithCommas(mesin)}</span>
    </div>
  </div>
  <div class="sub_biaya_anggaran">
    <p>c.</p>
    <div class="leader">
      <span>Pemeliharaan dan Perbaikan AT Inventaris</span>
      <span>Rp ${numberWithCommas(inventaris)}</span>
    </div>
  </div>
</div>
<div>
  <div class="biaya_anggaran">
    <p>2.</p>
    <div class="leader">
      <span>Biaya Perjalanan Dinas Jabatan</span>
      <span>Rp ${numberWithCommas(total_dinas)}</span>
    </div>
  </div>
</div>
<div>
  <div class="biaya_anggaran">
    <p>3.</p>
    <div class="leader">
      <span>Biaya Barang dan Jasa Pihak ke 3</span>
      <span>Rp ${numberWithCommas(total_barang_jasa)}</span>
    </div>
  </div>
  <div class="sub_biaya_anggaran">
    <p>a.</p>
    <div class="leader">
      <span>Biaya Porto</span>
      <span>Rp ${numberWithCommas(porto)}</span>
    </div>
  </div>
  <div class="sub_biaya_anggaran">
    <p>b.</p>
    <div class="leader">
      <span>Biaya Percetakan</span>
      <span>Rp ${numberWithCommas(percetakan)}</span>
    </div>
  </div>
  <div class="sub_biaya_anggaran">
    <p>c.</p>
    <div class="leader">
      <span>Biaya Alat Tulis Kantor (ATK)</span>
      <span>Rp ${numberWithCommas(atk)}</span>
    </div>
  </div>
  <div class="sub_biaya_anggaran">
    <p>d.</p>
    <div class="leader">
      <span>Biaya Supplies Komputer</span>
      <span>Rp ${numberWithCommas(komputer)}</span>
    </div>
  </div>
</div>
<div>
  <div class="biaya_anggaran">
    <p>4.</p>
    <div class="leader">
      <span>Biaya Umum Lainnya</span>
      <span>Rp ${numberWithCommas(total_umum_lainnya)}</span>
    </div>
  </div>
  <div class="sub_biaya_anggaran">
    <p>a.</p>
    <div class="leader">
      <span>Biaya Rapat</span>
      <span>Rp ${numberWithCommas(rapat)}</span>
    </div>
  </div>
  <div class="sub_biaya_anggaran">
    <p>a.</p>
    <div class="leader">
      <span>Biaya Representasi</span>
      <span>Rp ${numberWithCommas(representasi)}</span>
    </div>
  </div>
</div>
<div class="leader" style="font-weight: bold; margin-top: 1rem;">
  <span>Total Biaya</span>
  <span>Rp ${numberWithCommas(total)}</span>
</div>
`;

export const getBiayaTotalHtml = (tahun, data) =>
  biaya_total(prepareData(tahun, data));

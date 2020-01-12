const ap1 = [
  {
    kelas: 'A',
    hari: 'Senin',
    dosen: 'ABDUL HARIS S.Kom, M.Kom',
    jam_mulai: '08:00',
    jam_selesai: '10:30',
    asisten: 'Givary, Putra, Aflah, Nuggy'
  },
  {
    kelas: 'B',
    hari: 'Senin',
    dosen: 'ABDURASYID S.Kom, M.Kom',
    jam_mulai: '13:00',
    jam_selesai: '15:30',
    asisten: 'Mayang, Alwi, Sarah, Katon'
  },
  {
    kelas: 'D',
    hari: 'Rabu',
    dosen: 'RAHMA FARAH NINGRUM. M.KOM',
    jam_mulai: '08:00',
    jam_selesai: '10:30',
    asisten: 'Dhiya, Tajul, Dipo, Ayu'
  },
  {
    kelas: 'E',
    hari: 'Kamis',
    dosen: 'YESSY ASRI, ST., MMSI',
    jam_mulai: '08:00',
    jam_selesai: '10:30',
    asisten: 'Dimas, Syafiq, Widya'
  }
];

const pemvis = [
  {
    kelas: 'F',
    hari: 'Senin',
    dosen: 'YESSY ASRI, ST., MMSI',
    jam_mulai: '08:00',
    jam_selesai: '09:40',
    asisten: 'Alfin, Putra, Umar, Hafiza'
  },
  {
    kelas: 'G',
    hari: 'Sabtu',
    dosen: 'IRFAN SEMBIRING, ST., M.Kom',
    jam_mulai: '08:00',
    jam_selesai: '09:40',
    asisten: 'Abdan, Dhiya, Nilam, Mayang'
  },
  {
    kelas: 'H',
    hari: 'Sabtu',
    dosen: 'IRFAN SEMBIRING, ST., M.Kom',
    jam_mulai: '10:00',
    jam_selesai: '11:40',
    asisten: 'Fahmi, Mayang, Abdan'
  }
];

const jarkom = [
  {
    kelas: 'D',
    hari: 'Jumat',
    dosen: 'ELIANDO, ST., M.Kom',
    jam_mulai: '08:00',
    jam_selesai: '10:30',
    asisten: 'Sri, Alfin, Abdan'
  }
];

const rpl = [
  {
    kelas: 'F',
    hari: 'Rabu',
    dosen: 'HENDRA JATNIKA, ST., M.Kom',
    jam_mulai: '08:00',
    jam_selesai: '11:20',
    asisten: 'Inas, Nilam, Heri'
  },
  {
    kelas: 'G',
    hari: 'Rabu',
    dosen: 'HERMAN BEDI AGTRIADI, ST., M.Kom',
    jam_mulai: '13:00',
    jam_selesai: '16:20',
    asisten: 'Difa, Putra, Abdan'
  },
  {
    kelas: 'H',
    hari: 'Jumat',
    dosen: 'ABDUL HARIS, ST., M.Kom',
    jam_mulai: '13:00',
    jam_selesai: '16:20',
    asisten: 'Bintang, Rilo, Abdan'
  }
];

export const getMatkul = () =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve([
          { kode_matkul: 'C31040107', nama: 'Algoritma & Pemrograman 1' },
          { kode_matkul: 'C31040203', nama: 'Pemrograman Visual' },
          { kode_matkul: 'C31040413', nama: 'Rekayasa Perangkat Lunak' },
          { kode_matkul: 'C31040315', nama: 'Jaringan Komputer' },
          { kode_matkul: 'C31040311', nama: 'Sistem Basis Data' }
        ]),
      2000
    )
  );

export const getJadwal = kode =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      switch (kode) {
        case 'C31040107':
          resolve(ap1);
          break;

        case 'C31040203':
          resolve(pemvis);
          break;

        case 'C31040413':
          resolve(rpl);
          break;

        case 'C31040315':
          resolve(jarkom);
          break;

        case 'C31040311':
          resolve([]);
          break;

        default:
          reject('Matakuliah tidak di temukan');
          break;
      }
    }, 2000)
  );

export default {};

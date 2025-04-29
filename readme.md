# frasydi-makassar

Sebuah transpiler dan interpreter sederhana berbasis TypeScript untuk skrip `.mks`, dengan kata kunci terinspirasi bahasa Makassar. Alat ini mengonversi sintaks `.mks` ke JavaScript dan mengeksekusinya melalui Node.js.

---

## Instalasi

Pasang CLI secara global lewat npm:

```bash
npm install -g frasydi-makassar
```

Setelah terpasang, perintah yang tersedia adalah:

```bash
frasydi-makassar   # atau alias:
mks
```

---

## Cara Penggunaan

Buat berkas dengan ekstensi `.mks`, misalnya `script.mks`:

```mks
ketika 1 == 1, jari
    akkanako("Halo Dunia")
tongko
```

Jalankan dengan:

```bash
frasydi-makassar script.mks
# atau cukup:
mks script.mks
```

---

## Sintaks yang Didukung

Bahasa ditentukan oleh kumpulan `Rule` di `rules.ts`, masing‑masing memetakan pola regex ke potongan kode JavaScript:

| Pola Makassar                                          | Transpilasi JavaScript            |
| ------------------------------------------------------ | --------------------------------- |
| `ketika A <op> B, jari`                                | `if (A <op> B) {`                 |
| `ketika A <op> B, maraenga, jari`                      | `} else if (A <op> B) {`          |
| `maraenga`                                             | `} else {`                        |
| `tongko`                                               | `}`                               |
| `sibakuk KONDISI pare`                                 | `while (KONDISI) {`               |
| `passang NAMA singkammaji EKSPRESI`                    | `let NAMA = EKSPRESI;`            |
| `sambei TARGET singkammaji EKSPRESI`                   | `TARGET = EKSPRESI;`              |
| `akkanako(EKSPRESI)`                                   | `console.log(EKSPRESI);`          |
| `fungsi NAMA(ARG1, ARG2, ...), maka`                   | `function NAMA(ARG1, ARG2, ...) {`|
| `NAMA(ARG1, ARG2, ...)` (pemanggilan fungsi)          | `NAMA(ARG1, ARG2, ...);`          |
| `pammotereki EKSPRESI`                                 | `return EKSPRESI;`                |

Operator perbandingan yang didukung: `==`, `!=`, `>`, `<`, `>=`, `<=`.

---

## Menambah Kata Kunci Baru

Untuk menambahkan fitur atau kata kunci baru, cukup tambahkan objek `{ regex, transform }` di array `rules` pada `rules.ts`. Contoh struktur `Rule`:

```ts
interface Rule {
  /** Pola satu baris sintaks `.mks`. */
  regex: RegExp;
  /**
   * Fungsi transformasi yang menerima hasil match regex
   * dan mengembalikan baris kode JavaScript.
   */
  transform: (match: RegExpMatchArray) => string;
}
```

Setelah menambahkan, jalankan ulang CLI Anda—perubahan akan diterapkan otomatis.

---

## Pengembangan & Kontribusi

1. Clone repositori ini:
   ```bash
git clone https://github.com/username/frasydi-makassar.git
cd frasydi-makassar
   ```
2. Pasang dependensi:
   ```bash
npm install
   ```
3. Build kode TypeScript:
   ```bash
npm run build
   ```
4. Link secara lokal untuk pengujian:
   ```bash
npm link
mks script.mks
   ```

Silakan buat issues atau pull request untuk menambah fitur dan memperbaiki bug. Terima kasih atas kontribusinya!

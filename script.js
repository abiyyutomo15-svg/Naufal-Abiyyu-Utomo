
        // Kodingan Utama JavaScript // Memastikan DOM (struktur HTML) selesai dimuat sebelum menjalankan script.
        document.addEventListener('DOMContentLoaded', function() {
            
            // Kodingan Variabel Elemen // Mendapatkan elemen-elemen penting: layar tampilan, gambar status, dan semua tombol.
            const display = document.getElementById('display');
            const statusImage = document.getElementById('statusImage');
            const buttons = document.querySelectorAll('.btn-calc');

            // Kodingan Variabel Gambar Status // Teks status sudah diubah ke Bahasa Gaul.
            const imgNormal = 'https://placehold.co/400x100/1E90FF/FFFFFF?text=KALKULATOR';
            const imgSuccess = 'https://placehold.co/400x100/3CB371/FFFFFF?text=SUKSES+BRO!'; // <-- SUKSES BRO!
            const imgError = 'https://placehold.co/400x100/FF4500/FFFFFF?text=GAGAL+CUY!';    // <-- GAGAL CUY!

            /**
              Kodingan Fungsi changeImage // Mengubah gambar status (statusImage) berdasarkan hasil perhitungan (sukses, error, atau normal).
             */
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator";
                }
            }

            /**
              Kodingan Fungsi clearDisplay // Mengosongkan layar tampilan (display) dan mereset gambar status menjadi normal.
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal');
            }

            /**
              Kodingan Fungsi deleteLastChar // Menghapus satu karakter terakhir dari string yang ada di layar tampilan.
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1);
            }

            /**
              Kodingan Fungsi appendToDisplay // Menambahkan nilai tombol yang diklik ke string ekspresi yang ada di layar.
             */
            function appendToDisplay(value) {
                display.value += value;
            }

            /**
              Kodingan Fungsi calculateResult // Fungsi utama untuk menghitung hasil ekspresi saat tombol '=' ditekan.
             */
            function calculateResult() {
                // Mengecek apakah layar kosong.
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!';
                    setTimeout(clearDisplay, 1500);
                    return;
                }

                try {
                    // Melakukan perhitungan menggunakan eval() dan menangani persentase.
                    let result = eval(display.value
                        .replace(/%/g, '/100')
                    ); 
                    
                    // Menampilkan hasil jika valid.
                    if (isFinite(result)) {
                        display.value = result;
                        changeImage('success');
                    } else {
                        throw new Error("Hasil tidak valid");
                    }

                } catch (error) {
                    // Menangani error perhitungan (misalnya pembagian dengan nol).
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error');
                    setTimeout(clearDisplay, 1500);
                }
            }


            // Kodingan Event Listener Tombol // Loop untuk menambahkan event listener 'click' pada semua tombol.
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value');

                    // Logika penanganan tombol berdasarkan nilai (data-value).
                    switch(value) {
                        case 'C':
                            // Kodingan Tombol C // Memanggil clearDisplay() untuk menghapus semua input.
                            clearDisplay();
                            break;
                        case 'DEL':
                            // Kodingan Tombol DEL // Memanggil deleteLastChar() untuk menghapus karakter terakhir.
                            deleteLastChar();
                            break;
                        case '=':
                            // Kodingan Tombol Equal // Memanggil calculateResult() untuk menghitung hasilnya.
                            calculateResult();
                            break;
                        default:
                            // Kodingan Tombol Angka/Operator // Jika status sebelumnya error/sukses, layar direset. Lalu, nilai ditambahkan ke display.
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            // Kodingan Input Keyboard // Menambahkan dukungan input dari keyboard (key binding).
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    // Tangani input angka dan operator.
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    // Tangani tombol Enter atau '=' untuk menghitung.
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    // Tangani tombol Backspace untuk menghapus karakter.
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    // Tangani tombol Escape atau 'c' untuk membersihkan display.
                    clearDisplay();
                    e.preventDefault();
                }
            });

        });
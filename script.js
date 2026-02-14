const surahSelect = document.getElementById('surahSelect');
const quranContainer = document.getElementById('quranContainer');

// 1. جلب قائمة السور عند تحميل الصفحة
fetch('https://api.alquran.cloud/v1/surah')
    .then(response => response.json())
    .then(data => {
        const surahs = data.data;
        surahs.forEach(surah => {
            const option = document.createElement('option');
            option.value = surah.number;
            option.textContent = `${surah.number}. ${surah.name}`;
            surahSelect.appendChild(option);
        });
    });

// 2. جلب آيات السورة المختارة
surahSelect.addEventListener('change', (e) => {
    const surahNumber = e.target.value;
    if (!surahNumber) return;

    quranContainer.innerHTML = '<p>جاري التحميل...</p>';

    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
        .then(response => response.json())
        .then(data => {
            const ayahs = data.data.ayahs;
            quranContainer.innerHTML = ''; // مسح النص السابق

            ayahs.forEach(ayah => {
                const ayahSpan = document.createElement('span');
                ayahSpan.classList.add('ayah');
                ayahSpan.innerHTML = `
                    ${ayah.text} <span class="ayah-number">${ayah.numberInSurah}</span>
                `;
                quranContainer.appendChild(ayahSpan);
            });
        })
        .catch(err => {
            quranContainer.innerHTML = '<p>حدث خطأ في جلب البيانات</p>';
        });
});

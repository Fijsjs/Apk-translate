let test;

let input = false;
const dropdown = document.querySelector('.dropdown-toggle'),
dropdownMenu = document.querySelector('.dropdown-menu'),
textInput = document.querySelector('#input-text'),
textOutput = document.querySelector('#text-output'),
cardBottom = document.querySelector('.card-bottom'),
dropdownMenu2 = document.querySelector('.dropdown-menu2'),
close2 = document.querySelector('.close2'),
uploadDocument = document.getElementById('upload-document'),
dropdownContainer = document.querySelector('.dropdown-container'),
swap = document.querySelector('.exchange'),
clearBtn = document.querySelector('.clear'),
count = document.getElementById('count'),
limit = document.getElementById('limit')

textInput.addEventListener('input', function() {
 updateCounter()
  if (textInput.value.trim() !== '') {
 
   textInput.classList.add('active')
   setTimeout(()=>{
    textOutput.classList.add('active');
    outputArea.classList.add('active')
   }, 500)
    
    cardBottom.innerHTML = `
      <p>Download as a .txt file</p>
      <button id="download-btn" onclick="download()">
          <span>Download</span>
          <ion-icon name="cloud-download-outline"></ion-icon>
      </button>`;
  
  fetchTranslation()
    

    
  } else {
   textOutput.innerHTML = ''
   setTimeout(()=> {
        textOutput.classList.remove('active');
    outputArea.classList.remove('active')
   },500)
   textInput.classList.remove('active')

    cardBottom.innerHTML = `          <p>Upload file .txt</p>
          <label for="upload-document">
            <span id="upload-title">Choose File</span>
            <ion-icon name="cloud-upload-outline"></ion-icon>
            <input onclick='fileSelection()' type="file" id="upload-document" hidden />
          </label>`
  }
});

textInput.addEventListener('click', function () {
 dropdownMenu.classList.remove('active')
 dropdownMenu2.classList.remove('active')
})
const mode = document.querySelector('.mode'),
body = document.body,
object = document.querySelectorAll('object')
close = document.querySelector('.close'),
sun = document.querySelector('.sun'),
moon = document.querySelector('.moon'),
close = document.querySelector('.close'),
outputArea = document.querySelector('.outputArea'),
selectLang1 = document.querySelector('.selectedLang1'),
selectLang2 = document.querySelector('.selectedLang2'),inputChar = document.getElementById('input-chars')

  
mode.addEventListener('click', ()=> {
body.classList.toggle('dark')
mode.classList.toggle('active')
sun.classList.toggle('active')
moon.classList.toggle('off')

})

 close.addEventListener('click', ()=>{
 dropdownMenu.classList.remove('active')
 dropdownContainer.style.zIndex = '-1'
})
close2.addEventListener('click', ()=> {
 dropdownContainer.style.zIndex = '-1'
 dropdownMenu2.classList.remove('active')
})

let selectedLanguage1 = languages[29].name;
let selectedLanguage2 = languages[15].name;
let selectedLangCode1 = languages[29].code;
let selectedLangCode2 = languages[15].code;
selectLang1.innerHTML = selectedLanguage1;
selectLang2.innerHTML = selectedLanguage2
selectLang1.addEventListener('click', () => {
  if (dropdownMenu2.classList.contains('active')) {
    dropdownMenu2.classList.remove('active');
  }
  dropdownMenu.classList.add('active');
  dropdownContainer.style.zIndex = '5'
  
});

selectLang2.addEventListener('click', () => {
  if (dropdownMenu.classList.contains('active')) {
    dropdownMenu.classList.remove('active');
  }
  dropdownContainer.style.zIndex = '5'
  dropdownMenu2.classList.add('active');
});

function populateLanguage() {
  languages.forEach(language => {
    const listItem = document.createElement('li');
    listItem.classList.add('option');
    listItem.textContent = language.name;

    listItem.addEventListener('click', () => {
      selectedLanguage1 = language.name;
      selectedLangCode1 = language.code; // Ubah dari let menjadi tanpa let
      selectLang1.innerHTML = selectedLanguage1;
      
    });
    
    dropdownMenu.appendChild(listItem);
  });
}

populateLanguage();

function populateLanguage2() {
  languages.forEach(language => {
    const listItem = document.createElement('li');
    listItem.classList.add('option');
    listItem.textContent = language.name;

    listItem.addEventListener('click', () => {
      selectedLanguage2 = language.name;
      selectedLangCode2 = language.code; // Ubah dari let menjadi tanpa let
      selectLang2.innerHTML = selectedLanguage2;
      fetchTranslation()
    });

    dropdownMenu2.appendChild(listItem);
  });
}

populateLanguage2();
let remainingChar;

function fetchTranslation() {
const apiUr = `https:api.mymemory.translated.net/get?q=${textInput.value}&langpair=${selectedLangCode1}|${selectedLangCode2}`


fetch(apiUr)
  .then(response => response.json()).then(response => {
   if (!response.ok) {
    throw new Error('API Request failed')
   }
   return response.json()
  })
  .then(data => {
  
    const translatedText = data.responseData.translatedText;

    if (translatedText) {
     textOutput.innerHTML = translatedText;
    
    }else {
     console.log('err');
    }
  })
  .catch(error => {
    textOutput.innerHTML= 'Terjadi kesalahan'
  });
}

textInput.addEventListener('input', fetchTranslation)

uploadDocument.addEventListener('change', fileSelection)

function fileSelection() {
 const file = uploadDocument.files[0]
 if (file && file.type === 'text/plain') {
  readAndDisplayFile(file)
 }
else{
 alert('silahkan pilih file txt')
}
}

function readAndDisplayFile(file) {
   
 const reader = new FileReader();
 reader.onload = function (e) {
  textInput.value = e.target.result
fetchTranslation()
 }
 
 textInput.classList.add('active')
    textOutput.classList.add('active');
    outputArea.classList.add('active')
    cardBottom.innerHTML = `
      <p>Download as a .txt file</p>
      <button id="download-btn">
          <span>Download</span>
          <ion-icon name="cloud-download-outline"></ion-icon>
      </button>`;
 
 reader.readAsText(file)
 
}



swap.addEventListener('click', exchange)

function exchange() {
 const swapLang = selectedLanguage1;
 selectedLanguage1 = selectedLanguage2
 selectedLanguage2 = swapLang
 
 let swapcode = selectedLangCode1;
 selectedLangCode1 = selectedLangCode2;
 selectedLangCode2 = swapcode

let swapText = textInput.textContent;
textInput.value = textOutput.textContent
textOutput.textContent = swapText

 selectLang1.innerHTML = selectedLanguage1
 selectLang2.innerHTML = selectedLanguage2
fetchTranslation()
 
}

clearBtn.addEventListener('click', ()=> {
 textInput.value = ''
 textOutput.innerHTML = ''
 fetchTranslation()
})

const maxCharacters = 1000
function updateCounter() {
 const text = textInput.value
 const characterCount = text.length
 
 const wordCount = text.split(/\s+/).filter(Boolean).length
 
 if (characterCount > maxCharacters) {
  textInput.value = text.substring(0, maxCharacters)
  return;
 }
 count.innerHTML = `${characterCount} / ${maxCharacters}`
}


function download() {
  const textToDownload = textOutput.innerText; // Mengambil teks dari outputText
  const blob = new Blob([textToDownload], { type: 'text/plain' }); // Membuat objek Blob

  const a = document.createElement('a'); // Membuat elemen anchor (<a>)
  a.href = URL.createObjectURL(blob); // Menghubungkan URL objek Blob
  a.download = 'translated_text.txt'; // Nama file yang akan diunduh

  // Simulasikan klik pada elemen anchor
  a.click();

  // Hapus elemen anchor setelah pengguna mengklik
  window.addEventListener('focus', () => {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, { once: true });
}
/* Adicione ao início do arquivo scripts.js */

const DEFAULT_IMAGES = [
    { url: 'https://via.placeholder.com/400?text=Lixo+na+Praia', title: 'Lixo na Praia' },
    { url: 'https://via.placeholder.com/400?text=Descarte+Correto', title: 'Descarte Correto' },
    { url: 'https://via.placeholder.com/400?text=Coleta+Seletiva', title: 'Coleta Seletiva' },
    { url: 'https://via.placeholder.com/400?text=Lixo+Reciclável', title: 'Lixo Reciclável' },
    { url: 'https://via.placeholder.com/400?text=Reduzir+Resíduos', title: 'Reduzir Resíduos' },
    { url: 'https://via.placeholder.com/400?text=Saneamento+Básico', title: 'Saneamento Básico' },
    { url: 'https://via.placeholder.com/400?text=Limpeza+Urbana', title: 'Limpeza Urbana' },
    { url: 'https://via.placeholder.com/400?text=Conscientização', title: 'Conscientização' },
    { url: 'https://via.placeholder.com/400?text=Reciclagem', title: 'Reciclagem' },
    { url: 'https://via.placeholder.com/400?text=Educação+Ambiental', title: 'Educação Ambiental' }
];


// Função para gerar um ID único
function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}

// Inicializa o aplicativo e mostra a tela de carregamento
function initializeApp() {
    const loadingScreen = document.getElementById('loading-screen');
    const appContainer = document.getElementById('app-container');

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            appContainer.style.display = 'block';
            loadImages();
        }, 1000);
    }, 2000);
}

// Carrega as imagens do cookie ou usa as imagens padrão
function loadImages() {
    const savedImages = getCookie('images');
    const images = savedImages ? parseJsonSafely(savedImages) : DEFAULT_IMAGES;
    const imageFeed = document.getElementById('imageFeed');
    imageFeed.innerHTML = '';
    images.forEach((image) => {
        addImageToFeed(image);
    });
}

// Adiciona uma imagem ao feed
function addImageToFeed(image) {
    const imgElement = document.createElement('div');
    imgElement.id = image.id;
    imgElement.innerHTML = `
        <img src="${image.url}" alt="${image.title}">
        <p>${image.title}</p>
        <button onclick="deleteImage('${image.id}')">X</button>
    `;
    document.getElementById('imageFeed').appendChild(imgElement);
}

// Lida com o upload de imagens
function handleImageUpload(event) {
    event.preventDefault();
    const imageInput = document.getElementById('imageInput');
    const titleInput = document.getElementById('titleInput');
    const imageFile = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const newImage = { id: generateUniqueId(), url: e.target.result, title: titleInput.value };
        const savedImages = getCookie('images');
        const images = savedImages ? parseJsonSafely(savedImages) : [];
        images.push(newImage);
        setCookie('images', JSON.stringify(images), 365);
        addImageToFeed(newImage); // Adiciona a nova imagem ao feed
    };
    reader.readAsDataURL(imageFile);
    imageInput.value = '';
    titleInput.value = '';
}

// Deleta uma imagem do feed e atualiza o cookie
function deleteImage(imageId) {
    const savedImages = getCookie('images');
    if (savedImages) {
        const images = parseJsonSafely(savedImages);
        const updatedImages = images.filter(image => image.id !== imageId);
        setCookie('images', JSON.stringify(updatedImages), 365);
        document.getElementById(imageId).remove();
    }
}

// Restaura as imagens padrão
function restoreDefaultImages() {
    setCookie('images', JSON.stringify(DEFAULT_IMAGES), 365);
    loadImages();
}

// Funções auxiliares para cookies e JSON
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function parseJsonSafely(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        return [];
    }
}

// Inicializa o aplicativo ao carregar a página
window.onload = initializeApp;

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    pages.forEach((page) => {
        page.classList.remove('active');
    });
    navItems.forEach((navItem) => {
        navItem.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');
    document.querySelector(`.nav-item[title="${pageId.charAt(0).toUpperCase() + pageId.slice(1)}"]`).classList.add('active');
}

function toggleFaqAnswer(button) {
    button.classList.toggle('active');
    const answer = button.nextElementSibling;
    answer.classList.toggle('active');
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function setupEventListeners() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.add('active');
            setTimeout(() => {
                item.classList.remove('active');
            }, 300);
        });
    });
}


// Abrir conversa no chat
function openChat(personId, personName) {
    const chatWindow = document.getElementById('chat-window');
    const chatUserPhoto = document.getElementById('chat-user-photo');
    const chatUserName = document.getElementById('chat-user-name');
    chatUserPhoto.src = 'images/' + personId + '.png';
    chatUserName.innerText = personName;

    const chatContent = document.getElementById('chat-content');
    chatContent.innerHTML = '';

    const messages = {
        'person1': [
            { type: 'received', text: 'Oi! Você conhece os benefícios da compostagem?' },
            { type: 'sent', text: 'Sim! É ótimo para o meio ambiente.' }
        ],
        'person2': [
            { type: 'received', text: 'Como você descarta o lixo eletrônico?' },
            { type: 'sent', text: 'Levo para pontos de coleta específicos.' }
        ],
        'person3': [
            { type: 'received', text: 'Você sabe como fazer reciclagem em casa?' },
            { type: 'sent', text: 'Sim! Eu separo os resíduos em diferentes lixeiras.' }
        ]
    };

    messages[personId].forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-bubble', message.type);
        messageElement.innerText = message.text;
        chatContent.appendChild(messageElement);
    });

    chatWindow.classList.add('active');
}

// Alternar modo noturno
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Alternar resposta do FAQ
function toggleFaqAnswer(button) {
    const answer = button.nextElementSibling;
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
}

// Inicializar a página principal
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
    loadImages();
});
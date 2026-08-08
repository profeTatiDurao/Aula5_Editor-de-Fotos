// AULA 3
// Objetivo: acrescentar ajustes por sliders.

const filtros = [
  { nome: 'Normal', icone: '😊', efeito: 'none' },
  { nome: 'Vintage', icone: '📻', efeito: 'sepia(0.5)' },
  { nome: 'P&B', icone: '⚫', efeito: 'grayscale(1)' },
  { nome: 'Colorido', icone: '🌈', efeito: 'saturate(1.8)' },
  { nome: 'Clarear', icone: '☀️', efeito: 'brightness(1.25)' },
  { nome: 'Escurecer', icone: '🌙', efeito: 'brightness(0.75)' },
  { nome: 'Inverter', icone: '🔄', efeito: 'invert(1)' },
  { nome: 'Retrô', icone: '🖼️', efeito: 'contrast(1.35) sepia(.4) saturate(1.4)' },
  { nome: 'Sonho', icone: '💫', efeito: 'blur(1.5px) brightness(1.15)' }
];

const fotos = criarFotosDeExemplo();
const stickers = ['❤️','😂','😍','😎','🔥','⭐','🎉','✨','💖','👍','👑','🎮'];
let fotoAtual = null;
let filtroAtual = 'none';
const ajustes = { brightness: 100, contrast: 100, saturation: 100, blur: 0 };

const filtersGrid = document.getElementById('filtersGrid');
const galleryGrid = document.getElementById('galleryGrid');
const previewImage = document.getElementById('previewImage');
const noImage = document.querySelector('.no-image');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');

/*Chamar elemento do html */
const stickersGrid = document.getElementById('stickersGrid');
const stickersContainer = document.getElementById('stickersContainer');

const brightnessSlider = document.getElementById('brightnessSlider');
const contrastSlider = document.getElementById('contrastSlider');
const saturationSlider = document.getElementById('saturationSlider');
const blurSlider = document.getElementById('blurSlider');
const brightnessValue = document.getElementById('brightnessValue');
const contrastValue = document.getElementById('contrastValue');
const saturationValue = document.getElementById('saturationValue');
const blurValue = document.getElementById('blurValue');


function criarFotosDeExemplo() {
  return [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=500&fit=crop'
  ];
}


function montarFiltros() {
  filtersGrid.innerHTML = '';

  filtros.forEach((filtro, indice) => {
    const botao = document.createElement('button');
    botao.className = 'filter-item';
    if (indice === 0) botao.classList.add('active');
    botao.dataset.efeito = filtro.efeito;

    botao.innerHTML = `
      <div class="filter-preview" style="--thumb: url('${fotos[0]}'); filter: ${filtro.efeito};"></div>
      <span class="filter-name">${filtro.icone} ${filtro.nome}</span>
    `;

    botao.addEventListener('click', () => aplicarFiltro(filtro.efeito, botao));
    filtersGrid.appendChild(botao);
  });
}
/*Função para montar stickers */
function montarStickers() {
  stickersGrid.innerHTML = '';
  /*const stickers = ['❤️','😂','😍','😎','🔥','⭐','🎉','✨','💖','👍','👑','🎮']; */
  stickers.forEach(emoticon =>{
    const botao = document.createElement('button')
    botao.className = 'sticker-item'
    botao.textContent = emoticon
    botao.addEventListener('click', ()=> adicionarSticker(emoticon))
    stickersGrid.appendChild(botao)

  })

}

function montarGaleria() {
  galleryGrid.innerHTML = '';

  fotos.forEach((foto, indice) => {
    const botao = document.createElement('button');
    botao.className = 'gallery-item';
    botao.innerHTML = `<img src="${foto}" alt="Foto de exemplo ${indice + 1}">`;

    botao.addEventListener('click', () => escolherFoto(foto, botao));
    galleryGrid.appendChild(botao);
  });
}

function escolherFoto(foto, botaoClicado) {
  fotoAtual = foto;
  previewImage.src = foto;
  previewImage.style.display = 'block';
  noImage.style.display = 'none';

  document.querySelectorAll('.gallery-item').forEach(botao => botao.classList.remove('active'));
  botaoClicado.classList.add('active');

  aplicarEstiloNaTela();
}

function aplicarFiltro(efeito, botaoClicado) {
  filtroAtual = efeito;

  document.querySelectorAll('.filter-item').forEach(botao => botao.classList.remove('active'));
  botaoClicado.classList.add('active');

  aplicarEstiloNaTela();
}

function montarFiltroCompleto() {
  return `${filtroAtual} brightness(${ajustes.brightness}%) contrast(${ajustes.contrast}%) saturate(${ajustes.saturation}%) blur(${ajustes.blur}px)`;
}

function aplicarEstiloNaTela() {
  previewImage.style.filter = montarFiltroCompleto();
}

function atualizarAjuste(nome, valor, elementoValor, unidade) {
  ajustes[nome] = Number(valor);
  elementoValor.textContent = `${valor}${unidade}`;
  aplicarEstiloNaTela();
}

/*FUNÇÃO Add Stickers na foto */
function adicionarSticker(sticker) {
  if(!fotoAtual){
    mostrarMensagem("Escolha uma foto antes de enfeitar ela.")
    return;
  }

  const elemento = document.createElement('div')
  elemento.className = 'sticker-on-image';
  elemento.textContent = sticker;
  elemento.style.left = '50%';
  elemento.style.top = '50%';
  elemento.style.transform = 'translate(-50%, -50%)'

  stickersContainer.appendChild(elemento)


}

function salvarFoto() {
  if (!fotoAtual) {
    mostrarMensagem('Escolha uma foto primeiro. Professor sofre, mas o botão não adivinha 😄');
    return;
  }

  const imagem = new Image();
  imagem.crossOrigin = 'anonymous';
  imagem.onload = () => {
    canvas.width = imagem.width;
    canvas.height = imagem.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = filtroAtual;
    ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);
    ctx.filter = 'none';

    const link = document.createElement('a');
    link.download = 'foto-editada-aula-02.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  imagem.onerror = () => {
    mostrarMensagem('Erro ao carregar a imagem para salvar. Use um servidor local ou imagens com CORS habilitado.');
  };
  imagem.src = fotoAtual;
}

function resetarFoto() {
  filtroAtual = 'none';
  ajustes.brightness = 100;
  ajustes.contrast = 100;
  ajustes.saturation = 100;
  ajustes.blur = 0;

  brightnessSlider.value = 100;
  contrastSlider.value = 100;
  saturationSlider.value = 100;
  blurSlider.value = 0;

  brightnessValue.textContent = '100%';
  contrastValue.textContent = '100%';
  saturationValue.textContent = '100%';
  blurValue.textContent = '0px';

  previewImage.style.filter = 'none';

  document.querySelectorAll('.filter-item').forEach((botao, indice) => {
    botao.classList.toggle('active', indice === 0);
  });
  stickersContainer.innerHTML = '';
  mostrarMensagem('Filtro resetado!');
}

function mostrarMensagem(texto) {
  const antiga = document.querySelector('.message');
  if (antiga) antiga.remove();

  const mensagem = document.createElement('div');
  mensagem.className = 'message';
  mensagem.textContent = texto;
  document.body.appendChild(mensagem);

  setTimeout(() => mensagem.remove(), 2600);
}

saveBtn.addEventListener('click', salvarFoto);
resetBtn.addEventListener('click', resetarFoto);
brightnessSlider.addEventListener('input', () => atualizarAjuste('brightness', brightnessSlider.value, brightnessValue, '%'));
contrastSlider.addEventListener('input', () => atualizarAjuste('contrast', contrastSlider.value, contrastValue, '%'));
saturationSlider.addEventListener('input', () => atualizarAjuste('saturation', saturationSlider.value, saturationValue, '%'));
blurSlider.addEventListener('input', () => atualizarAjuste('blur', blurSlider.value, blurValue, 'px'));

montarFiltros();
montarStickers();
montarGaleria();

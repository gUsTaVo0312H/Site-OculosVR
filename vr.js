/* Interação opcional para abrir o vídeo ao olhar para o ponto laranja. */
AFRAME.registerComponent('abre-video', {
  init: function () {
    const video = document.querySelector('#vid');
    const tela = document.querySelector('#tela-video');
    this.el.addEventListener('click', () => {
      tela.setAttribute('visible', true);
      video.play().catch(() => {
        const aviso = document.querySelector('#aviso-video');
        if (aviso) aviso.textContent = 'Não foi possível iniciar o vídeo. Verifique o arquivo e tente novamente.';
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('#vid');
  const aviso = document.querySelector('#aviso-video');
  if (!video || !aviso) return;
  video.addEventListener('error', () => {
    aviso.textContent = 'O panorama continua disponível. O vídeo opcional maquina1.mp4 ainda não foi adicionado.';
  });
});

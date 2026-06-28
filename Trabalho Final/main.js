document.addEventListener('DOMContentLoaded', () => {
  // Menu mobile
  const btnMenu = document.getElementById('btn-menu');
  if (btnMenu) {
    btnMenu.addEventListener('click', toggleMenu);
  }

  // Formulário
  const formulario = document.getElementById('formulario');
  if (formulario) {
    formulario.addEventListener('submit', enviarFormulario);
  }

  // Filtro de projetos
  const botoesFiltro = document.querySelectorAll('.btn-filtro');
  if (botoesFiltro.length > 0) {
    botoesFiltro.forEach((botao) => {
      botao.addEventListener('click', () => {
        filtrar(botao, botao.dataset.categoria);
      });
    });
  }
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  const btn = document.getElementById('btn-menu');
  if (!menu || !btn) return;

  const abriu = menu.classList.toggle('aberto');
  btn.setAttribute('aria-expanded', String(abriu));
}

function enviarFormulario(evento) {
  evento.preventDefault();

  const form = evento.currentTarget;
  const nome = document.getElementById('nome').value.trim();

  // Validação nativa do HTML5 (sem regex)
  if (!form.checkValidity()) {
    form.reportValidity(); // mostra mensagem do navegador
    exibirFeedback('Por favor, preencha os campos corretamente.', 'erro');
    return;
  }

  console.log('Dados do formulário válidos');
  exibirFeedback(`Mensagem enviada com sucesso, ${nome}!`, 'sucesso');
  form.reset();
}

function exibirFeedback(mensagem, tipo) {
  const feedback = document.getElementById('feedback');
  if (!feedback) return;

  feedback.textContent = mensagem;
  feedback.classList.remove('sucesso', 'erro');
  feedback.classList.add(tipo);

  setTimeout(() => {
    feedback.textContent = '';
    feedback.classList.remove('sucesso', 'erro');
  }, 4000);
}

function filtrar(botaoClicado, categoria) {
  const projetos = document.querySelectorAll('.projeto');
  const botoes = document.querySelectorAll('.btn-filtro');

  botoes.forEach((b) => b.classList.remove('ativo'));
  botaoClicado.classList.add('ativo');

  projetos.forEach((projeto) => {
    const mesmaCategoria = projeto.dataset.categoria === categoria;
    projeto.style.display = (categoria === 'todos' || mesmaCategoria) ? 'block' : 'none';
  });
}
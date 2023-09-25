$(document).ready(function () {
  $("input").on("input", function () {
    $(this).addClass("interacted");
    if (this.checkValidity()) {
      $(this).css("border", "2px solid green");
    } else {
      $(this).css("border", "2px solid red");
    }
  });

  $("#cadastro").on("click", function (e) {
    cadastrar();
  });
});

// Codigo pra validar email
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Verificar a força da senha
function verificarForcaSenha(senha) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(senha);
}

function validarNome(nome) {
  return nome !== "";
}

function validarIdade(idade) {
  return !isNaN(idade) && idade >= 13 && idade <= 100;
}


function cadastrar() {
  let nome = document.getElementById("nome").value;
  let idade = document.getElementById("idade").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  if (!nome || !idade || !email || !senha) {
    return window.alert("Preencha todos os campos!");
  }

  if (!validarNome(nome)) {
    return window.alert("Por favor, insira seu nome!");
  }

  if (!validarIdade(idade)) {
    return window.alert("Por favor, insira uma idade válida (entre 13 e 100)!");
  }

  if (!validarEmail(email)) {
    return window.alert("O endereço de e-mail deve estar no formato nome@domínio.com");
  }

  if (!verificarForcaSenha(senha)) {
    return window.alert("Sua senha não é forte o suficiente! Coloque uma senha mais forte!");
  }

  const values = {
    email: email,
    nome: nome,
    idade: idade,
    senha: senha,
  };

  axios
  .post("http://localhost:3000/usuario", values)
  .then((response) => {
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = "Cadastro realizado com sucesso!";
    mensagemElement.className = ''; // Limpa todas as classes
    mensagemElement.classList.add("mensagem-sucesso");
    // Limpar os campos de entrada após o cadastro bem-sucedido
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    // Redirecionar para a página de login após 2 segundos
    setTimeout(function() {
      window.location.href = "/codigo/login/Login.html";
    }, 2000);
  })
  .catch((error) => {
    const mensagemElement = document.getElementById("mensagem");
    mensagemElement.textContent = "Erro! Usuário já cadastrado!";
    mensagemElement.className = ''; // Limpa todas as classes
    mensagemElement.classList.add("mensagem-erro");

    if (error.response && error.response.data && error.response.data.message) {
      mensagemElement.textContent = error.response.data.message;
    } else {
      mensagemElement.textContent = "Ocorreu um erro inesperado!";
    }
  });
}


function togglePasswordVisibility() {
  const senhaInput = document.getElementById("senha");
  const type =
    senhaInput.getAttribute("type") === "password" ? "text" : "password";
  senhaInput.setAttribute("type", type);
}


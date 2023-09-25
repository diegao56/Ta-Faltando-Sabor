$(document).ready(function () {
  $("input").on("input", function () {
    $(this).addClass("interacted");
    if (this.checkValidity()) {
      $(this).css("border", "2px solid green");
    } else {
      $(this).css("border", "2px solid red");
    }
  });

  $("#logar").on("click", function (e) {
    login();
  });
});

// Codigo pra validar email
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validarSenha(senha) {
  return senha !== "";
}

function login() {
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  if (!email || !senha) {
    return window.alert("Preencha todos os campos!");
  }

  if (!validarEmail(email)) {
    return exibirMensagemErro("Endereço de e-mail inválido!");
  }

  if (!validarSenha(senha)) {
    return exibirMensagemErro("Por favor, insira sua senha!");
  }

  const values = {
    email: email,
    senha: senha,
  };

  axios
    .post("http://localhost:3000/usuario", values)
    .then((response) => {
      const mensagemElement = document.getElementById("mensagem");
      mensagemElement.textContent = "Login realizado com sucesso!";
      mensagemElement.className = ''; // Limpa todas as classes
      mensagemElement.classList.add("mensagem-sucesso");
      // Limpar os campos de entrada após o cadastro bem-sucedido
      document.getElementById("nome").value = "";
      document.getElementById("idade").value = "";
      document.getElementById("email").value = "";
      document.getElementById("senha").value = "";
      // Redirecionar para a página principal após 2 segundos
        setTimeout(function() {
          window.location.href = "/codigo/home-page/index.html";
        }, 2000);
    })
    .catch((error) => {
      const mensagemElement = document.getElementById("mensagem");
      mensagemElement.textContent = "Erro! As credenciais fornecidas são inválidas!";
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

// Função para limpar os campos de entrada
function limparCampos() {
  document.getElementById("email").value = "";
  document.getElementById("senha").value = "";
}


export class Alertas {
    alertaEmail = (email: string) => {
        if (!(email.replace(/\ /g, '').length > 12)) {
            return alert("Email invalido, digite um emaill válido para prosseguir!");
        }
    }

    alertaNome = (nome: string) => {
        if (!(nome.replace(/\ /g, '').length > 8)) {
            return alert("Seu nome deve possuir pelo menos 8 caracteres");
        }
    }

    alertaSenha = (senha: string) => {
        if (!(senha.length >= 8 && /\d/.test(senha) && /[a-z]/.test(senha))) {
            return alert("Digite uma senha válida!\nDeve conter 8 ou mais caracteres.\nDeve conter letras e números.");
        }
    }

    alertaTelefone = (telefone: string) => {
        if (!(telefone.length > 9)) {
            return alert("Telefone inválido, digite um telefone válido");
        }
    }

    alertaSexo = (sexo: string | null) => {
        if (sexo == null) {
            return alert("Informe o sexo.");
        }
    }
}
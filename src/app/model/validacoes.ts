import { Endereco } from './endereco';
import { Cliente } from './cliente';
import { Alertas } from './alertas';
import { DadosPagamento } from './dados-pagamento';

export class Validacoes {
    cancelarLetras(event: any) {
        let evento = event;
        let key = evento.keyCode || evento.which;
        key = String.fromCharCode(key);
        //let regex = /^[0-9.,]+$/;
        let regex = /^[0-9]+$/;
        if (!regex.test(key)) {
            evento.returnValue = false;
            if (evento.preventDefault) evento.preventDefault();
        }
    }

    cancelarNumeros(event: any) {
        let evento = event;
        let key = evento.keyCode || evento.which;
        key = String.fromCharCode(key);
        //let regex = /^[0-9.,]+$/;
        let regex = /^[a-z A-Z]+$/;
        if (!regex.test(key)) {
            evento.returnValue = false;
            if (evento.preventDefault) evento.preventDefault();
        }
    }

    verificarEndereco(endereco: Endereco) {

        return false;
    }

    verificarDadosPagamento(dadosPagamento: DadosPagamento) {
        if (dadosPagamento.numeroCartao.length == 16 && (dadosPagamento.mesValidade != "" &&
            dadosPagamento.anoValidade != "") && dadosPagamento.cvv.length == 3 &&
            dadosPagamento.nomeTitular.replace(/\ /g, '').length > 8 && this.validarCpf(dadosPagamento.cpf)) {
            return true;
        }
        return false;
    }

    validarCpf(cpf: string) {
        let soma;
        let resto;
        soma = 0;
        if (cpf == "00000000000") return false;

        for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (var i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    validarSenha(senha: string) {
        if (senha.length >= 8 && /\d/.test(senha) && /[a-z]/.test(senha)) {
            return true;
        }
        return false;
    }

    verificarDadosCliente(cliente: Cliente) {
        if (this.validarCpf(cliente.cpf ?? '') && (cliente.email ?? '').replace(/\ /g, '').length > 12 &&
            (cliente.nome ?? '').replace(/\ /g, '').length > 8 && this.validarSenha(cliente.senha ?? '') &&
            (cliente.telefone ?? '').length > 9 && cliente.sexo != null) {
            return true;
        }

        if (!this.validarCpf(cliente.cpf ?? '')) {
            alert("O cpf digitado é invalido!")
        }

        let alerta = new Alertas();
        alerta.alertaEmail(cliente.email ?? '');
        alerta.alertaNome(cliente.nome ?? '');
        alerta.alertaSenha(cliente.senha ?? '');
        alerta.alertaTelefone(cliente.telefone ?? '');
        alerta.alertaSexo(cliente.sexo ?? null);
        return false;
    }
}

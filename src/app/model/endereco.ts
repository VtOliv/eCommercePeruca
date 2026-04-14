export class Endereco {
    constructor(public cep: string,
                public logradouro: string,
                public numero: number,
                public bairro: string,
                public localidade: string,
                public uf: string,
                public destinatario?: string,
                public complemento: string = ''){}                
}

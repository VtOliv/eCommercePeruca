export class Cupom {
    constructor(
        public codCupom: number = 0,
        public desconto: number = 0,
        public nome: string = '',
        public ativo: boolean = false
    ) {}
}

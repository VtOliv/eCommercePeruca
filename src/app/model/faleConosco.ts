import { StatusFaleConosco } from './statusFaleConosco';

export class FaleConosco {
    constructor(
    public nomeCompleto: string,
    public telefone: string,
    public email: string,
    public mensagem: string,
    public statusFL: StatusFaleConosco,
    public codCliente?: number,
    public codFaleConosco?: number,
    public respondido?: boolean){}
}
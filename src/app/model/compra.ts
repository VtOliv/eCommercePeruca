import { Item } from './Item';
import { Cupom } from './cupom';
import { Status } from './status';

export class Compra {
    codEndereco: number = 0;
    vlFrete: number = 0;
    vlPedido: number = 0;
    dsFormaPagto: string = '';
    codCliente: number = 0;
    itensPedido: Item[] = [];
    cupom: Cupom = new Cupom();
    dtPedido?: Date;
    dataEntrega?: Date;
    codPedido?: number;
    status?: Status

}
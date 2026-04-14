export class Cliente {
   constructor(
   public nome?: string,
   public sexo?: string,
   public cpf?: string,
   public telefone?: string,
   public email?: string,
   public senha?: string,
   public codCliente: number = 0){}   
   
}
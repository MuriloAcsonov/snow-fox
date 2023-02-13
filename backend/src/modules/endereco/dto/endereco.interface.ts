export interface Endereco {
  fkId: number;
  enderecoId: number;
  logradouro: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
  principal: boolean;
}
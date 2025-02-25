export class Product
{
    codigo: string;
    descricao: string;
    descricaoweb: string;
    prazo: string;
    area: { codigo: string, descricao: string };
    atendimento: { codigo: string, descricao: string };
    ativo: { codigo: string, descricao: string };
    grupo: { codigo: string, descricao: string };
    tipo: { codigo: string, descricao: string };
    /**
     * Constructor
     *
     * @param product
     */
    constructor(product?)
    {
        product = product || {};
        this.codigo = product.codigo || '';
        this.descricao = product.descricao || '';
        this.descricaoweb = product.descricaoweb || '';
        this.prazo = product.prazo || '';
        this.area = product.area || {};
        this.atendimento = product.atendimento || {};
        this.ativo = product.ativo || {};
        this.grupo = product.grupo || {};
        this.tipo = product.tipo || {};
    }
}

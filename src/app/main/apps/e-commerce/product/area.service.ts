import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AreaService implements Resolve<any> {
    resolve(): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getAreas()
            ]).then(
                () => {
                    resolve(true);
                },
                reject
            );
        });
    }

    getAreas() {
        return [
            {
                "codigo": "NSI",
                "descricao": "NÚCLEO DE SISTEMAS DE INFORMACAO"
            },
            {
                "codigo": "NDS",
                "descricao": "NUCLEO DE DEMANDAS DE SAÚDE"
            },
            {
                "codigo": "NUC",
                "descricao": "NÚCLEO DE CADASTRO"
            },
            {
                "codigo": "NAG",
                "descricao": "NUCLEO DE ATENDIMENTO GERAL"
            },
            {
                "codigo": "DEN",
                "descricao": "CONTROLE DE DENUNCIAS"
            },
            {
                "codigo": "NCM",
                "descricao": "NUCLEO DE COBRANCA MEDICO HOSPITALAR"
            },
            {
                "codigo": "BEN",
                "descricao": "NUCLEO DE BENEFICIOS ESPECIAIS"
            },
            {
                "codigo": "DPR",
                "descricao": "DIVISAO DE PREVIDENCIA"
            },
            {
                "codigo": "CRC",
                "descricao": "CELULA DE RETENÇÃO DE COBRANÇAS"
            },
            {
                "codigo": "GRAC",
                "descricao": "GERENCIA EXECUTIVA DE REGULACAO, AUDITORIA E CONTROLE"
            },
            {
                "codigo": "NCR",
                "descricao": "NUCLEO DE CONTAS A RECEBER"
            },
            {
                "codigo": "RDA",
                "descricao": "DRA - REDE CREDENCIADA"
            },
            {
                "codigo": "HOC",
                "descricao": "NUCLEO DE ATENCAO DOMICILIAR (HOME CARE)"
            },
            {
                "codigo": "AEI",
                "descricao": "ASSESSORIA DE ESTRATEGIA E INFORMACOES INSTITUCIONAIS"
            },
            {
                "codigo": "REEMB",
                "descricao": "REEMBOLSOS ASSISTENCIAIS"
            },
            {
                "codigo": "ACO",
                "descricao": "NUCLEO DE COMPLIANCE E OUVIDORIA"
            },
            {
                "codigo": "GAT",
                "descricao": "DRA - GARANTIA DE ATENDIMENTO"
            },
            {
                "codigo": "ODO",
                "descricao": "NÚCLEO DE REGULAÇÃO DE ODONTOLOGIA"
            },
            {
                "codigo": "ERRJ",
                "descricao": "ESCRITORIO REGIONAL DO RIO DE JANEIRO"
            },
            {
                "codigo": "ERDF",
                "descricao": "ESCRITORIO REGIONAL DO DISTRITO FEDERAL"
            },
            {
                "codigo": "RECGLO",
                "descricao": "DAC - RECURSO DE GLOSA"
            },
            {
                "codigo": "NLG",
                "descricao": "NUCLEO DE LOGISTICA"
            },
            {
                "codigo": "PAR",
                "descricao": "NUCLEO DE CREDENCIAMENTO E PARAMETRIZACOES"
            },
            {
                "codigo": "GETL",
                "descricao": "GERENCIA EXECUTIVA DE TECNOLOGIA DA INFORMACAO E LOGISTIICA"
            },
            {
                "codigo": "GAB",
                "descricao": "GABINETE DA PRESIDENCIA"
            },
            {
                "codigo": "NGP",
                "descricao": "NUCLEO DE GESTÃO DE PESSOAS"
            },
            {
                "codigo": "AJU",
                "descricao": "ASSESSORIA JURIDICA"
            },
            {
                "codigo": "DTE",
                "descricao": "DIVISAO DE TESOURARIA"
            },
            {
                "codigo": "DPAS",
                "descricao": "DIRETORIA DE PREVIDENCIA E ASSISTENCIA"
            },
            {
                "codigo": "DAFI",
                "descricao": "DIRETORIA DE ADMINISTRACAO FINANCEIRA"
            },
            {
                "codigo": "SOC",
                "descricao": "SECRETARIA DE ORGAOS COLEGIADOS E CONTROLES INTERNOS"
            },
            {
                "codigo": "DCC",
                "descricao": "DIVISAO DE CONTABILIDADE E CONTROLE"
            },
            {
                "codigo": "ADM",
                "descricao": "ADMINISTRATIVO DAM"
            },
            {
                "codigo": "NF",
                "descricao": "CONTROLE DE NFS - GRAC"
            },
            {
                "codigo": "NNG",
                "descricao": "NÚCLEO DE NEGATIVAS ASSISTENCIAIS"
            },
            {
                "codigo": "PEG",
                "descricao": "RECEBIMENTO DE CONTAS MÉDICAS"
            },
            {
                "codigo": "DSO",
                "descricao": "DIVISAO DE SUPORTE E OPERACOES"
            },
            {
                "codigo": "BI_AEI",
                "descricao": "ASSESSORIA DE ESTRATEGIA E INFORMACOES INSTITUCIONAIS - BI"
            },
            {
                "codigo": "DIN",
                "descricao": "DIVISAO DE INVESTIMENTOS"
            },
            {
                "codigo": "CGF",
                "descricao": "CÉLULA DE GESTÃO FINANCEIRA"
            },
            {
                "codigo": "NRE",
                "descricao": "NRE - NÚCLEO DE REDE DE ATENDIMENTO"
            },
            {
                "codigo": "NRA",
                "descricao": "NUCLEO DE REGULACAO ASSISTENCIAL"
            },
            {
                "codigo": "NUP",
                "descricao": "NUCLEO DE DESENV E ACOMP. DE PRODUTOS"
            }
        ];
    }
}

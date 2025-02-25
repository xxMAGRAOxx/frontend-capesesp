import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class GrupoService implements Resolve<any> {
    resolve(): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getGrupos()
            ]).then(
                () => {
                    resolve(true);
                },
                reject
            );
        });
    }

    getGrupos() {
        return [
            {
                "codigo": "002",
                "descricao": "HOME CARE"
            },
            {
                "codigo": "000",
                "descricao": "DEMANDAS GERAIS"
            },
            {
                "codigo": "005",
                "descricao": "ROTINAS NUC"
            },
            {
                "codigo": "016",
                "descricao": "REDE CREDENCIADA - MOVIMENTAÇÕES"
            },
            {
                "codigo": "021",
                "descricao": "DENUNCIAS"
            },
            {
                "codigo": "019",
                "descricao": "DEMANDAS NCM"
            },
            {
                "codigo": "012",
                "descricao": "ROTINAS NAC"
            },
            {
                "codigo": "011",
                "descricao": "ROTINAS DPR"
            },
            {
                "codigo": "009",
                "descricao": "ROTINAS GERG"
            },
            {
                "codigo": "008",
                "descricao": "ROTINAS NCR"
            },
            {
                "codigo": "004",
                "descricao": "ROTINAS NRE"
            },
            {
                "codigo": "010",
                "descricao": "ROTINAS NRA"
            },
            {
                "codigo": "003",
                "descricao": "REEMBOLSOS ASSISTENCIAIS"
            },
            {
                "codigo": "015",
                "descricao": "DEMANDAS NSI"
            },
            {
                "codigo": "018",
                "descricao": "FALE CONOSCO"
            },
            {
                "codigo": "001",
                "descricao": "GARANTIA DE ATENDIMENTO"
            },
            {
                "codigo": "022",
                "descricao": "REDE CREDENCIADA - ANALISE ESPECIAL"
            },
            {
                "codigo": "006",
                "descricao": "ROTINAS NLG"
            },
            {
                "codigo": "017",
                "descricao": "OUVIDORIA"
            },
            {
                "codigo": "007",
                "descricao": "ROTINAS NGP"
            },
            {
                "codigo": "020",
                "descricao": "DEMANDAS SEG"
            },
            {
                "codigo": "028",
                "descricao": "AMUC"
            },
            {
                "codigo": "013",
                "descricao": "REDE CREDENCIADA - SOLICITAÇÕES ASSISTENCIAIS"
            },
            {
                "codigo": "026",
                "descricao": "CONTINGENCIA TISS"
            },
            {
                "codigo": "023",
                "descricao": "DEMANDAS AVULSAS DA WEB"
            },
            {
                "codigo": "025",
                "descricao": "ROTINAS CRC"
            },
            {
                "codigo": "027",
                "descricao": "DEMANDAS DA AEI"
            },
            {
                "codigo": "034",
                "descricao": "SIMULADORES DE PREVIDENCIA"
            },
            {
                "codigo": "032",
                "descricao": "BENEFICIÁRIOS - PLANO MULTI ENTES"
            },
            {
                "codigo": "035",
                "descricao": "RECUPERACAO DE CREDITOS"
            },
            {
                "codigo": "036",
                "descricao": "DEMANDAS NUP"
            },
        ];
    }
}

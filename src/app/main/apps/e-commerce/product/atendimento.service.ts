import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AtendimentoService implements Resolve<any> {
    resolve(): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getAtendimentos()
            ]).then(
                () => {
                    resolve(true);
                },
                reject
            );
        });
    }

    getAtendimentos() {
        return [
            {
                "codigo": "1",
                "descricao": "Beneficiário / Vida"
            },
            {
                "codigo": "3",
                "descricao": "Beneficiário/Vida/Pr"
            },
            {
                "codigo": "5",
                "descricao": "Todas"
            },
            {
                "codigo": "2",
                "descricao": "Prestador"
            },
            {
                "codigo": "4",
                "descricao": "Administrativo"
            },
            {
                "codigo": "6",
                "descricao": "Ente Federativo"
            }
        ];
    }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class TipoService implements Resolve<any>
{   
    resolve(): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getTipos()
            ]).then(
                () => {
                    resolve(true);
                },
                reject
            );
        });
    }

    getTipos() {
        return [
            {
                "codigo": "1",
                "descricao": "Assistencia"
            },
            {
                "codigo": "4",
                "descricao": "Administrativa"
            },
            {
                "codigo": "3",
                "descricao": "Previdencia"
            },
            {
                "codigo": "2",
                "descricao": "Peculio"
            }
        ];
    }
}

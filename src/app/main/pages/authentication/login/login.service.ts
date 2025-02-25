import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
    providedIn: 'root',
})

export class LoginServices {

    API_URL = environment.api_url;

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    /**
     * Chama o serviço de autenticação do usuário
     * 
     * @param email E-mail do usuário
     * @param password  Senha
     * @param trustedDevice  uiid do dispositivo salvo como confiavel
     * @returns 
     */
    authenticate(data): any {
        let passmd5 = Md5.hashStr(data.password);
        return this._httpClient.post<any>(this.API_URL + 'auth/',
            {
                'matricula': data.matricula,
                'password': passmd5,
            },
            this.getHeaders());
    }

    getHeaders(contentType?): any {
        let token = sessionStorage.getItem('auth-token');
        let headers;
        if (contentType) {
            headers = {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + token
                }),
            };
        } else {
            headers = {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }),
            };
        }

        return headers;
    }

}






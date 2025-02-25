import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralServices } from 'services/general.service';

@Injectable({
    providedIn: 'root'
})
export class FilePreviewService {

    constructor(
        private _httpClient: HttpClient,
        private _generalServices: GeneralServices
    ) { }

    /**
     * Faz get na imagem pra validar se existe
     * 
     * @returns 
     */
    fetchImage(url: string): Observable<any> {
        return this._httpClient.get<any>(url);
    }
}
import { Injectable } from '@angular/core';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { DefaultPostType } from 'app/types/default-post.type';
import { DefaultPutType } from 'app/types/default-put.type';
import { HealthcareCardDataController } from 'controllers/admin/healtcare-card-data.controller';
import { GeneralServices } from 'services/general.service';

@Injectable({
    providedIn: 'root'
})
export class HealthcareCardDataService {

    processing: number;

    constructor(
        private _generalServices: GeneralServices,
        private _fuseProgressBarService: FuseProgressBarService,
        private _HealthcareCardDataController: HealthcareCardDataController,
    ) {
        this.processing = 0;
    }

    showProgressBar() {
        if (this.processing > 0) {
            this._fuseProgressBarService.show();
        } else {
            this._fuseProgressBarService.hide();
        }
    }

    /**
     * Salva um registro
     * 
     * @param editCellsID Identificador do registro, ou nulo quando inclusão
     * @param data Dados a salvar
     * @returns {Promise<DefaultPostType | DefaultPutType>}
     */
    async save(editCellsID: number, data: any, type: string): Promise<DefaultPostType | DefaultPutType> {
        this.processing++;
        this.showProgressBar();

        return await this._HealthcareCardDataController.save(editCellsID, data, type).then((result) => {
            return result;
        }).catch((err) => {
            this._generalServices.handleErrors(err);
            throw err;
        }).finally(() => {
            this.processing--;
            this.showProgressBar();
        });
    }

}

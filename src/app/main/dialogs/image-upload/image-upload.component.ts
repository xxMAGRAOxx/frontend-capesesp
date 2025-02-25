import { AfterViewInit, Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralServices } from 'services/general.service';
import { DropZoneUtils } from 'utils/dropzoneutils';

@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImageUploadComponent {
    action: string;
    imageForm: FormGroup;
    dialogTitle: string;
    saving = false;

    types: any;

    hasImage = false;

    dropZoneConfig: any;
    dropZoneUtils: any;

    public icon_image = "<i class='material-icons' style='font-size: 100px'>photo_camera</i>"

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ImageUploadComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _generalServices: GeneralServices,
    ) {
        this.imageForm = this.createImageForm();

        this.dropZoneUtils = new DropZoneUtils(this._generalServices);

        this.dropZoneConfig = this.dropZoneUtils.config;
        this.dropZoneConfig.resizeHeight = _data.imgHeight;
        this.dropZoneConfig.resizeWidth = _data.imgWidth;
        this.dropZoneConfig.thumbnailHeight = _data.thumbHeight;
        this.dropZoneConfig.thumbnailWidth = _data.thumbWidth;

        if (_data.isAzure) {
            this.dropZoneConfig.url += '/true';
        }
    }

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createImageForm(): FormGroup {
        return this._formBuilder.group({
            image_name: '',
            image_url: ''
        });
    }

    goSave() {
        this.saving = true;
        this.matDialogRef.close(['save', this.imageForm]);
    }

    removePicture(event) {
        if (!this.saving) {
            this.imageForm.controls.image_name.setValue('');
            this.imageForm.controls.image_url.setValue('');
        }

    }
    changeDropzone() {
    }
    onUploadSuccess(event) {
        //this.config.clickable = false;
        this.dropZoneConfig.createImageThumbnails = true;

        this.imageForm.controls.image_name.setValue(event[1].file_name);
        this.imageForm.controls.image_url.setValue(event[1].file_url);

        this.hasImage = true;
    }

    onUploadError(event) {
        console.log(event);
        this.imageForm.controls.image_name.setValue('');
        this.imageForm.controls.image_url.setValue('');
        this.dropZoneConfig.errorReset
    }
}

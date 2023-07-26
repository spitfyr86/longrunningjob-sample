import { Injectable } from '@angular/core';
import { Logger } from '../helpers/log.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class GCStorageService {

    constructor(private logger: Logger) {}

    // public async deleteFileAsync(prefix: string, filename: string): Promise<void> {
    //     const fileInBucket = `${prefix}/${filename}`;
    //     await GCStorageService.gcStorage.bucket(environment.GS_BUCKET_NAME)
    //         .file(fileInBucket)
    //         .delete();
    // }

    // public async isFileExist(prefix: string, filename: string): Promise<boolean> {
    //     try {
    //         // tslint:disable-next-line
    //         const fileInBucket = `${prefix}/${filename}`
    //         const files = await GCStorageService.gcStorage.bucket(environment.GS_BUCKET_NAME).getFiles({ prefix: prefix });
    //         const fileExist = files[0].filter(obj => {
    //             return fileInBucket === obj.name;
    //         })[0]

    //         if (!fileExist) {
    //             this.logger.log(`${filename} does not exist in the bucket ${environment.GS_BUCKET_NAME}.`);
    //             return false;
    //         }
    //         return true;
    //     } catch (error) {
    //         this.logger.log(error);
    //         return false;
    //     }
    // }

    // public async uploadFileAsync(filename: string, filepath: string): Promise<UploadResult | null> {
    //     try {
    //         const prefix = environment.GS_PDF_UPLOAD_PATH;

    //         if ((await this.isFileExist(prefix, filename))) {
    //             // If file has the same name, delete the file first then save new one
    //             await this.deleteFileAsync(prefix, filename);
    //         }

    //         await GCStorageService.gcStorage.bucket(environment.GS_BUCKET_NAME)
    //             .upload(filepath, {
    //                 destination: `${prefix}/${filename}`,
    //             });

    //         return {
    //             bucketname: <string>environment.GS_BUCKET_NAME,
    //             directory: prefix,
    //             filename: filename,
    //             originalFilename: filename,
    //         };

    //     } catch (error) {
    //         this.logger.log(error);
    //         return null;
    //     }
    // }
}

export interface UploadResult {
    originalFilename: string;
    filename: string;
    bucketname: string;
    directory: string;
}

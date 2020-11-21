import { Injectable } from '@angular/core';
import {FileType} from '../options/fileType';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class FileService {

    private savePath = 'D:/tempShinySave';

    constructor(private electronServiceInstance: ElectronService) { }

    private getPath(huntName: string): string {
        return `${this.savePath}/${huntName}`;
    }

    read(huntName: string, fileType: FileType): Promise<string> {
        return null;
    }

    write(huntName: string, fileType: FileType, content: any): Promise<any> {
        return new Promise<boolean>((resolve => {
            this.electronServiceInstance.ipcRenderer.send('WRITE_FILE_TEXT', {
                path: this.getPath(huntName),
                fileName: fileType,
                content: String(content)
            });

            resolve(true);
        }));
    }
}

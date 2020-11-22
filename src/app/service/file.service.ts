import { Injectable } from '@angular/core';
import {FileType} from '../options/fileType';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class FileService {

    constructor(private electronServiceInstance: ElectronService) { }

    read(huntName: string, fileType: FileType): Promise<string> {
        return null;
    }

    write(huntName: string, fileType: FileType, content: any): Promise<boolean> {
        return new Promise<boolean>((resolve => {
            this.electronServiceInstance.ipcRenderer.send('WRITE_FILE_TEXT', {
                hunt: huntName,
                fileName: fileType,
                content: String(content)
            });

            resolve(true);
        }));
    }
}

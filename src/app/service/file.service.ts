import { Injectable } from '@angular/core';
import {FileType} from '../options/fileType';

@Injectable({
  providedIn: 'root'
})
export class FileService {

    private savePath = 'D:/tempShinySave';

    constructor() { }

    private getPath(huntName: string): string {
        return `${this.savePath}/${huntName}/`;
    }

    read(huntName: string, fileType: FileType): Promise<string> {
        return null;
    }

    write(huntName: string, fileType: FileType, content: any): Promise<any> {
        return null;
    }
}

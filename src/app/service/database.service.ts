import {Injectable} from '@angular/core';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import {Hunt} from '../models/hunt';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public connection: Promise<Connection>;
  private readonly options: ConnectionOptions;

  constructor() {
    this.options = {
      type: 'sqlite',
      database: 'database.db',
      entities: [Hunt],
      synchronize: true,
      logging: 'all'
    };
    this.connection = createConnection(this.options);
  }
}

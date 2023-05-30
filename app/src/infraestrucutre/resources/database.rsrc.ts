import {createClient} from 'redis'
import { DatabaseInterface } from '../../domain/interfaces/database.interface';
import { CardType } from 'app/src/domain/types/card.type';

export class Database implements DatabaseInterface {
    async getConnection(){
      const client = createClient({
        socket: {
          host: 'localhost',
          port: 6379,
        }
      })
      client.on('error', err => console.log('Redis Server Error', err));
      await client.connect();
      return client
    }

    async store(card: any,token:string): Promise<void> {
        await (await this.getConnection()).set(token, JSON.stringify(card));          
    }
    async retrive(token:string): Promise<string> {
      return await (await this.getConnection()).get(token) as string
    }
}
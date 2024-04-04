import { Client } from 'discord.js';
import { Notice } from './schedule/Notice';
import { config } from './util/config';

export class Bot {
    constructor(
      private readonly client: Client
    ){
      this.onReady();
      this.onMemberJoin();

      const notice = new Notice(this.client);
      notice.beforeAlert();
      notice.afterAlert();

      this.client.login(config.discordToken);
    }

    private onReady(){
      this.client.on('ready', () => {
        console.log(`${this.client.user?.tag} 시작!`)
      });
    }

    private onMemberJoin(){
      this.client.on('guildMemberAdd', (member) => {
      
      })
    }
}
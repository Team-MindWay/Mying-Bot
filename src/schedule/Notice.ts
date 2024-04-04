import dayjs from 'dayjs';
import { ActionRowBuilder, BaseGuildTextChannel, ButtonBuilder, ButtonStyle, Client } from "discord.js";
import cron from 'node-cron';
import { checkRepository } from '../repository/CheckRepository';

export class Notice {
    constructor(
        private readonly client: Client
    ){}

    public beforeAlert(){
        const check = new ButtonBuilder()
            .setCustomId('check')
            .setLabel('사용할게요!')
            .setStyle(ButtonStyle.Primary)
            .setEmoji("✅")

        const row = new ActionRowBuilder<ButtonBuilder>({
            components: [check]
        });

        cron.schedule("0 8 * * 1,2,3", async () => {
            const date = dayjs(new Date()).format("YYYY-MM-DD");
            checkRepository.createCheck(date)

            const channel = await this.client.channels.fetch("1215103574049034282") as BaseGuildTextChannel

            const message = await channel.send({
                content: `<@&1215103721529155594>\n**${date}** 실 사용신청 *(오후 1시까지만 인원모집합니다.)*\n실 사용 신청을 하시려면 아래 **버튼**을  클릭 해주세요.\n\n- 아침시간 / 점심시간에는 신청없이 자유롭게 사용하실 수 있습니다.`,
                components: [row]
            })

            const collector = message.createMessageComponentCollector()

            collector.on('collect', async (interaction) => {
                if(interaction.customId === 'check'){
                    interaction.user.send("asdf");
                    checkRepository.addUser(interaction.user.id, interaction.user.displayName, date)   
                }
            })
        })
    }

    public afterAlert(){
        cron.schedule("0 13 * * 1,2,3", async () => {
            const date = dayjs(new Date()).format("YYYY-MM-DD");
            
            const channel = await this.client.channels.fetch("1215103574049034282") as BaseGuildTextChannel

            await channel.send({
                content: `<@&1215103721529155594>\n**${date}** 실 사용신청을 마감합니다.`,
            })
        })
    }
}
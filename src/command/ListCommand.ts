import dayjs from "dayjs";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "src/entity/Command";
import { checkRepository } from "../repository/CheckRepository";

export default {
  data: new SlashCommandBuilder().setName("list"),
  async execute(interaction: ChatInputCommandInteraction) {
    const check = await checkRepository.getCheck(dayjs(new Date()).format("YYYY-MM-DD"))

    await interaction.reply({
      content: check.users.toString(),
      ephemeral: false
    });
  }
} as Command;
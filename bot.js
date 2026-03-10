const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const TRAP_ROLE = "16";

client.once("ready", () => {
  console.log(`Trap bot online as ${client.user.tag}`);
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  const hadRole = oldMember.roles.cache.some(r => r.name === TRAP_ROLE);
  const hasRole = newMember.roles.cache.some(r => r.name === TRAP_ROLE);

  if (!hadRole && hasRole) {
    try {
      await newMember.ban({ reason: "Selected underage role (trap)" });
      console.log(`Banned ${newMember.user.tag}`);
    } catch (err) {
      console.error(err);
    }
  }
});

client.login(process.env.TOKEN);
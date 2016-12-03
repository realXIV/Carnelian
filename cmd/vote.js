exports.run = (bot, msg, params = []) => {
  msg.channel.sendMessage(`${msg.author.username} created a vote on \`${params.join(" ")}\`. The vote will end in 30s, type yes or no in the chat to vote!`)
  var yes = 0;
  var no = 0;
    const votecollector = msg.channel.createCollector(m => m.channel === msg.channel, {time: 30000});
    votecollector.on(`message`, m => {
        if (m.content === `no` && !msg.author.voted){
            no++;
            msg.author.voted = true;
          }
        if (m.content === `yes` && !msg.author.voted){
            yes++;
            msg.author.voted = true;
          }
    });
    votecollector.on(`end`, (collected, reason) => {
        if (yes > no){
          msg.channel.sendMessage(`Voting on \`${params.join(" ")}\` has ended. Yes won with ${yes} votes. No only had ${no} votes. :cry: `)
        }
        if (yes < no){
          msg.channel.sendMessage(`Voting on \`${params.join(" ")}\` has ended. No won with ${no} votes. In comparison, yes only had ${yes} votes. Pitiful. :joy: `)
        }
});
};
exports.help = {
    name: `vote`,
    description: `Intiates a vote.`,
    usage: `vote <issue/topic>`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 1
};

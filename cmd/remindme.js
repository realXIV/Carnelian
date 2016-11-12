exports.run = (bot, msg, params = []) => {
  var mins = params[0]
  mins = parseInt(mins) * 60 * 1000;
  if (isNaN(mins)){
      msg.channel.sendMessage(`${params[0]} is not a valid quantity of time.`)
      return;
  }
  params.shift();
  var reminder = params.join(" ")
  msg.channel.sendMessage(`Reminder for \`${reminder}\` set for ${params[0]} minute(s).`)
  setTimeout(function(){ reply(msg, reminder); }, mins);
};

function reply(msg, reminder) {
  return msg.reply(` ${reminder}`)
};

exports.help = {
    name: "remindme",
    description: "Reminds you of x in y minutes",
    usage: "remindme"
};

exports.conf = {
  enabled: true,
  aliases: ['remind'],
  permLevel: 0
};
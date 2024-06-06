const { zokou } = require("../framework/zokou");
const conf = require("../set");
const { jidDecode } = require("@whiskeysockets/baileys");
const fs = require("fs");

zokou({
  nomCom: "svcontact",
  categorie: "updates",
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;
  let jid = null;
  let nom = null;

  if (!msgRepondu) {
    jid = auteurMessage;
    nom = nomAuteurMessage;

    try { ppUrl = await zk.profilePictureUrl(jid, 'image'); } catch { ppUrl = conf.IMAGE_MENU };
    const status = await zk.fetchStatus(jid);

    mess = {
      image: { url: ppUrl },
      caption: '*Nom :* ' + nom + '\n*Status :*\n' + status.status
    };

  } else {
    jid = auteurMsgRepondu;
    nom = "@" + auteurMsgRepondu.split("@")[0];

    try { ppUrl = await zk.profilePictureUrl(jid, 'image'); } catch { ppUrl = conf.IMAGE_MENU };
    const status = await zk.fetchStatus(jid);

    mess = {
      image: { url: ppUrl },
      caption: '*Name :* ' + nom + '\n*Status :*\n' + status.status,
      mentions: [auteurMsgRepondu]
    };

    // Extracting and saving contact numbers with group name
    const number = auteurMsgRepondu.replace("@c.us", "").replace("@s.whatsapp.net", "");
    const groupName = "[LZK-MD]";
    fs.appendFile(groupName + '.txt', number + '\n', (err) => {
      if (err) throw err;
      console.log('Contact saved for group: ' + groupName);
    });
  }

  zk.sendMessage(dest, mess, { quoted: ms });
});

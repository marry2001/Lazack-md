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

    // Generate VCF content
    const vcfContent = `BEGIN:VCARD
VERSION:3.0
FN:${nom}
PHOTO;VALUE=URL;TYPE=JPEG:${ppUrl}
NOTE:${status.status}
END:VCARD`;

    // Save VCF content to file
    fs.writeFile(`${nom}.vcf`, vcfContent, (err) => {
      if (err) throw err;
      console.log('VCF saved for contact: ' + nom);
    });

  } else {
    jid = auteurMsgRepondu;
    nom = "@" + auteurMsgRepondu.split("@")[0];

    try { ppUrl = await zk.profilePictureUrl(jid, 'image'); } catch { ppUrl = conf.IMAGE_MENU };
    const status = await zk.fetchStatus(jid);

    // Generate VCF content
    const vcfContent = `BEGIN:VCARD
VERSION:3.0
FN:${nom}
PHOTO;VALUE=URL;TYPE=JPEG:${ppUrl}
NOTE:${status.status}
END:VCARD`;

    // Save VCF content to file
    fs.writeFile(`${nom}.vcf`, vcfContent, (err) => {
      if (err) throw err;
      console.log('VCF saved for contact: ' + nom);
    });

    // Extracting and saving contact numbers with group name
    const number = auteurMsgRepondu.replace("@c.us", "").replace("@s.whatsapp.net", "");
    const groupName = "[LZK-MD]";
    fs.appendFile(groupName + '.txt', number + '\n', (err) => {
      if (err) throw err;
      console.log('Contact saved for group: ' + groupName);
    });
  }
});

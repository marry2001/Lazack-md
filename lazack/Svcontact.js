const fs = require('fs');
const { zokou } = require("../framework/zokou");

zokou.svcontactCommand({
    nomCom: "mention",
    categorie: "mods"
}, async (dest, svc, commandOptions) => {
    let numbers = []; // Array to store numbers

    // Assuming `getData` retrieves all numbers in the group
    const groupData = await getData(message.group.id);

    // Extract numbers from groupData and push them into the array
    groupData.forEach(member => {
        if (member.number) {
            numbers.push(member.number);
        }
    });

    // Write numbers to a file
    fs.writeFile('[LZK-MD].txt', numbers.join('\n'), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File saved successfully!');
    });
});

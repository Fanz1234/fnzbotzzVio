import fs from 'fs'
const nonstop = 24 * 60 * 60 * 1000;

let handler = async (m, { conn }) => {
    const messages = conn.chats[m.chat].messages;
    const participantCounts = {};
    Object.values(messages).forEach(({ key }) =>
        participantCounts[key.participant] = (participantCounts[key.participant] || 0) + 1
    );
    const sortedData = Object.entries(participantCounts)
        .sort((a, b) => b[1] - a[1]);
    const totalM = sortedData.reduce((acc, [, total]) => acc + total, 0);
    const totalPeople = sortedData.length;
    const pesan = sortedData
        .map(([jid, total], index) => `*${index + 1}.* ${jid.replace(/(\d+)@.+/, '@$1')}: *${total}* pesan`)
        .join('\n');
    let userData = readUserData();

    if (is24HoursPassed(userData.lastResetTime)) {
        userData = { users: [], totalChat: 0, lastResetTime: Date.now() };
    }

    userData = updateUserData(userData, sortedData);
    saveUserData(userData);

    await m.reply(
        `📊 *Total Pesan Terakhir*: *${totalM}* pesan dari *${totalPeople}* orang\n\n${pesan}`,
        null,
        {
            contextInfo: {
                mentionedJid: sortedData.map(([jid]) => jid)
            }
        }
    );
};

handler.help = ['totalpesan'];
handler.tags = ['group'];
handler.command = /^(totalpesan)$/i;
handler.group = true;

export default handler;

function readUserData() {
    try {
        const data = fs.readFileSync('./database/userdata.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { users: [], totalChat: 0, lastResetTime: 0 };
    }
}

function updateUserData(userData, sortedData) {
    const updatedUsers = sortedData.map(([jid, total]) => ({
        jid,
        totalMessages: total
    }));
    const totalChat = sortedData.reduce((acc, [, total]) => acc + total, 0);

    return {
        users: updatedUsers,
        totalChat: userData.totalChat + totalChat,
        lastResetTime: userData.lastResetTime // Keep the last reset time
    };
}

function saveUserData(userData) {
    const data = JSON.stringify(userData, null, 2);
    fs.writeFileSync('./database/userdata.json', data);
}

function is24HoursPassed(lastResetTime) {
    const currentTime = Date.now();
    return currentTime - lastResetTime >= nonstop;
}
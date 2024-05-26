let handler = async (m, { conn, text, setReply, command }) => {
    const fs = require('fs').promises;

    async function listCaseNames(filePath) {
      try {
        const data = await fs.readFile(filePath, 'utf8');
        
        const caseNames = [];
        const lines = data.split('\n');
        lines.forEach((line) => {
          const caseMatch = line.match(/case\s+['"]([^'"]+)['"]/);
          if (caseMatch && !caseNames.includes(caseMatch[1])) {
            caseNames.push(caseMatch[1]);
          }
        });
    
        return caseNames;
      } catch (err) {
        throw err;
      }
    }
    
    // Contoh penggunaan:
    const filePath = './plugins/Case/case.js';
    listCaseNames(filePath)
      .then((caseNames) => {
let teks = `––––––『 *LIST CASE* 』––––––
        
Total: ${caseNames.length}
`
        caseNames.forEach((caseName) => {
          teks += `\n • ${caseName}`
        });
        setReply(teks)
      })
      .catch((err) => {
        console.error(err);
      });
};

handler.help = ["no"]
handler.tags = ["info"];
handler.command = ["listcase"];
export default handler;

const fs = require("fs").promises;
const path = require("path")
const uploadsConfig = require("../configs/upload")

class diskstorage {
      async saveFile(file) {
        const tmpFilePath = path.resolve(uploadsConfig.TMP_FOLDER, file);
        const targetFilePath = path.resolve(uploadsConfig.UPLOADS_FOLDER, file);
      
        while (true) {
          try {
            await fs.access(tmpFilePath);
            console.log("Arquivo disponível na pasta TMP. Movendo para a pasta UPLOADS...");
      
            await fs.rename(tmpFilePath, targetFilePath);
            console.log("Arquivo movido com sucesso!");
            
            return file; 
          } catch (err) {
            if (err.code === 'ENOENT') {
              await new Promise(resolve => setTimeout(resolve, 1000)); 
            } else {
              throw err;
            }
          }
        }
      }

    async deleteFile(file) {
        const filePath = path.resolve(uploadsConfig.UPLOADS_FOLDER, file)
        try {
            await fs.promises.stat(filePath)
        } catch {
            return
        }

        await fs.promises.unlink(filePath)
    }
}

module.exports = diskstorage
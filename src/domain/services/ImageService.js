const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

class ImageService {
    async uploadImage(image, user_id, pathDir) {
        const mimeTypeMatch = image.match(/^data:(image\/([a-zA-Z]*))?;base64,/);

        const base64Data = image.startsWith('data:image') ? image.split(',')[1] : image;
        const buffer = Buffer.from(base64Data, 'base64')

        const mimeType = mimeTypeMatch[1];
        const extension = mimeType.split('/')[1];
        const fileName = `image-${Date.now()}.${extension}`;


        const uploadsFolder = path.join(__dirname, '../../..', pathDir, user_id);
        const filePath = path.join(uploadsFolder, fileName);

         try {
            if (!fs.existsSync(uploadsFolder)) {
                await fsPromises.mkdir(uploadsFolder, { recursive: true });
            }

            await fsPromises.writeFile(filePath, buffer);

            return path.join(pathDir, user_id, fileName); 
        } catch (error) {
            console.error('Error saving image:', error);
            throw new Error('Error saving image');
        }
    }
}

module.exports = ImageService;

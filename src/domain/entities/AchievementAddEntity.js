const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

class AchievementAddEntity {

    setData({ user_id, title, description, date, image }) {
        this.user_id = user_id
        this.title = title
        this.description = description
        this.date = date
        this.image = image
    }

    getData(image) {
        return {
            user_id: this.user_id,
            title: this.title,
            description: this.description,
            date: this.date,
            image
        }
    }
    
    getImage() {
        try {
            const mimeTypeMatch = this.image.match(/^data:(image\/([a-zA-Z]*))?;base64,/);

            const base64Data = this.image.startsWith('data:image') ? this.image.split(',')[1] : this.image;
            const buffer = Buffer.from(base64Data, 'base64')

            const mimeType = mimeTypeMatch[1];
            const extension = mimeType.split('/')[1];
            const fileName = `image-${Date.now()}.${extension}`;

            const filePath  = path.join(__dirname, '../../..', 'uploads', this.user_id, fileName)
            const uploadsFolder  = path.join(__dirname, '../../..', 'uploads', this.user_id)
            if (!fs.existsSync(uploadsFolder)) {
              fsPromises.mkdir(uploadsFolder , { recursive: true });
              } 

            fs.writeFile(filePath, buffer, (err) => {
                try {
                    // 
                } catch (error) {
                    throw new Error('Error saving image')
                }
            });
            return filePath;
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports = AchievementAddEntity
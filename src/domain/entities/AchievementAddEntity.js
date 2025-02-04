const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

class AchievementAddEntity {

    constructor(ImageService) {
        this.imageService = ImageService;
    }

    setData({ user_id, title, description, date, image }) {
        this.user_id = user_id
        this.title = title
        this.description = description
        this.date = date
        this.image = image
    }

    async getData() {
        return {
            user_id: this.user_id,
            title: this.title,
            description: this.description,
            date: this.date,
            image: await this.getImage()
        }
    }
    
    async getImage() {
        try {
            return await this.imageService.uploadImage(this.image, this.user_id, 'uploads/achievements');
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports = AchievementAddEntity
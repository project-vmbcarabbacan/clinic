class AchievementEditEntity {

    constructor(ImageService) {
        this.imageService = ImageService;
    }

    setData({ id, user_id, title, description, date, image }) {
        this.id = id
        this.user_id = user_id
        this.title = title
        this.description = description
        this.date = date
        this.image = image
    }

    async setUpdate() {
        const data = {
            title: this.title,
            description: this.description,
            date: this.date,
        }

        if(this.image)
            data.image = await this.getImage()

        return data
    }

    async getImage() {
        try {
            return await this.imageService.uploadImage(this.image, this.user_id, 'uploads/achievements');
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports = AchievementEditEntity
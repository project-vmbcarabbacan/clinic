class AchievementEditEntity {

    setData({ id, user_id, title, description, date, image }) {
        this.id = id
        this.title = title
        this.description = description
        this.date = date
        this.image = image
    }

    setUpdate() {
        return {
            title: this.title,
            description: this.description,
            date: this.date,
            image: this.image
        }
    }

}

module.exports = AchievementEditEntity
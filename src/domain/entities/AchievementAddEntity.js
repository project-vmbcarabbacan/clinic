class AchievementAddEntity {

    setData({ user_id, title, description, date, image }) {
        this.user_id = user_id
        this.title = title
        this.description = description
        this.date = date
        this.image = image
    }

}

module.exports = AchievementAddEntity
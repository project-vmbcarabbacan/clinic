class UserLogEntity {

    constructor(dateService) {
        this.dateService = dateService
    }

    setData({ user_id, action_name }) {
        this.user_id = user_id
        this.action_name = action_name
    }

    new() {
        return {
            user_id: this.user_id,
            type: 'new',
            description: `User created by ${this.action_name}`,
            action_by: this.action_name
        }
    }

    update() {
        return {
            user_id: this.user_id,
            type: 'update',
            description: `User updated by ${this.action_name}`,
            action_by: this.action_name
        }
    }

    updateEmail() {
        return {
            user_id: this.user_id,
            type: 'update-email',
            description: `User change email by ${this.action_name}`,
            action_by: this.action_name
        }
    }

    updateUsername() {
        return {
            user_id: this.user_id,
            type: 'update-username',
            description: `User change username by ${this.action_name}`,
            action_by: this.action_name
        }
    }

    status(old_status, new_status) {
        return {
            user_id: this.user_id,
            type: 'change-status',
            description: `User chage the status from ${old_status} to ${new_status} updated by ${this.action_name}`,
            action_by: this.action_name
        }
    }

    login() {
        return {
            user_id: this.user_id,
            type: 'login',
            description: `User login at ${this.dateService.now_format()}`,
            action_by: this.action_name
        }
    }

    logout() {
        return {
            user_id: this.user_id,
            type: 'logout',
            description: `User logout at ${this.dateService.now_format()}`,
            action_by: this.action_name
        }
    }

    uploadAvatar() {
        return {
            user_id: this.user_id,
            type: 'upload-avatar',
            description: `User uploaded the image`,
            action_by: this.action_name
        }
    }

    changePassword() {
        return {
            user_id: this.user_id,
            type: 'change-password',
            description: `User change password by ${this.action_name} at ${this.dateService.now_format()}`,
            action_by: this.action_name
        }
    }

}

module.exports = UserLogEntity; 
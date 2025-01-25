class UserRepository {
    findId(id) {
        throw new Error("Method 'findId()' must be implemented.");
    }

    update(id, updateData) {
        throw new Error("Method 'update()' must be implemented.");
    }

    changeOneField(id, field, value) {
        throw new Error("Method 'changeStatus()' must be implemented.");
    }

    addToken(id, token) {
        throw new Error("Method 'addToken()' must be implemented.");
    }

    deleteToken(id, token) {
        throw new Error("Method 'deleteToken()' must be implemented.");
    }

}

module.exports = UserRepository;
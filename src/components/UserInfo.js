class UserInfo {
    constructor({ nameSelector, aboutMyselfSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._aboutMyself = document.querySelector(aboutMyselfSelector);
        this._avatar = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            profile: this._name.textContent,
            description: this._aboutMyself.textContent,
            avatar: this._avatar.src
        }
    }
    setUserInfo(data) {
        this._name.textContent = data.profile;
        this._aboutMyself.textContent = data.description;
        this._avatar.src = data.avatar;
    }
}
export { UserInfo }
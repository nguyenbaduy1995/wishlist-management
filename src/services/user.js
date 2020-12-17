import {
  User
} from 'models'

class UserService {
  constructor() {
    this.model = User
  }

  async getById(id) {
    return this.model.findByPk(id)
  }

}

export default new UserService()

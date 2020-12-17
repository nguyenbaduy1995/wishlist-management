import map from 'lodash/map'
import models from 'models'

export default function truncate() {
  return Promise.all(
    map(models, (model, key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null
      return model.truncate({
        cascade: true
      })
    })
  )
}

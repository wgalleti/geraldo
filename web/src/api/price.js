import Model from '../plugins/model'
import CustomStore from 'devextreme/data/custom_store'

export default class Price extends Model {
  constructor() {
    super('prices/prices/')
  }

  lookup() {
    return {
      store: new CustomStore({
        key: 'id',
        byKey: async (key) => {
          const { data } = await this.load({ id: key })
          return data[0]
        },
        load: () => this.load()
      })
    }
  }

  async cancel(id) {
    return await this.http.post(`/prices/prices/${id}/cancel/`)
  }

  async finish(id) {
    return await this.http.post(`/prices/prices/${id}/finish/`)
  }
}

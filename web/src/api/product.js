import Model from '../plugins/model'
import CustomStore from 'devextreme/data/custom_store'

export default class Product extends Model {
  constructor() {
    super('commons/products/')
  }

  productPriority() {
    return {
      store: new CustomStore({
        key: 'id',
        byKey: async (key) => {
          const data = await this.loadDetail('priority/')
          return data.filter((f) => f.id === key)[0]
        },
        load: () => this.loadDetail('priority/')
      })
    }
  }

  lookup() {
    return {
      paginate: true,
      pageSize: 10,
      store: new CustomStore({
        key: 'id',
        loadMode: 'processed',
        cacheRawData: true,
        byKey: async (key) => {
          const { data } = await this.load({ id: key })
          return data[0]
        },
        load: async ({ skip, take }) => {
          const { data } = await this.load({ skip, take })
          if (skip === undefined) {
            return {
              data,
              totalCount: data.length
            }
          }
          return {
            data: data.data,
            totalCount: data.total
          }
        }
      })
    }
  }
}

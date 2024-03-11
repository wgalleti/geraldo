import http from './http'
import CustomStore from 'devextreme/data/custom_store'
import toast from "react-hot-toast";

export default class Model {
  constructor(resource, keyField = 'id', filter = {}) {
    this.resource = this._checkResource(resource)
    this.http = http
    this.keyField = keyField
    this.constFilter = filter
  }

  _checkResource(resource) {
    return resource[resource.length - 1] === '/' ? resource : `${resource}/`
  }

  async load(filters = {}) {
    const { data } = await this.http.get(this.resource, {
      params: { ...filters, ...this.constFilter }
    })
    return data
  }

  async find(key) {
    const { data } = await this.http.get(
      this._checkResource(`${this.resource}${key}`)
    )
    return data
  }

  async loadDetail(detailName) {
    const resource = this._checkResource(`${this.resource}${detailName}`)
    const { data } = await this.http.get(resource)
    return data
  }

  async save(key, item) {
    try {
      if (key) {
        const resource = this._checkResource(`${this.resource}${key}`)
        const { data } = await this.http.patch(resource, item)
        return data
      }
      const { data } = await this.http.post(this.resource, item)
      return data
    } catch (e) {
      const message = e.response && e.response.data ? e.response.data : e.message
      console.error(message)

      if (message?.detail) {
        toast.error(message.detail)
        throw new Error(message.detail)
      }

      if (Array.isArray(message)) {
        toast.error(message[0])
        throw new Error(message[0])
      }

      throw new Error(message)
    }
  }

  async delete(key) {
    await this.http.delete(`${this.resource}${key}`)
  }

  makeCustomStore(filter = {}) {
    return new CustomStore({
      key: this.keyField,
      load: async (options) => {
        let ordering = null
        if (options.sort) {
          ordering = options.sort
            .map((s) => (s.desc ? `-${s.selector}` : s.selector))
            .join()
        }
        const { skip, take } = options
        let searchFilter = {}
        if (options.filter) {
          const list = options.filter.filter((f) => Array.isArray(f))
          if (list.length > 0) {
            searchFilter = {
              search: list[0][2]
            }
          }
        }

        const data = await this.load({
          skip,
          take,
          ordering,
          ...filter,
          ...searchFilter
        })

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
      },
      insert: (data) => this.save(null, data),
      update: (key, data) => this.save(key, data),
      remove: (key) => this.delete(key)
    })
  }
}

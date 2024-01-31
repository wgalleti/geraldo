import http from "./http";
import CustomStore from "devextreme/data/custom_store";

export default class Model {
    constructor(resource, keyField = "id", filter = {}) {
        this.resource = this._checkResource(resource);
        this.http = http;
        this.keyField = keyField;
        this.constFilter = filter;
    }

    _checkResource(resource) {
        return resource[resource.length - 1] === "/" ? resource : `${resource}/`;
    }

    async load(filters = {}) {
        const {data} = await this.http.get(this.resource, {
            params: {...filters, ...this.constFilter},
        });
        return data;
    }

    async find(key) {
        const {data} = await this.http.get(
            this._checkResource(`${this.resource}${key}`)
        );
        return data;
    }

    async loadDetail(detailName) {
        const resource = this._checkResource(`${this.resource}${detailName}`);
        const {data} = await this.http.get(resource);
        return data;
    }

    async save(key, item) {
        try {
            if (key) {
                const resource = this._checkResource(`${this.resource}${key}`);
                const {data} = await this.http.patch(resource, item);
                return data;
            }
            const {data} = await this.http.post(this.resource, item);
            return data;
        } catch (e) {
            const message = e.response ? e.response.data[0] : e.message;
            throw new Error(message);
        }
    }

    async delete(key) {
        await this.http.delete(`${this.resource}${key}`);
    }

    makeCustomStore(filter = {}) {
        return new CustomStore({
            key: this.keyField,
            load: async () => {
                const data = await this.load(filter);

                return {
                    data: data.data,
                    dataCount: data.total,
                };
            },
            insert: (data) => this.save(null, data),
            update: (key, data) => this.save(key, data),
            remove: (key) => this.delete(key),
        });
    }
}

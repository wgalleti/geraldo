import Model from "../plugins/model";
import CustomStore from "devextreme/data/custom_store";

export default class Product extends Model {
    constructor() {
        super("commons/products/");
    }

    productPriority() {
        return {
            store: new CustomStore({
                key: "id",
                byKey: async (key) => {
                    const data = await this.loadDetail("priority/");
                    return data.filter((f) => f.id === key)[0];
                },
                load: () => this.loadDetail("priority/"),
            }),
        };
    }

    lookup() {
        return {
            store: new CustomStore({
                key: "id",
                byKey: (key) => this.load({id: key}),
                load: async () => this.load(),
            }),
        };
    }
}

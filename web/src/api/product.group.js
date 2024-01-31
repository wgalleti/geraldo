import Model from "../plugins/model";
import CustomStore from "devextreme/data/custom_store";

export default class ProductGroup extends Model {
    constructor() {
        super("commons/product-groups/");
    }

    lookup(type = 1) {
        return {
            store: new CustomStore({
                key: "id",
                byKey: (key) => this.load({id: key}),
                load: () => this.load(),
            }),
        };
    }
}

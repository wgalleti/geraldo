import Model from "../plugins/model";
import CustomStore from "devextreme/data/custom_store";

export default class Supplier extends Model {
    constructor() {
        super("commons/suppliers/");
    }

    lookup() {
        return {
            store: new CustomStore({
                key: "id",
                byKey: (key) => this.load({id: key}),
                load: () => this.load(),
            }),
        };
    }
}

import Model from "../plugins/model";
import CustomStore from "devextreme/data/custom_store";

export default class Payment extends Model {
    constructor() {
        super("commons/payments/");
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

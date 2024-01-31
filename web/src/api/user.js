import Model from "../plugins/model";
import CustomStore from "devextreme/data/custom_store";

export default class User extends Model {
    constructor() {
        super("bases/users/");
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

import Model from "../plugins/model";
import CustomStore from "devextreme/data/custom_store";

export default class User extends Model {
    constructor() {
        super("bases/users/");
    }

    lookup(type = 1) {
        return {
            store: new CustomStore({
                key: "id",
                byKey: async (key) => {
                    const data = await this.load({id: key, people_type: type});
                    return data;
                },
                load: async (options) => {
                    const data = await this.load({people_type: type});
                    return data;
                },
            }),
        };
    }
}
import Model from '../plugins/model';
import CustomStore from 'devextreme/data/custom_store';

export default class Unity extends Model {
  constructor() {
    super('commons/unities/');
  }

  lookup() {
    return {
      store: new CustomStore({
        key: 'id',
        byKey: async key => {
          const { data } = await this.load({ id: key });
          return data[0];
        },
        load: () => this.load(),
      }),
    };
  }
}

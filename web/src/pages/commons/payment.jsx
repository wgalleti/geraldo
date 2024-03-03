import Payment from "../../api/payment.js";
import { useMemo } from "react";
import Grid from "../../components/Grid.jsx";

import { requiredField } from "../../utils/require.js"


const paymentModel = new Payment();
const dataSource = paymentModel.makeCustomStore();

export const PaymentPage = () => {
  const gridOptions = useMemo(() => {
    return {
      columns: [
        { dataField: "id", caption: "#", visible: false, },
        { dataField: "erp_code", caption: "Código ERP", width: 150, visible: false },
        { dataField: "name", caption: "Nome" },
      ],
      editing: {
        popup: {
          height: "auto",
          width: "400",
        },
        form: {
          items: [
            {
              dataField: "name",
              colSpan: 4,
              validationRules: [requiredField],
            },
          ],
        }
      }
    }
  }, []);

  return (
    <>
      <Grid dataSource={dataSource} gridCustom={gridOptions} />
    </>
  );
}

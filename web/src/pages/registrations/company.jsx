import Company from "../../api/company.js";
import { useMemo } from "react";
import Grid from "../../components/Grid.jsx";
import { requiredField } from "../../utils/require.js";


const companyModel = new Company();
const dataSource = companyModel.makeCustomStore();
export default function CompanyPage() {
  const gridOptions = useMemo(() => {
    return {
      columns: [
        { dataField: "id", caption: "#" },
        { dataField: "name", caption: "Nome" },
        { dataField: "document", caption: "Documento", dataType: "numeric" },
      ],
      editing: {
        popup: {
          height: "auto",
          width: "600",
        },
        form: {
          items: [
            {
              dataField: "name",
              colSpan: 3,
              validationRules: [requiredField],
            },
            {
              dataField: "document",
              colSpan: 1,
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

import Product from "../../api/product.js";
import ProductGroup from "../../api/product.group.js";
import Unity from "../../api/unity.js";
import { useMemo } from "react";
import Grid from "../../components/Grid.jsx";
import { requiredField } from "../../utils/require.js";


const productModel = new Product();
const productGroupModel = new ProductGroup();
const unityModel = new Unity();
const productPriority = productModel.productPriority();
const dataSource = productModel.makeCustomStore();

export default function ProductPage() {
  const gridOptions = useMemo(() => {
    return {
      onInitNewRow: (e) => {
        e.data.priority = "normal";
      },
      columns: [
        { dataField: "id", caption: "#", width: 50, visible: false },
        { dataField: "erp_code", caption: "Código ERP", visible: false },
        {
          dataField: "product_group",
          lookup: {
            dataSource: productGroupModel.lookup(),
            displayExpr: "name",
            valueExpr: "id",
          },
          caption: "Grupo",
        },
        {
          dataField: "unity",
          lookup: {
            dataSource: unityModel.lookup(),
            displayExpr: "name",
            valueExpr: "id",
          },
          caption: "Unidade",
        },
        { dataField: "name", caption: "Nome" },
        { dataField: "base_code", caption: "Código Base", visible: false },
        { dataField: "bar_code", caption: "Código de Barras" },
        {
          dataField: "priority",
          caption: "Prioridade",
          lookup: {
            displayExpr: "name",
            valueExpr: "id",
            dataSource: productPriority,
          },
          visible: false,
        },
      ],
      editing: {
        form: {
          colCount: 4,
          items: [
            {
              dataField: "name",
              colSpan: 3,
              validationRules: [requiredField],
            },
            {
              dataField: "base_code",
              colSpan: 1,
              validationRules: [requiredField],
            },
            {
              dataField: "product_group",
              colSpan: 1,
              validationRules: [requiredField],
            },
            {
              dataField: "unity",
              colSpan: 1,
              validationRules: [requiredField],
            },
            {
              dataField: "bar_code",
              colSpan: 1,
            },
            {
              dataField: "priority",
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

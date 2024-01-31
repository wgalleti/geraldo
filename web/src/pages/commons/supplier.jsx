import Supplier from "../../api/supplier.js";
import {Col} from "react-bootstrap";
import {useMemo} from "react";
import Grid from "../../components/Grid.jsx";
import {requiredField} from "../../utils/require.js";


const supplierModel = new Supplier();
const dataSource = supplierModel.makeCustomStore();

export default function SupplierPage() {
    const gridOptions = useMemo(() => {
        return {
            onInitNewRow: (e) => {
                e.data.rating = 3;
            },
            columns: [
                {dataField: "id", caption: "#"},
                {dataField: "erp_code", caption: "Código ERP"},
                {dataField: "name", caption: "Nome"},
                {dataField: "alias", caption: "Apelido"},
                {dataField: "document", caption: "Documento"},
                {dataField: "email", caption: "Email"},
                {dataField: "rating", caption: "Classificação", dataType: "number"},
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
                            dataField: "alias",
                            colSpan: 1,
                            validationRules: [requiredField],
                        },
                        {
                            dataField: "document",
                            colSpan: 1,
                            validationRules: [requiredField],
                        },
                        {
                            dataField: "email",
                            colSpan: 2,
                            validationRules: [requiredField],
                        },
                        {
                            dataField: "rating",
                            colSpan: 1,
                            validationRules: [requiredField],
                            editorOptions: {
                                min: 0,
                                max: 5,
                                showSpinButtons: true,
                            }
                        },
                    ],
                }
            }
        }
    }, []);


    return (
        <>
            <Col className="backdrop-blur-sm">
                <Grid dataSource={dataSource} gridCustom={gridOptions}/>
            </Col>
        </>
    );
}
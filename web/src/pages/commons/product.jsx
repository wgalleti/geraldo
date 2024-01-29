import {DataGrid} from "devextreme-react";
import {Col} from "react-bootstrap";
import Product from "../../api/product.js";

const requiredField = {type: "required", message: "This field is required"};

const productModel = new Product();
const productPriority = productModel.productPriority();
const dataSource = productModel.makeCustomStore();

export default function ProductPage() {
    let grid;

    const gridOptions = {
        onInitNewRow: (e) => {
            e.data.priority = "normal";
        },
        onContentReady: (e) => {
            grid = e.component;
        },
        toolbar: {
            items: [
                "searchPanel",
                "addRowButton",
                {
                    widget: "dxButton",
                    location: "before",
                    options: {
                        icon: "refresh",
                        onClick: () => {
                            grid.refresh();
                        },
                    },
                },
            ],
        },
        columns: [
            {dataField: "id", caption: "#", width: 50},
            {dataField: "erp_code", caption: "Código ERP", visible: false},
            {dataField: "name", caption: "Nome"},
            {dataField: "base_code", caption: "Código Base", visible: false},
            {dataField: "bar_code", caption: "Código de Barras"},
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
        searchPanel: {
            visible: true,
        },
        editing: {
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true,
            mode: "popup",
            popup: {
                height: "auto",
                width: "80%",
                showTitle: true,
                title: "Produto",
                shadingColor: "rgba(0,0,0, 0.7)",
            },
            form: {
                focusStateEnabled: true,
                hoverStateEnabled: true,
                activeStateEnabled: true,
                scrollingEnabled: true,
                tabIndex: 0,
                labelLocation: "top",
                showColonAfterLabel: false,
                showValidationSummary: false,
                colCount: 3,
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
                        dataField: "bar_code",
                        colSpan: 1,
                    },
                    {
                        dataField: "priority",
                        colSpan: 1,
                        validationRules: [requiredField],
                    },
                ],
            },
        },
    };
    return (
        <>
            <Col className="backdrop-blur-sm">
                <DataGrid dataSource={dataSource} {...gridOptions} />
            </Col>
        </>
    );
}
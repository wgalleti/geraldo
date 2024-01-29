import {DataGrid} from "devextreme-react";
import Supplier from "../../api/supplier.js";

const requiredField = {type: "required", message: "This field is required"};

const supplierModel = new Supplier();
const dataSource = supplierModel.makeCustomStore();

export default function SupplierPage() {
    let grid;

    const gridOptions = {
        onInitNewRow: (e) => {
            e.data.active = true;
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
            {dataField: "id", caption: "#"},
            {dataField: "erp_code", caption: "Código ERP"},
            {dataField: "name", caption: "Nome"},
            {dataField: "alias", caption: "Apelido"},
            {dataField: "document", caption: "Documento"},
            {dataField: "email", caption: "Email"},
            {dataField: "rating", caption: "Classificação", dataType: "number"},
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
                title: "Comprador",
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
                            min: 10,
                            max: 20,
                            showSpinButtons: true,
                        }
                    },
                ],
            },
        },
    };
    return (
        <>
            <div className="container mx-auto py-4">
                <DataGrid dataSource={dataSource} {...gridOptions} />
            </div>
        </>
    );
}
import {DataGrid} from "devextreme-react";
import ProductGroup from "../../api/product.group.js";

const requiredField = {type: "required", message: "This field is required"};

const productGroupModel = new ProductGroup();
const dataSource = productGroupModel.makeCustomStore();

export default function ProductGroupPage() {
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
                        colSpan: 4,
                        validationRules: [requiredField],
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
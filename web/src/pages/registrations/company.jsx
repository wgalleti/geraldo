import Company from "../../api/company.js";
import {DataGrid} from "devextreme-react";

const requiredField = {type: "required", message: "This field is required"};

const companyModel = new Company();
const dataSource = companyModel.makeCustomStore();
export default function CompanyPage() {
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
            {dataField: "name", caption: "Nome"},
            {dataField: "document", caption: "Documento", dataType: "numeric"},
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
                title: "People Form",
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
                        dataField: "document",
                        colSpan: 1,
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
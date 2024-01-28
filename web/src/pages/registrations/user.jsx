import {DataGrid} from "devextreme-react";
import User from "../../api/user.js";

const requiredField = {type: "required", message: "This field is required"};

const userModel = new User();
const dataSource = userModel.makeCustomStore();
export default function UserPage() {
    let grid;

    const gridOptions = {
        onInitNewRow: (e) => {
            e.data.is_active = true;
            e.data.is_supplier = false;
            e.data.is_buyer = false;
            e.data.is_manager = false;
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
            {dataField: "username", caption: "Login"},
            {dataField: "first_name", caption: "Nome"},
            {
                dataField: "last_name",
                caption: "Sobrenome",
            },
            {dataField: "email", caption: "Email"},
            {dataField: "is_buyer", caption: "É Comprador", dataType: "boolean",},
            {dataField: "is_supplier", caption: "É Fornecedor", dataType: "boolean",},
            {dataField: "is_manager", caption: "É Administrador", dataType: "boolean",},
            {dataField: "is_active", caption: "Ativo", dataType: "boolean",},
            {dataField: "password", caption: "Senha", visible: false},
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
                title: "Usuários",
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
                        dataField: "first_name",
                        colSpan: 2,
                        validationRules: [requiredField],
                    },
                    {
                        dataField: "last_name",
                        colSpan: 2,
                        validationRules: [requiredField],
                    },
                    {
                        dataField: "username",
                        colSpan: 1,
                        validationRules: [requiredField],
                    },

                    {
                        dataField: "password",
                        colSpan: 1,
                        validationRules: [requiredField],
                        editorOptions: {
                            mode: "password",
                        }
                    },
                    {
                        dataField: "email",
                        colSpan: 2,
                        validationRules: [requiredField],
                    },
                    {dataField: "is_buyer"},
                    {dataField: "is_supplier"},
                    {dataField: "is_manager"},
                    {dataField: "is_active"},
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
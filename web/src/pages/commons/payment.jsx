import {DataGrid} from "devextreme-react";
import Payment from "../../api/payment.js";
import {Col} from "react-bootstrap";

const requiredField = {type: "required", message: "This field is required"};

const paymentModel = new Payment();
const dataSource = paymentModel.makeCustomStore();

export default function PaymentPage() {
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
            <Col className="backdrop-blur-sm">
                <DataGrid dataSource={dataSource} {...gridOptions} />
            </Col>
        </>
    );
}
import Price from "../api/price.js";

import {Col} from "react-bootstrap";
import {useMemo} from "react";
import Grid from "../components/Grid.jsx";

const priceModel = new Price()
const dataSource = priceModel.makeCustomStore();

export default function HomePage() {

    const gridOptions = useMemo(() => {
        return {
            toolbar: {
                items: [
                    {
                        widget: "dxButton",
                        location: "before",
                        options: {
                            icon: "check",
                            text: "Definir preço",
                            onClick: () => {
                                console.log("add");
                            },
                        },
                    },
                    {
                        widget: "dxButton",
                        location: "before",
                        options: {
                            icon: "doc",
                            text: "Detalhes",
                            onClick: () => {
                                console.log("details");
                            },
                        },
                    },
                    {
                        widget: "dxButton",
                        location: "after",
                        options: {
                            icon: "close",
                            text: "Cancelar",
                            type: "danger",
                            stylingMode: "outlined",
                            onClick: () => {
                                console.log("details");
                            },
                        },
                    },
                ],
            },
            columns: [
                {dataField: "company_data.name", caption: "Empresa",},
                {dataField: "status", caption: "Status", visible: false},
                {dataField: "status_data", caption: "Status",},
                {dataField: "priority", caption: "Prioridade", visible: false},
                {dataField: "priority_data", caption: "Prioridade",},
                {dataField: "duration_time", caption: "Tempo",},
                {dataField: "buyer", caption: "Comprador", visible: false},
                {dataField: "buyer_data.name", caption: "Comprador",},
                {dataField: "payment_refer", caption: "Forma de Pagamento", visible: false},
                {dataField: "payment_refer_data.name", caption: "Forma de Pagamento",},
                {
                    dataField: "items_count", caption: "Itens", format: {
                        type: "fixedPoint",
                        precision: 0
                    }
                },
                {dataField: "completed_percent", caption: "% Completo",},
                {
                    dataField: "value_total",
                    caption: "Total",
                    format: {
                        type: "fixedPoint",
                        precision: 2
                    }
                },
            ],
            editing: {
                allowAdding: false,
                allowUpdating: false,
                allowDeleting: false,
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
import Unity from "../../api/unity.js";
import {Col} from "react-bootstrap";
import {useMemo} from "react";
import Grid from "../../components/Grid.jsx";
import {requiredField} from "../../utils/require.js";


const unityModel = new Unity();
const dataSource = unityModel.makeCustomStore();

export default function UnityPage() {
    const gridOptions = useMemo(() => {
        return {
            columns: [
                {dataField: "id", caption: "#", visible: false,},
                {dataField: "erp_code", caption: "Código ERP", width: 150},
                {dataField: "name", caption: "Nome"},
            ],
            editing: {
                popup: {
                    height: "auto",
                    width: "400",
                },
                form: {
                    items: [
                        {
                            dataField: "name",
                            colSpan: 4,
                            validationRules: [requiredField],
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
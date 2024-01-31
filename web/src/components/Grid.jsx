import {useMemo, useRef} from "react";
import {DataGrid} from "devextreme-react";
import {merge} from "lodash";

const Grid = ({dataSource = null, gridCustom = {}, title = ""}) => {
    const grid = useRef();
    const gridConfig = useMemo(() => {
        let base = {
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
                                grid.current.instance.refresh();
                            },
                        },
                    },
                ],
            },
            searchPanel: {
                visible: true,
                searchVisibleColumnsOnly: true,
                width: 300
            },
            loadPanel: {
                enabled: false,
                shading: true,
                shadingColor: 'rgba(255,255,255, 0.7)'
            },
            columnFixing: {
                enable: true
            },
            columnChooser: {
                enabled: true,
                height: 260,
                mode: 'dragAndDrop',
                width: 250
            },
            dateSerializationFormat: 'yyyy-MM-dd',
            focusStateEnabled: true,
            height: '91vh',
            scrolling: {
                mode: 'infinite'
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
                    showTitle: title,
                    title: title,
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
                },
            },
            remoteOperations: {
                filtering: true,
                paging: true
            },
            allowColumnReordering: true,
            showBorders: false,
            showColumnLines: false,
            showRowLines: false,
            rowAlternationEnabled: true,
            columnAutoWidth: true,
            allowColumnResizing: true,
            selection: {
                mode: 'single'
            },
            paging: {
                pageSize: 10
            },
        }

        return merge(base, gridCustom)
    }, [gridCustom, title])

    return (
        <div>
            <DataGrid dataSource={dataSource} {...gridConfig} ref={grid}/>
        </div>
    )
}

export default Grid
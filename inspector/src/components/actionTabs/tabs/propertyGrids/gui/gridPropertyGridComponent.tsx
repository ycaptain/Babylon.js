import * as React from "react";
import { Observable } from "babylonjs";
import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { CommonControlPropertyGridComponent } from "./commonControlPropertyGridComponent";
import { LockObject } from "../lockObject";
import { Grid } from "babylonjs-gui/2D/controls/grid";
import { LineContainerComponent } from "../../../lineContainerComponent";
import { TextLineComponent } from "../../../lines/textLineComponent";

interface IGridPropertyGridComponentProps {
    grid: Grid,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps> {
    constructor(props: IGridPropertyGridComponentProps) {
        super(props);
    }

    renderRows() {
        const grid = this.props.grid;
        const rows = [];

        for (var index = 0; index < grid.rowCount; index++) {
            rows.push(grid.getRowDefinition(index)!);
        }

        return (
            rows.map((rd, i) => {
                return (
                    <TextLineComponent key={`r${i}`} label={`Row #${i}`} value={rd.toString(grid.host)} underline={i === grid.rowCount - 1} />
                )
            })
        );
    }

    renderColumns() {
        const grid = this.props.grid;
        const cols = [];

        for (var index = 0; index < grid.columnCount; index++) {
            cols.push(grid.getColumnDefinition(index)!);
        }

        return (
            cols.map((cd, i) => {
                return (
                    <TextLineComponent key={`c${i}`} label={`Column #${i}`} value={cd.toString(grid.host)} />
                )
            })
        );
    }

    render() {
        const grid = this.props.grid;

        const cols = [];



        for (var index = 0; index < grid.rowCount; index++) {
            cols.push(grid.getColumnDefinition(index));
        }

        return (
            <div className="pane">
                <CommonControlPropertyGridComponent lockObject={this.props.lockObject} control={grid} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title="GRID">
                    {
                        this.renderRows()
                    }
                    {
                        this.renderColumns()
                    }
                </LineContainerComponent>
            </div>
        );
    }
}
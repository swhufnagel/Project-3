import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Table1 extends Component {
    render() {
        return (
            <div>
                <BootstrapTable data ={this.props.data}>
                    <TableHeaderColumn dataField='name'>
                        Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="slider">
                        Slider
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default Table1;
import React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import './App.css';
import { TableHead, Table, Paper, TableRow, TableCell, TableBody, Switch, Select, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { data, datas } from './types/data';
import { addData } from './store/actions';


const styles: StyleRulesCallback = (theme) => ({
    app: {
        display: 'flex',
        justifyContent: 'center'
    },
    root: {
        maxWidth: '960px',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

interface Props {
    classes: any,
    data: datas,
    addData: any
}

interface State {

}



class App extends React.Component<Props, State> {

    componentDidMount() {
        fetch(window.origin + '/data.json', {
            method: 'GET'
        }).then(response => response.json()
        ).then((data: datas) => {
            data.forEach(data => {
                this.props.addData(data)
            })
        })
    }

    render() {
        const { classes, data } = this.props
        console.log(this.props)
        return (
            <div className={classes.app}>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>ChartType</TableCell>
                                    <TableCell>FilterTypes</TableCell>
                                    <TableCell>Frequency</TableCell>
                                    <TableCell>Active</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.data.map(data => (
                                    <TableRow>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>
                                            {data.type.charAt(0).toUpperCase() + data.type.substr(1, data.type.length)}
                                        </TableCell>
                                        <TableCell>
                                            {data.chartType.charAt(0).toUpperCase() + data.chartType.substr(1, data.chartType.length)}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                displayEmpty
                                                value={0}
                                                name="age"
                                                className={classes.selectEmpty}
                                            >
                                                {data.filterTypes.map((value, index) => (
                                                    <MenuItem value={index}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            {data.frequency.charAt(0).toUpperCase() + data.frequency.substr(1, data.frequency.length)}
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={data.active}
                                                onChange={() => ''}
                                                value="checkedA"
                                                classes={{
                                                    switchBase: classes.colorSwitchBase,
                                                    checked: classes.colorChecked,
                                                    bar: classes.colorBar,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>

                    </div>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    data: state.data
})

const mapDispatchToProps = (dispatch: any) => ({
    addData: (data: data) => dispatch(addData(data))
})

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)


export default withStyles(styles)(connectedApp);

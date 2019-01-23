/**
 * Developed by Oladira Segun Solomon
 * Email: sheghunoladiran9@gmail.com
 * github: github.com/sheghun
 */


import React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import './App.css';
import { TableHead, TextField, FormControlLabel, Table, Paper, TableRow, TableCell, TableBody, Switch, Select, MenuItem, Typography, Button, Fab } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import { connect } from 'react-redux';
import { data, datas } from './types/data';
import { addData, deleteData } from './store/actions';


const styles: StyleRulesCallback = (theme) => ({
    app: {
        display: 'flex',
        justifyContent: 'center'
    },
    root: {
        maxWidth: '960px',
        marginTop: theme.spacing.unit * 3,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    addHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
    },
    button: {
        margin: theme.spacing.unit,
        textAlign: 'center',
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

interface Props {
    classes: any,
    data: datas,
    addData: any,
    deleteData: any,
}
// Inherits the properties of the data inteface
interface State extends data {
    filterTypesText: string
}



class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        // ? Why?... To Make the application less complex
        this.state = {
            name: '',
            type: '',
            chartType: '',
            filterTypes: [],
            filterTypesText: '',
            frequency: 'yearly',
            active: false

        }
    }

    componentDidMount() {
        // * I didn't neet to use axios or polyfill coz i know this will be used by a developer
        fetch(window.origin + '/data.json', {
            method: 'GET'
        }).then(response => response.json()
        ).then((data: datas) => {
            data.forEach(data => {
                this.props.addData(data)
            })
        })
    }

    inputHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const target = event.target
        console.dir(target)
        // Get the name
        const name = target.name
        // Check if it is a checkbox and return the opposite of the current or just get the value 
        // @ts-ignore
        const value = target.type === 'checkbox' ? !this.state[name] : target.value
        // @ts-ignore
        // Sorry in a rush
        this.setState({
            [name]: value
        })
    }

    submit = () => {
        // Send the data to the redux state
        this.props.addData({ ...this.state, filterTypes: this.state.filterTypesText.split(',') })
    }

    deleteData = (index: number) => {
        this.props.deleteData(index)
    }

    render() {
        const { classes, data } = this.props
        const { ...state } = this.state
        console.log(state)
        return (
            <div className={classes.app}>
                <div>
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
                                    {this.props.data.map((data, index) => (
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
                                            <TableCell>
                                                <Fab onClick={() => this.deleteData(index)} color="secondary" aria-label="Edit" className={classes.fab}>
                                                    <CloseIcon />
                                                </Fab>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                    <div className={classes.addHeader}>
                        <div>
                            <Typography align="center" variant="h5">
                                Add New Data
                        </Typography>
                            <div>
                                <Button
                                    onClick={this.submit}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Add
                                </Button>
                            </div>
                            <div className={classes.inputs}>
                                <TextField
                                    id="standard-name"
                                    label="Name"
                                    name="name"
                                    className={classes.textField}
                                    value={state.name}
                                    onChange={this.inputHandler}
                                    margin="normal"
                                />
                                <TextField
                                    id="standard-name"
                                    label="Type"
                                    name="type"
                                    className={classes.textField}
                                    value={state.type}
                                    onChange={this.inputHandler}
                                    margin="normal"
                                />
                                <TextField
                                    id="standard-name"
                                    label="ChartType"
                                    name="chartType"
                                    className={classes.textField}
                                    value={state.chartType}
                                    onChange={this.inputHandler}
                                    margin="normal"
                                />
                                <TextField
                                    id="standard-name"
                                    label="filterTypes"
                                    className={classes.textField}
                                    value={state.filterTypesText}
                                    name='filterTypesText'
                                    onChange={this.inputHandler}
                                    margin="normal"
                                    helperText="Use comma to seprate your filter types"
                                />
                                <FormControlLabel
                                    control={
                                        <Select
                                            displayEmpty
                                            value={state.frequency}
                                            name="frequency"
                                            onChange={this.inputHandler}
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="yearly">Yearly</MenuItem>
                                            <MenuItem value="monthly">Monthly</MenuItem>
                                            <MenuItem value="weekly">Weekly</MenuItem>
                                            <MenuItem value="daily">Daily</MenuItem>
                                        </Select>
                                    }
                                    label="Frequency"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={state.active}
                                            onChange={this.inputHandler}
                                            value="checkedA"
                                            name="active"
                                            classes={{
                                                switchBase: classes.colorSwitchBase,
                                                checked: classes.colorChecked,
                                                bar: classes.colorBar,
                                            }}
                                        />
                                    }
                                    label="Active"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    data: state.data
})

const mapDispatchToProps = (dispatch: any) => ({
    addData: (data: data) => dispatch(addData(data)),
    deleteData: (index: number) => dispatch(deleteData(index))
})

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)


export default withStyles(styles)(connectedApp);
